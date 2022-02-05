import axios from "axios";

export interface IStatsPoolItemResponse {
  apy: number;
  liquidity: number;
  monthly_volume: number;
}

export interface IPoolVolume {
  date: number;
  volume: number;
}

export interface IStatsByPoolAndPeriodResponse extends IStatsPoolItemResponse {
  fees: number;
  volume: IPoolVolume[];
}

//name
//art_name_DxJAxqQhWAojdnzmcZpHAE3Hbm39JPAaCq9rEMJqNn61_3PFTZA987iHHbP6UWVTbbrquNetcFSULqUP
//PUZZLE Early Eagle"

//soldOut
//art_onsale_DxJAxqQhWAojdnzmcZpHAE3Hbm39JPAaCq9rEMJqNn61_3PFTZA987iHHbP6UWVTbbrquNetcFSULqUP
//false

//price
//art_price_DxJAxqQhWAojdnzmcZpHAE3Hbm39JPAaCq9rEMJqNn61_3PFTZA987iHHbP6UWVTbbrquNetcFSULqUP
//10000000

//currency assetId
//art_assetAccepted_DxJAxqQhWAojdnzmcZpHAE3Hbm39JPAaCq9rEMJqNn61_3PFTZA987iHHbP6UWVTbbrquNetcFSULqUP
//DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p

//low quality pictire
//art_display_cid_DxJAxqQhWAojdnzmcZpHAE3Hbm39JPAaCq9rEMJqNn61_3PFTZA987iHHbP6UWVTbbrquNetcFSULqUP
//bafybeih3bj2c5msxiazqgdjqxosrqd3fweutquomn4zs4pcgnbjsfl5si4/display.jpeg
//https://bafybeih3bj2c5msxiazqgdjqxosrqd3fweutquomn4zs4pcgnbjsfl5si4.ipfs.infura-ipfs.io/display.jpeg

//high quality pictire
//art_export_cid_DxJAxqQhWAojdnzmcZpHAE3Hbm39JPAaCq9rEMJqNn61_3PFTZA987iHHbP6UWVTbbrquNetcFSULqUP
//bafybeicu3jbyory4s34dzgbxsjn2t3klfueijjoj3hxsjb7tgvfj57csl4/exported.jpeg
//https://bafybeicu3jbyory4s34dzgbxsjn2t3klfueijjoj3hxsjb7tgvfj57csl4.ipfs.infura-ipfs.io/exported.jpeg

export interface IArtwork {
  name: string; // name of nft
  soldOut: boolean; //if nft unavailable soldOut should be true
  price?: number; // is soldOut: true price can be undefined
  assetId: string; // sell currency asset id
  nft: string; // nft token id
  typeId: string; // typeId
  apy: string; // apy
  minimizedImageUrl: string; //low quality pictire
  imageUrl: string; //high quality pictire
}

type TStatsResponse = Record<string, IStatsPoolItemResponse>;

type TStakingStatsResponse = Record<string, number>;

type TArtworksResponse = IArtwork[];

const statsService = {
  pools: async (): Promise<TStatsResponse> => {
    const url = "https://api.puzzleswap.org/stats/pools";
    const { data } = await axios.get(url);
    return data;
  },
  staking: async (): Promise<TStakingStatsResponse> => {
    const url = "https://api.puzzleswap.org/stats/staking";
    const { data } = await axios.get(url);
    return data.classic;
  },
  artworks: async (): Promise<TArtworksResponse> => {
    const url = "https://api.puzzleswap.org/stats/artworks";
    const { data } = await axios.get(url);
    return data;
  },

  getStatsByPoolAndPeriod: async (
    poolId: string,
    period = "30d"
  ): Promise<IStatsByPoolAndPeriodResponse> => {
    const url = `https://api.puzzleswap.org/stats/${poolId}/${period}`;
    const { data } = await axios.get(url);
    return data;
  },
};

export default statsService;
