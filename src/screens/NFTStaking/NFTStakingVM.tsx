import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { action, makeAutoObservable, when } from "mobx";
import { RootStore, useStores } from "@stores";
import BN from "@src/utils/BN";
import statsService, { IArtWork } from "@src/services/statsService";
import nodeService from "@src/services/nodeService";
import nodeRequest from "@src/utils/nodeRequest";

const ctx = React.createContext<NFTStakingVM | null>(null);

export const NFTStakingVMProvider: React.FC = ({ children }) => {
  const rootStore = useStores();
  const store = useMemo(() => new NFTStakingVM(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useNFTStakingVM = () => useVM(ctx);

class NFTStakingVM {
  private stakingContractAddress: string = "";
  private _setStakingAddress = (v: string) => (this.stakingContractAddress = v);

  //чтобы получить застейканые карточки с контракта
  //https://wavesducks.wavesnodes.com/addresses/data/3PKUxbZaSYfsR7wu2HaAgiirHYwAMupDrYW?matches=address_3PMcMiMEs6w56NRGacksXtFG5zS7doE9fpL_nft_(.*)

  //чтобы получить незастейканые то фильтровать по typeId

  loading: boolean = false;
  private _setLoading = (l: boolean) => (this.loading = l);

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    const { accountStore } = this.rootStore;
    this._setStakingAddress(accountStore.CONTRACT_ADDRESSES.ultraStaking);
    statsService.getArtworks().then((d) => this._setArtworks(d));
    when(() => rootStore.accountStore.address != null, this.getAccountNFTs);
  }

  public nftDisplayState: number = 0;
  @action.bound setNftDisplayState = (v: number) => (this.nftDisplayState = v);

  public claimedReward: BN | null = null;
  public availableToClaim: BN | null = null;
  public lastClaimDate: BN = BN.ZERO;

  public artworks: IArtWork[] = [];
  public accountArtworks: IArtWork[] = [];
  private _setArtworks = (v: IArtWork[]) => (this.artworks = v);
  private _setAccountArtworks = (v: IArtWork[]) => (this.artworks = v);

  private _setClaimedReward = (v: BN) => (this.claimedReward = v);
  private _setAvailableToClaim = (v: BN) => (this.availableToClaim = v);
  private _setLastClaimDate = (v: BN) => (this.lastClaimDate = v);

  //todo!
  getAccountNFTs = async () => {
    const { address } = this.rootStore.accountStore;
    if (address == null) return;
    const nfts = await nodeService.getAddressNfts(address);
    // const description =
    //   "Creator: 3P3iV85eXfkcA3Dd13EpZBYvs1vkKX6AYEN,\n ArtID: Dn3tGwyg8AerfmUjhCixamPcyjy5FSAE2rguKinH9VCH,\n SignID: 5GMCJkjbahpJcbRgjZUp6coxTwhasDLNig3bAbHCdoN,\n Artwork name: Puzzle,\n Issue: 1/1";
    // const our = nfts.filter((n) => n.description === description);
    console.log(nfts);
  };

  private updateAddressStakingInfo = async () => {
    //все тоже самое только адрес другой ++
    const { chainId, address, TOKENS } = this.rootStore.accountStore;
    const { stakingContractAddress } = this;

    const [globalValues, addressValues] = await Promise.all([
      nodeRequest(chainId, stakingContractAddress, `global_(.*)`),
      nodeRequest(chainId, stakingContractAddress, `${address}_(.*)`),
    ]);

    const keysArray = {
      globalStaked: "global_staked",
      addressStaked: `${address}_staked`,
      claimedReward: `${address}_${TOKENS.USDN.assetId}_claimed`,
      globalLastCheckInterest: `global_lastCheck_${TOKENS.USDN.assetId}_interest`,
      addressLastCheckInterest: `${address}_lastCheck_${TOKENS.USDN.assetId}_interest`,
      lastClaimDate: `${address}_${TOKENS.USDN.assetId}_lastClaim`,
    };
    //todo вынести в отдельную фунцию
    const parsedNodeResponse = [
      ...(globalValues ?? []),
      ...(addressValues ?? []),
    ].reduce<Record<string, BN>>((acc, { key, value }) => {
      Object.entries(keysArray).forEach(([regName, regValue]) => {
        const regexp = new RegExp(regValue);
        if (regexp.test(key)) {
          acc[regName] = new BN(value);
        }
      });
      return acc;
    }, {});

    const addressStaked = parsedNodeResponse["addressStaked"];
    const claimedReward = parsedNodeResponse["claimedReward"];
    const globalLastCheckInterest =
      parsedNodeResponse["globalLastCheckInterest"];
    const addressLastCheckInterest =
      parsedNodeResponse["addressLastCheckInterest"];
    const lastClaimDate = parsedNodeResponse["lastClaimDate"];

    this._setClaimedReward(claimedReward);
    const availableToClaim = globalLastCheckInterest
      .minus(addressLastCheckInterest)
      .times(addressStaked);
    addressStaked && this._setAvailableToClaim(availableToClaim);
    lastClaimDate && this._setLastClaimDate(lastClaimDate);
  };

  get canClaim(): boolean {
    return this.availableToClaim !== null && this.availableToClaim.gt(0);
  }

  claim = async () => {
    if (!this.canClaim) return;
    this._setLoading(true);
    const { accountStore, notificationStore } = this.rootStore;
    await accountStore
      .invoke({
        dApp: accountStore.CONTRACT_ADDRESSES.ultraStaking,
        payment: [],
        call: {
          function: "claimReward",
          args: [],
        },
      })
      .then(() => notificationStore.notify(""))
      .catch((e) => {
        notificationStore.notify(e.message ?? e.toString(), {
          type: "error",
          title: "Transaction is not completed",
        });
      })
      .then(this.updateAddressStakingInfo)
      .finally(() => this._setLoading(false));
  };
  //todo stake конкретной карточки
  stake = async () => {
    const { accountStore, notificationStore } = this.rootStore;
    this._setLoading(true);
    await accountStore
      .invoke({
        dApp: this.rootStore.accountStore.CONTRACT_ADDRESSES.staking ?? "",
        //amount 1, assetId - id орла
        payment: [],
        call: {
          function: "stake",
          args: [],
        },
      })
      .then(() => notificationStore.notify(""))
      .catch((e) => {
        notificationStore.notify(e.message ?? e.toString(), {
          type: "error",
          title: "Transaction is not completed",
        });
      })
      .then(this.updateAddressStakingInfo)
      .finally(() => this._setLoading(false));
  };
  unStake = async () => {
    this._setLoading(true);
    const { rootStore } = this;
    const { accountStore, notificationStore } = rootStore;
    await accountStore
      .invoke({
        dApp: this.rootStore.accountStore.CONTRACT_ADDRESSES.staking ?? "",
        // amount 1, assetId - id орла
        payment: [],
        call: {
          function: "unStake",
          args: [
            {
              type: "integer",
              value: "id орла",
            },
          ],
        },
      })
      .then((txId) => {
        notificationStore.notify("");
      })
      .catch((e) => {
        notificationStore.notify(e.message ?? e.toString(), {
          type: "error",
          title: "Transaction is not completed",
        });
      })
      .then(this.updateAddressStakingInfo)
      .finally(() => this._setLoading(false));
  };
}
