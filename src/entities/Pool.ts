import { IPoolConfig, IToken, NODE_URL, TRADE_FEE } from "@src/constants";
import axios from "axios";
import { action, makeAutoObservable } from "mobx";
import BN from "@src/utils/BN";
import tokenLogos from "@src/constants/tokenLogos";

interface IData {
  key: string;
  type: "integer" | "string";
  value: number | string;
}

export interface IShortPoolInfo {
  pool: IPoolConfig;
  liquidityInUsdn: BN;
  addressStaked: BN;
  shareOfPool: BN;
  indexTokenRate: BN;
  indexTokenName: string;
}

class Pool implements IPoolConfig {
  public readonly owner?: string;
  public readonly domain: string;
  public readonly contractAddress: string;
  public readonly layer2Address?: string;
  public readonly baseTokenId: string;
  public readonly title: string;
  public readonly isCustom?: boolean;
  public readonly defaultAssetId0: string;
  public readonly defaultAssetId1: string;
  public readonly tokens: Array<IToken & { share: number }> = [];
  private readonly _logo?: string;

  public get logo() {
    return this._logo ?? tokenLogos.UNKNOWN;
  }

  public get baseToken() {
    return this.getAssetById(this.baseTokenId);
  }

  public getAssetById = (assetId: string) =>
    this.tokens.find((t) => assetId === t.assetId);

  public globalVolume: BN | null = null;
  @action.bound setGlobalVolume = (value: BN) => (this.globalVolume = value);

  public globalLiquidity: BN = BN.ZERO;
  @action.bound setGlobalLiquidity = (value: BN) =>
    (this.globalLiquidity = value);

  public globalPoolTokenAmount: BN = BN.ZERO;
  @action.bound setGlobalPoolTokenAmount = (value: BN) =>
    (this.globalPoolTokenAmount = value);

  public liquidity: Record<string, BN> = {};
  private setLiquidity = (value: Record<string, BN>) =>
    (this.liquidity = value);

  constructor(params: IPoolConfig) {
    this.contractAddress = params.contractAddress;
    this.layer2Address = params.layer2Address;
    this.baseTokenId = params.baseTokenId;
    this.title = params.title;
    this._logo = params.logo;
    this.tokens = params.tokens;
    this.defaultAssetId0 = params.defaultAssetId0 ?? params.tokens[0].assetId;
    this.defaultAssetId1 = params.defaultAssetId1 ?? params.tokens[1].assetId;
    this.domain = params.domain;
    this.isCustom = params.isCustom;
    this.owner = params.owner;

    this.syncLiquidity().then();
    setInterval(this.syncLiquidity, 15000);
    makeAutoObservable(this);
  }

  private syncLiquidity = async () => {
    const globalAttributesUrl = `${NODE_URL}/addresses/data/${this.contractAddress}?matches=global_(.*)`;
    const { data }: { data: IData[] } = await axios.get(globalAttributesUrl);
    const balances = data.reduce<Record<string, BN>>((acc, { key, value }) => {
      const regexp = new RegExp("global_(.*)_balance");
      regexp.test(key) && (acc[key.match(regexp)![1]] = new BN(value));
      return acc;
    }, {});
    this.setLiquidity(balances);

    const globalPoolTokenAmount = data.find(
      (v) => v.key === "global_poolToken_amount"
    );
    if (globalPoolTokenAmount?.value != null) {
      this.setGlobalPoolTokenAmount(new BN(globalPoolTokenAmount.value));
    }

    const globalVolumeValue = data.find((v) => v.key === "global_volume");
    if (globalVolumeValue?.value != null) {
      const globalVolume = new BN(globalVolumeValue.value).div(1e6);
      this.setGlobalVolume(globalVolume);
    }
    const usdnAsset = this.tokens.find(({ symbol }) => symbol === "USDN")!;
    const usdnLiquidity = this.liquidity[usdnAsset?.assetId];
    if (usdnLiquidity != null && usdnAsset.share != null) {
      const globalLiquidity = new BN(usdnLiquidity)
        .div(usdnAsset.share)
        .times(100)
        .div(1e6);
      this.setGlobalLiquidity(globalLiquidity);
    }
  };

