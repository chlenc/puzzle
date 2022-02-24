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

export interface IArtWork {
  floorPrice?: number;
  name: string;
  imageLink: string;
  marketLink: string;
  typeId: string;
  apy?: number;
}

export interface IStakingStatsResponse {
  classic: { apy: number };
  ultra: { apy: number };
}

export interface INFT {
  assetId: string;
  decimals: number;
  description: string;
  issueHeight: number;
  issueTimestamp: number;
  issuer: string;
  issuerPublicKey: string;
  minSponsoredAssetFee: null | any;
  name: string;
  originTransactionId: string;
  quantity: number;
  reissuable: boolean;
  scripted: boolean;
}

const nodeService = {
  getAddressNfts: async (address: string): Promise<INFT[]> => {
    const url = `https://nodes.wavesnodes.com/assets/nft/${address}/limit/1000`;
    const { data } = await axios.get(url);
    return data;
  },
};

export default nodeService;