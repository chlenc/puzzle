import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { makeAutoObservable, reaction, when } from "mobx";
import { RootStore, useStores } from "@stores";
import BN from "@src/utils/BN";
import { IToken, NODE_URL_MAP } from "@src/constants";
import { IPoolStats30Days } from "@stores/PoolsStore";
import axios from "axios";
import nodeService from "@src/services/nodeService";
import { ITransaction } from "@src/utils/types";

const ctx = React.createContext<InvestToPoolInterfaceVM | null>(null);

export const InvestToPoolInterfaceVMProvider: React.FC<{ poolId: string }> = ({
  poolId,
  children,
}) => {
  const rootStore = useStores();
  const store = useMemo(
    () => new InvestToPoolInterfaceVM(rootStore, poolId),
    [rootStore, poolId]
  );
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useInvestToPoolInterfaceVM = () => useVM(ctx);

type IReward = {
  value: BN;
  usdEquivalent: BN;
};

class InvestToPoolInterfaceVM {
  public poolId: string;
  public rootStore: RootStore;

  loading: boolean = false;
  private _setLoading = (l: boolean) => (this.loading = l);

  loadingHistory: boolean = false;
  private _setLoadingHistory = (l: boolean) => (this.loadingHistory = l);

  public stats: IPoolStats30Days | null = null;
  private setStats = (stats: IPoolStats30Days | null) => (this.stats = stats);

  public accountLiquidity: BN | null = null;
  private setAccountLiquidity = (value: BN) => (this.accountLiquidity = value);

  public accountShareOfPool: BN | null = null;
  private setAccountShareOfPool = (value: BN) =>
    (this.accountShareOfPool = value);

  public totalRewardToClaim: BN = BN.ZERO;
  private setTotalRewardToClaim = (value: BN) =>
    (this.totalRewardToClaim = value);

  public totalClaimedReward: BN = BN.ZERO;
  private setTotalClaimedReward = (value: BN) =>
    (this.totalClaimedReward = value);

  public lastClaimDate: BN = BN.ZERO;
  private _setLastClaimDate = (v: BN) => (this.lastClaimDate = v);

  public poolAssetBalances: { assetId: string; balance: BN }[] = [];
  private setPoolAssetBalances = (value: { assetId: string; balance: BN }[]) =>
    (this.poolAssetBalances = value);

  public transactionsHistory: ITransaction[] | null = null;
  private setTransactionsHistory = (value: any[]) =>
    (this.transactionsHistory = value);

  public userIndexStaked: BN | null = null;
  private setUserIndexStaked = (value: BN) => (this.userIndexStaked = value);

  constructor(rootStore: RootStore, poolId: string) {
    this.poolId = poolId;
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.updateStats();
    this.updatePoolTokenBalances();
    this.loadTransactionsHistory();
    reaction(
      () => this.rootStore.accountStore?.address,
      () => {
        this.updateRewardInfo();
        this.updateAccountLiquidityInfo();
      }
    );
    when(
      () => rootStore.accountStore.address != null,
      this.updateAccountLiquidityInfo
    );
    when(() => rootStore.accountStore.address != null, this.updateRewardInfo);
  }

  public get pool() {
    return this.rootStore.poolsStore.pools.find(
      ({ id }) => id === this.poolId
    )!;
  }

  updateStats = () => {
    this.rootStore.poolsStore
      .get30DaysPoolStats(this.poolId)
      .then((data) => this.setStats(data))
      .catch(() => console.error(`Cannot update stats of ${this.poolId}`));
  };

  updateAccountLiquidityInfo = async () => {
    if (this.rootStore.accountStore.address) {
      const info = await this.pool.getAccountLiquidityInfo(
        this.rootStore.accountStore.address
      );
      this.setAccountShareOfPool(info.shareOfPool);
      this.setAccountLiquidity(info.liquidityInUsdn);
    }
  };

  getTokenRewardInfo = async (
    token: IToken
  ): Promise<IReward & { assetId: string }> => {
    const { accountStore } = this.rootStore;
    const { address } = accountStore;
    const assetBalance = this.poolAssetBalances.find(
      ({ assetId }) => assetId === token.assetId
    );
    const realBalance = assetBalance?.balance ?? BN.ZERO;

    const keysArray = {
      globalTokenBalance: `global_${token.assetId}_balance`,
      globalLastCheckTokenEarnings: `global_lastCheck_${token.assetId}_earnings`,
      globalIndexStaked: "global_indexStaked",
      globalLastCheckTokenInterest: `global_lastCheck_${token.assetId}_interest`,
      userLastCheckTokenInterest: `${address}_lastCheck_${token.assetId}_interest`,
      userIndexStaked: `${address}_indexStaked`,
      claimedReward: `${address}_claimedRewardValue`,
      lastClaimDate: `${address}_lastClaim`,
    };
    const response = await this.pool.contractKeysRequest(
      Object.values(keysArray)
    );

    const parsedNodeResponse = [...(response ?? [])].reduce<Record<string, BN>>(
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

    const globalTokenBalance = parsedNodeResponse["globalTokenBalance"];
    const globalLastCheckTokenEarnings =
      parsedNodeResponse["globalLastCheckTokenEarnings"];
    const globalIndexStaked = parsedNodeResponse["globalIndexStaked"];
    const globalLastCheckTokenInterest =
      parsedNodeResponse["globalLastCheckTokenInterest"];
    const userLastCheckTokenInterest =
      parsedNodeResponse["userLastCheckTokenInterest"];
    const userIndexStaked = parsedNodeResponse["userIndexStaked"];
    const claimedReward = parsedNodeResponse["claimedReward"];
    const lastClaimDate = parsedNodeResponse["lastClaimDate"];

    this.setTotalClaimedReward(claimedReward);
    this.setUserIndexStaked(userIndexStaked);
    lastClaimDate && this._setLastClaimDate(lastClaimDate);

    const newEarnings = BN.max(
      realBalance.minus(globalTokenBalance),
      globalLastCheckTokenEarnings
    ).minus(globalLastCheckTokenEarnings);

    const lastCheckInterest = globalIndexStaked.eq(0)
      ? BN.ZERO
      : globalLastCheckTokenInterest;

    const currentInterest = lastCheckInterest.plus(
      newEarnings.div(globalIndexStaked)
    );

    const lastCheckUserInterest = userLastCheckTokenInterest
      ? userLastCheckTokenInterest
      : BN.ZERO;

    const rewardAvailable = currentInterest
      .minus(lastCheckUserInterest)
      .times(BN.formatUnits(userIndexStaked, 8));

    const rate =
      this.rootStore.poolsStore.usdnRate(token.assetId, 1) ?? BN.ZERO;

    const usdEquivalent = rewardAvailable.times(rate);

    return {
      value: rewardAvailable.isNaN()
        ? BN.ZERO
        : BN.formatUnits(rewardAvailable, token.decimals),
      assetId: token.assetId,
      usdEquivalent: BN.formatUnits(usdEquivalent, token.decimals),
    };
  };

  updateRewardInfo = async () => {
    const rawData = await Promise.all(
      this.pool.tokens.map(this.getTokenRewardInfo)
    );
    const totalRewardAmount = rawData.reduce(
      (acc, value) =>
        acc.plus(value.usdEquivalent.isNaN() ? BN.ZERO : value.usdEquivalent),
      BN.ZERO
    );
    this.setTotalRewardToClaim(totalRewardAmount);
  };

  get isThereSomethingToClaim() {
    return this.totalRewardToClaim.eq(0);
  }

  get poolCompositionValues() {
    if (this.pool.tokens == null) return [];
    return this.pool.tokens.reduce<
      (IToken & { value: BN; parsedBalance: BN })[]
    >((acc, token) => {
      const balance = BN.formatUnits(
        this.pool.liquidity[token.assetId] ?? BN.ZERO,
        token.decimals
      );
      const rate = this.pool.currentPrice(
        token.assetId,
        this.rootStore.accountStore.TOKENS.USDN.assetId
      );
      return [
        ...acc,
        {
          ...token,
          value: balance.times(rate ?? 0),
          parsedBalance: balance,
        },
      ];
    }, []);
  }

  get poolBalancesTable() {
    if (this.pool.tokens == null) return null;
    return this.pool?.tokens.map((token) => {
      if (this.userIndexStaked == null || this.userIndexStaked?.eq(0)) {
        return { ...token, usdnEquivalent: BN.ZERO, value: BN.ZERO };
      }
      const top = this.pool.liquidity[token.assetId].times(
        this.userIndexStaked ?? BN.ZERO
      );
      const tokenAmountToGet = top.div(this.pool.globalPoolTokenAmount);
      const parserAmount = BN.formatUnits(tokenAmountToGet, token.decimals);
      const rate =
        this.rootStore.poolsStore.usdnRate(token.assetId, 1) ?? BN.ZERO;
      const usdnEquivalent = BN.formatUnits(
        tokenAmountToGet.times(rate),
        token.decimals
      );
      return { ...token, usdnEquivalent: usdnEquivalent, value: parserAmount };
    });
  }

  //todo add history update after claimint
  claimRewards = async () => {
    if (this.totalRewardToClaim.eq(0)) return;
    if (this.pool.layer2Address == null) return;
    this._setLoading(true);
    const { accountStore, notificationStore } = this.rootStore;
    accountStore
      .invoke({
        dApp: this.pool.contractAddress,
        payment: [],
        call: {
          function: "claimIndexRewards",
          args: [],
        },
      })
      .then((txId) => {
        notificationStore.notify(`Your rewards was claimed`, {
          type: "success",
          title: `Success`,
          link: `${accountStore.EXPLORER_LINK}/tx/${txId}`,
          linkTitle: "View on Explorer",
        });
      })
      .catch((e) => {
        notificationStore.notify(e.message ?? JSON.stringify(e), {
          type: "error",
          title: "Transaction is not completed",
        });
      })
      .then(this.updateRewardInfo)
      .finally(() => this._setLoading(false));
  };

  get canClaimRewards() {
    return !(this.totalRewardToClaim.eq(0) || this.loading);
  }

  updatePoolTokenBalances = async () => {
    const { rootStore, pool } = this;
    const { accountStore } = rootStore;
    const { chainId } = accountStore;
    const { data }: { data: TContractAssetBalancesResponse } = await axios.get(
      `${NODE_URL_MAP[chainId]}/assets/balance/${pool.contractAddress}`
    );
    const value = data.balances.map((token) => {
      return { assetId: token.assetId, balance: new BN(token.balance) };
    });
    this.setPoolAssetBalances(value);
  };

  loadTransactionsHistory = async () => {
    const { rootStore, pool } = this;
    const { accountStore } = rootStore;
    const { chainId } = accountStore;
    const v = await nodeService.transactions(
      NODE_URL_MAP[chainId],
      pool.contractAddress
    );
    v && this.setTransactionsHistory(v);
    console.log(v);
  };

  loadMoreHistory = async () => {
    this._setLoadingHistory(true);
    const { rootStore, pool, transactionsHistory } = this;
    const { accountStore } = rootStore;
    const { chainId } = accountStore;
    if (transactionsHistory == null) return;
    const after = transactionsHistory.slice(-1).pop();
    if (after == null) return;
    const v = await nodeService.transactions(
      NODE_URL_MAP[chainId],
      pool.contractAddress,
      10,
      after.id
    );
    console.log("load more", v);
    this._setLoadingHistory(false);
    v && this.setTransactionsHistory([...transactionsHistory, ...v]);
  };
}

type TContractAssetBalancesResponse = {
  address: string;
  balances: IPoolTokenBalance[];
};
type IPoolTokenBalance = {
  assetId: string;
  balance: number;
  issueTransaction: null | any;
  minSponsoredAssetFee: number;
  quantity: number;
  reissuable: boolean;
  sponsorBalance: number;
};