  currentPrice = (
    assetId0: string,
    assetId1: string,
    coefficient = TRADE_FEE
  ): BN | null => {
    if (this.tokens == null) return null;
    const asset0 = this.getAssetById(assetId0);
    const asset1 = this.getAssetById(assetId1);
    if (asset0?.share == null || asset1?.share == null) return null;
    const { decimals: decimals0, share: shareAmount0 } = asset0;
    const { decimals: decimals1, share: shareAmount1 } = asset1;
    const liquidity0 = this.liquidity[assetId0];
    const liquidity1 = this.liquidity[assetId1];
    if (liquidity0 == null || liquidity1 == null) return null;
    const topValue = BN.formatUnits(liquidity1, decimals1).div(shareAmount1);
    const bottomValue = BN.formatUnits(liquidity0, decimals0).div(shareAmount0);
    return topValue.div(bottomValue).times(coefficient);
  };

  get indexTokenRate() {
    if (this.globalPoolTokenAmount == null || this.globalPoolTokenAmount.eq(0))
      return BN.ZERO;
    return this.globalLiquidity.div(
      BN.formatUnits(this.globalPoolTokenAmount, 8)
    );
  }

  @action.bound public getAccountLiquidityInfo = async (
    address: string
  ): Promise<IShortPoolInfo> => {
    const keysArray = {
      addressIndexStaked: `${address}_indexStaked`,
      globalIndexStaked: `global_indexStaked`,
      globalPoolTokenAmount: "global_poolToken_amount",
    };
    const [values, staticPoolDomainValue] = await Promise.all([
      this.contractKeysRequest(Object.values(keysArray)),
      this.contractKeysRequest([`static_poolDomain`]),
    ]);
    const staticPoolDomain =
      staticPoolDomainValue?.length === 1 ? staticPoolDomainValue[0].value : "";
    const parsedNodeResponse = [...(values ?? [])].reduce<Record<string, BN>>(
      (acc, { key, value }) => {
        Object.entries(keysArray).forEach(([regName, regValue]) => {
          const regexp = new RegExp(regValue);
          if (regexp.test(key)) {
            acc[regName] = new BN(value);
          }
        });
        return acc;
      },
      {}
    );
    const addressIndexStaked = parsedNodeResponse["addressIndexStaked"];
    const globalIndexStaked = parsedNodeResponse["globalIndexStaked"];
    const globalPoolTokenAmount = parsedNodeResponse["globalPoolTokenAmount"];
    const indexTokenRate = this.globalLiquidity.div(
      BN.formatUnits(globalPoolTokenAmount, 8)
    );

    if (addressIndexStaked == null || addressIndexStaked.eq(0)) {
      return {
        addressStaked: BN.ZERO,
        liquidityInUsdn: BN.ZERO,
        shareOfPool: BN.ZERO,
        pool: this,
        indexTokenRate,
        indexTokenName: "PZ" + staticPoolDomain,
      };
    }
    const liquidityInUsdn = this.globalLiquidity
      .times(addressIndexStaked)
      .div(globalIndexStaked);
    const percent = liquidityInUsdn
      .times(new BN(100))
      .div(this.globalLiquidity);

    return {
      liquidityInUsdn,
      addressStaked: addressIndexStaked,
      shareOfPool: percent,
      pool: this,
      indexTokenRate,
      indexTokenName: " PZ " + staticPoolDomain,
    };
  };

  // public contractMatchRequest = async (match: string) => {
  //   const url = `${NODE_URL}/addresses/data/${this.contractAddress}?matches=${match}`;
  //   const response: { data: IData[] } = await axios.get(url);
  //   if (response.data) {
  //     return response.data;
  //   } else {
  //     return null;
  //   }
  // };
  public contractKeysRequest = async (keysArray: string[] | string) => {
    const searchKeys = typeof keysArray === "string" ? [keysArray] : keysArray;
    const search = new URLSearchParams(searchKeys?.map((s) => ["key", s]));
    const keys = search.toString();
    const url = `${NODE_URL}/addresses/data/${this.contractAddress}?${keys}`;
    const response: { data: IData[] } = await axios.get(url);
    if (response.data) {
      return response.data;
    } else {
      return null;
    }
  };
}

export default Pool;
