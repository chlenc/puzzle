import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { action, makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import { mainnetTokens } from "@src/constants/mainnetConfig";
import BN from "@src/utils/BN";
import statsService, { IArtwork } from "@src/services/statsService";

const ctx = React.createContext<NFTStakingVM | null>(null);

export const NFTStakingVMProvider: React.FC = ({ children }) => {
  const rootStore = useStores();
  const store = useMemo(() => new NFTStakingVM(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useNFTStakingVM = () => useVM(ctx);

class NFTStakingVM {
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.syncStats().catch();
  }

  public puzzleAmount: BN = BN.ZERO;
  @action.bound public setPuzzleAmount = (value: BN) =>
    (this.puzzleAmount = value);

  public artworks: Array<IArtwork> = [];
  @action.bound private _setArtworks = (artworks: Array<IArtwork>) =>
    (this.artworks = artworks);

  public get puzzleToken() {
    return this.rootStore.accountStore.findBalanceByAssetId(
      mainnetTokens.PUZZLE.assetId
    );
  }

  syncStats = async () => {
    const data = await statsService.artworks();
    this._setArtworks(data);
  };
}
