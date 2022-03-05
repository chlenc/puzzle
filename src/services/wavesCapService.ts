import axios from "axios";

interface IAssetResponse {
  id: string;
  data: {
    "firstPrice_usd-n": number;
    "lastPrice_usd-n": number;
  } | null;
}

const wavesCapService = {
  getAssetsStats: async (assetsId: string[]): Promise<IAssetResponse[]> => {
    const params = new URLSearchParams();
    for (let i = 0; i < assetsId.length - 1; i++) {
      params.append("assetIds[]=", assetsId[i]);
    }
    const url = `https://wavescap.com/api/assets-info.php?${params.toString()}`;
    const { data } = await axios.get(url);
    return data.assets != null ? data.assets : [];
  },
};
export default wavesCapService;
