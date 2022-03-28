import mainnetTokens from "./mainnetTokens.json";
import tokenLogos from "@src/assets/tokens/tokenLogos";
import { IPoolConfig } from "@src/constants/index";

export { mainnetTokens };

export enum MAINNET_POOL_ID {
  farmsPool1 = "farms",
  farmsPool2 = "farms2",
  defi = "defi",
  puzzle = "puzzle",
  race = "race",
  egg = "egg",
  winter = "winter",
  www = "www",
  muna = "muna",
  sheg = "sheg",
  pool10 = "pool10",
  nsbt = "nsbt",
  //   btc = "btc",
}

export const MAINNET_ROUTES = {
  ROOT: "/",
  STAKE: "/stake",
  TRADE: "/trade",
  INVEST: "/invest",
  ULTRASTAKE: "/ultrastake",
  WALLET: "/wallet",
  TRANSFER: "/transfer",
  POOLS: "pools/:poolId",
  POOLS_CREATE: "pools/create",
  POOLS_WITHDRAW: "/pools/withdraw/:cardId",
  POOLS_ADD_LIQUIDITY: "/pools/addLiquidity/:cardId",
  withdraw: {
    farms: `${MAINNET_POOL_ID.farmsPool1}/withdraw`,
    farms2: `${MAINNET_POOL_ID.farmsPool2}/withdraw`,
    race: `${MAINNET_POOL_ID.race}/withdraw`,
    defi: `${MAINNET_POOL_ID.defi}/withdraw`,
    egg: `${MAINNET_POOL_ID.egg}/withdraw`,
    winter: `${MAINNET_POOL_ID.winter}/withdraw`,
    www: `${MAINNET_POOL_ID.www}/withdraw`,
    muna: `${MAINNET_POOL_ID.muna}/withdraw`,
    sheg: `${MAINNET_POOL_ID.sheg}/withdraw`,
    pool10: `${MAINNET_POOL_ID.pool10}/withdraw`,
    nsbt: `${MAINNET_POOL_ID.nsbt}/withdraw`,
    //     btc: `${MAINNET_POOL_ID.btc}/withdraw`,
  },
  pools: {
    farms: MAINNET_POOL_ID.farmsPool1,
    farms2: MAINNET_POOL_ID.farmsPool2,
    defi: MAINNET_POOL_ID.defi,
    race: MAINNET_POOL_ID.race,
    puzzle: MAINNET_POOL_ID.puzzle,
    egg: MAINNET_POOL_ID.egg,
    winter: MAINNET_POOL_ID.winter,
    www: MAINNET_POOL_ID.www,
    muna: MAINNET_POOL_ID.muna,
    sheg: MAINNET_POOL_ID.sheg,
    pool10: MAINNET_POOL_ID.pool10,
    nsbt: MAINNET_POOL_ID.nsbt,
    //     btc: MAINNET_POOL_ID.btc,
  },
  addLiquidity: {
    farms: `${MAINNET_POOL_ID.farmsPool1}/addLiquidity`,
    farms2: `${MAINNET_POOL_ID.farmsPool2}/addLiquidity`,
    race: `${MAINNET_POOL_ID.race}/addLiquidity`,
    defi: `${MAINNET_POOL_ID.defi}/addLiquidity`,
    egg: `${MAINNET_POOL_ID.egg}/addLiquidity`,
    winter: `${MAINNET_POOL_ID.winter}/addLiquidity`,
    www: `${MAINNET_POOL_ID.www}/addLiquidity`,
    muna: `${MAINNET_POOL_ID.muna}/addLiquidity`,
    sheg: `${MAINNET_POOL_ID.sheg}/addLiquidity`,
    pool10: `${MAINNET_POOL_ID.pool10}/addLiquidity`,
    nsbt: `${MAINNET_POOL_ID.nsbt}/addLiquidity`,
    //     btc: `${MAINNET_POOL_ID.btc}/addLiquidity`,
  },
  addOneToken: {
    farms: `${MAINNET_POOL_ID.farmsPool1}/addOneToken`,
    farms2: `${MAINNET_POOL_ID.farmsPool2}/addOneToken`,
    race: `${MAINNET_POOL_ID.race}/addOneToken`,
    defi: `${MAINNET_POOL_ID.defi}/addOneToken`,
    egg: `${MAINNET_POOL_ID.egg}/addOneToken`,
    winter: `${MAINNET_POOL_ID.winter}/addOneToken`,
    www: `${MAINNET_POOL_ID.www}/addOneToken`,
    muna: `${MAINNET_POOL_ID.muna}/addOneToken`,
    sheg: `${MAINNET_POOL_ID.sheg}/addOneToken`,
    pool10: `${MAINNET_POOL_ID.pool10}/addOneToken`,
    nsbt: `${MAINNET_POOL_ID.nsbt}/addOneToken`,
    //     btc: `${MAINNET_POOL_ID.btc}/addOneToken`,
  },
  invest: {
    farms: `${MAINNET_POOL_ID.farmsPool1}/invest`,
    farms2: `${MAINNET_POOL_ID.farmsPool2}/invest`,
    race: `${MAINNET_POOL_ID.race}/invest`,
    defi: `${MAINNET_POOL_ID.defi}/invest`,
    egg: `${MAINNET_POOL_ID.egg}/invest`,
    winter: `${MAINNET_POOL_ID.winter}/invest`,
    www: `${MAINNET_POOL_ID.www}/invest`,
    muna: `${MAINNET_POOL_ID.muna}/invest`,
    sheg: `${MAINNET_POOL_ID.sheg}/invest`,
    pool10: `${MAINNET_POOL_ID.pool10}/invest`,
    nsbt: `${MAINNET_POOL_ID.nsbt}/invest`,
    //     btc: `${MAINNET_POOL_ID.btc}/invest`,
  },
};

export const MAINNET_POOL_CONFIG: Record<MAINNET_POOL_ID, IPoolConfig> = {
  //   [MAINNET_POOL_ID.btc]: {
  //     contractAddress: "3P4bSEVNM3xdmFaefX5nc9qT4fDtbwo9Dx4",
  //     layer2Address: "3PMhFeQfhAVsUB71DGN8ZdwMzRVkMGM5T3n",
  //     baseTokenId: mainnetTokens.BTC.assetId,
  //     name: "BTC",
  //     logo: tokenLogos.BTC,
  //     defaultAssetId0: mainnetTokens.BTC.assetId,
  //     defaultAssetId1: mainnetTokens.USDN.assetId,
  //     tokens: [
  //       { ...mainnetTokens.BTC, shareAmount: 0.2, logo: tokenLogos.BTC },
  //       { ...mainnetTokens.ETH, shareAmount: 0.15, logo: tokenLogos.ETH },
  //       { ...mainnetTokens.LTC, shareAmount: 0.05, logo: tokenLogos.LTC },
  //       { ...mainnetTokens.USDC, shareAmount: 0.2, logo: tokenLogos.USDC },
  //       { ...mainnetTokens.USDT, shareAmount: 0.2, logo: tokenLogos.USDT },
  //       { ...mainnetTokens.USDN, shareAmount: 0.2, logo: tokenLogos.USDN },
  //     ],
  //   },  
  [MAINNET_POOL_ID.pool10]: {
    contractAddress: "3PLiXyywNThdvf3vVEUxwc7TJTucjZvuegh",
    layer2Address: "3P4oa7KAvocZhPXQ1B6ncAopzLEZUtMwbHF",
    baseTokenId: mainnetTokens.BTC.assetId,
    name: "Pool 10",
    logo: tokenLogos.BTC,
    defaultAssetId0: mainnetTokens.BTC.assetId,
    defaultAssetId1: mainnetTokens.USDN.assetId,
    tokens: [
      { ...mainnetTokens.WAVES, shareAmount: 0.25, logo: tokenLogos.WAVES },
      { ...mainnetTokens.BTC, shareAmount: 0.25, logo: tokenLogos.BTC },
      { ...mainnetTokens.ETH, shareAmount: 0.25, logo: tokenLogos.ETH },
      { ...mainnetTokens.USDN, shareAmount: 0.25, logo: tokenLogos.USDN },
    ],
  },
  [MAINNET_POOL_ID.nsbt]: {
    contractAddress: "3PEStCRPQuW3phthTtQ5upGeb4WZ47kssyM",
    layer2Address: "3PD7yAzyCEMNBnXzE8AuSsqogHUpSLjwAYA",
    baseTokenId: mainnetTokens.NSBT.assetId,
    name: "sNSBT/NSBT pool",
    logo: tokenLogos.SNSBT,
    defaultAssetId0: mainnetTokens.SNSBT.assetId,
    defaultAssetId1: mainnetTokens.NSBT.assetId,
    tokens: [
      { ...mainnetTokens.SNSBT, shareAmount: 0.75, logo: tokenLogos.SNSBT },
      { ...mainnetTokens.NSBT, shareAmount: 0.20, logo: tokenLogos.NSBT },
      { ...mainnetTokens.USDN, shareAmount: 0.05, logo: tokenLogos.USDN },
    ],
  },
  [MAINNET_POOL_ID.www]: {
    contractAddress: "3PAviuHPCX8fD7M5fGpFTQZb4HchWCJb3ct",
    layer2Address: "3PFF8UuNfvAGk6KvgyeD4HfZ4TRmHgtgt5W",
    baseTokenId: mainnetTokens.WX.assetId,
    name: "WWW Pool 🔥",
    logo: tokenLogos.WX,
    defaultAssetId0: mainnetTokens.WX.assetId,
    defaultAssetId1: mainnetTokens.USDN.assetId,
    tokens: [
      { ...mainnetTokens.WX, shareAmount: 0.6, logo: tokenLogos.WX },
      { ...mainnetTokens.WCT, shareAmount: 0.1, logo: tokenLogos.WCT },
      { ...mainnetTokens.WEST, shareAmount: 0.1, logo: tokenLogos.WEST },
      { ...mainnetTokens.USDN, shareAmount: 0.2, logo: tokenLogos.USDN },
    ],
  },
  [MAINNET_POOL_ID.sheg]: {
    contractAddress: "3PC87Z4vUzet6tTrTQmzJmW1UtouKjLhBJi",
    layer2Address: "3PJvGRBaL5FrK5tHax6cJvkZWrHtDUmiDdF",
    baseTokenId: mainnetTokens.SHEG.assetId,
    name: "Ducklization IDO Pool",
    logo: tokenLogos.SHEG,
    defaultAssetId0: mainnetTokens.SHEG.assetId,
    defaultAssetId1: mainnetTokens.USDN.assetId,
    tokens: [
      { ...mainnetTokens.SHEG, shareAmount: 0.5, logo: tokenLogos.SHEG },
      { ...mainnetTokens.USDN, shareAmount: 0.25, logo: tokenLogos.USDN },
      { ...mainnetTokens.WAVES, shareAmount: 0.13, logo: tokenLogos.WAVES },
      { ...mainnetTokens.EGG, shareAmount: 0.12, logo: tokenLogos.EGG },
    ],
  },
  [MAINNET_POOL_ID.muna]: {
    contractAddress: "3P9EydokbUM5XFrHgEUT9bNVgfF7fGmtxLk",
    layer2Address: "3PLAM86Pm7jR3RTe7JSit2FDf8DnhF8ogG6",
    baseTokenId: mainnetTokens.MUNA.assetId,
    name: "Muna BNB Pool",
    logo: tokenLogos.MUNA,
    defaultAssetId0: mainnetTokens.MUNA.assetId,
    defaultAssetId1: mainnetTokens.BNB.assetId,
    tokens: [
      { ...mainnetTokens.MUNA, shareAmount: 0.5, logo: tokenLogos.MUNA },
      { ...mainnetTokens.BNB, shareAmount: 0.25, logo: tokenLogos.BNB },
      { ...mainnetTokens.USDN, shareAmount: 0.25, logo: tokenLogos.USDN },
    ],
  },
  [MAINNET_POOL_ID.winter]: {
    contractAddress: "3PEZe3Z2FqaVbMTjWJUpnQGxhWh2JRptujM",
    layer2Address: "3PNBamg45irg9R58gMBM6UvBaUhX5bVys2r",
    baseTokenId: mainnetTokens.USDN.assetId,
    name: "Warm Winter Pool ❄️",
    logo: tokenLogos.USDC,
    defaultAssetId0: mainnetTokens.EURN.assetId,
    defaultAssetId1: mainnetTokens.USDN.assetId,
    tokens: [
      { ...mainnetTokens.USDC, shareAmount: 0.3, logo: tokenLogos.USDC },
      { ...mainnetTokens.USDT, shareAmount: 0.1, logo: tokenLogos.USDT },
      { ...mainnetTokens.USDN, shareAmount: 0.2, logo: tokenLogos.USDN },
      { ...mainnetTokens.PUZZLE, shareAmount: 0.22, logo: tokenLogos.PUZZLE },
      { ...mainnetTokens.VIRES, shareAmount: 0.08, logo: tokenLogos.VIRES },
      { ...mainnetTokens.EURN, shareAmount: 0.1, logo: tokenLogos.EURN },
    ],
  },
  [MAINNET_POOL_ID.defi]: {
    contractAddress: "3PDrYPF6izza2sXWffzTPF7e2Fcir2CMpki",
    layer2Address: "3PJAg4A4gPQXtSLKQNAf5VxbXV2QVM9wPei",
    baseTokenId: mainnetTokens.USDN.assetId,
    name: "DeFi",
    logo: tokenLogos.WAVES,
    defaultAssetId0: mainnetTokens.EGG.assetId,
    defaultAssetId1: mainnetTokens.USDN.assetId,
    tokens: [
      { ...mainnetTokens.WAVES, shareAmount: 0.2, logo: tokenLogos.WAVES },
      { ...mainnetTokens.EGG, shareAmount: 0.1, logo: tokenLogos.EGG },
      { ...mainnetTokens.SWOP, shareAmount: 0.05, logo: tokenLogos.SWOP },
      { ...mainnetTokens.VIRES, shareAmount: 0.05, logo: tokenLogos.VIRES },
      { ...mainnetTokens.NSBT, shareAmount: 0.05, logo: tokenLogos.NSBT },
      { ...mainnetTokens.ENNO, shareAmount: 0.05, logo: tokenLogos.ENNO },
      { ...mainnetTokens.SIGN, shareAmount: 0.05, logo: tokenLogos.SIGN },
      { ...mainnetTokens.PUZZLE, shareAmount: 0.2, logo: tokenLogos.PUZZLE },
      { ...mainnetTokens.USDT, shareAmount: 0.1, logo: tokenLogos.USDT },
      { ...mainnetTokens.USDN, shareAmount: 0.15, logo: tokenLogos.USDN },
    ],
  },
  [MAINNET_POOL_ID.defi]: {
    contractAddress: "3PDrYPF6izza2sXWffzTPF7e2Fcir2CMpki",
    layer2Address: "3PJAg4A4gPQXtSLKQNAf5VxbXV2QVM9wPei",
    baseTokenId: mainnetTokens.USDN.assetId,
    name: "Waves DeFi Pool 🔹",
    logo: tokenLogos.WAVES,
    defaultAssetId0: mainnetTokens.EGG.assetId,
    defaultAssetId1: mainnetTokens.USDN.assetId,
    tokens: [
      { ...mainnetTokens.WAVES, shareAmount: 0.2, logo: tokenLogos.WAVES },
      { ...mainnetTokens.EGG, shareAmount: 0.1, logo: tokenLogos.EGG },
      { ...mainnetTokens.SWOP, shareAmount: 0.05, logo: tokenLogos.SWOP },
      { ...mainnetTokens.VIRES, shareAmount: 0.05, logo: tokenLogos.VIRES },
      { ...mainnetTokens.NSBT, shareAmount: 0.05, logo: tokenLogos.NSBT },
      { ...mainnetTokens.ENNO, shareAmount: 0.05, logo: tokenLogos.ENNO },
      { ...mainnetTokens.SIGN, shareAmount: 0.05, logo: tokenLogos.SIGN },
      { ...mainnetTokens.PUZZLE, shareAmount: 0.2, logo: tokenLogos.PUZZLE },
      { ...mainnetTokens.USDT, shareAmount: 0.1, logo: tokenLogos.USDT },
      { ...mainnetTokens.USDN, shareAmount: 0.15, logo: tokenLogos.USDN },
    ],
  },
  [MAINNET_POOL_ID.farmsPool1]: {
    contractAddress: "3PPRHHF9JKvDLkAc3aHD3Kd5tRZp1CoqAJa",
    layer2Address: "3PDVDYZiwJzK3pu8vcknuLiKCYBPx6XZntG",
    baseTokenId: mainnetTokens.EGG.assetId,
    name: "Pool Farms 1",
    logo: tokenLogos.EGG,
    defaultAssetId0: mainnetTokens.MATH.assetId,
    defaultAssetId1: mainnetTokens.USDN.assetId,
    tokens: [
      {
        ...mainnetTokens.DUXPLORER,
        shareAmount: 0.1,
        logo: tokenLogos.DUXPLORER,
      },
      { ...mainnetTokens.MATH, shareAmount: 0.1, logo: tokenLogos.MATH },
      { ...mainnetTokens.TURTLE, shareAmount: 0.1, logo: tokenLogos.TURTLE },
      {
        ...mainnetTokens.EGGSEGGS,
        shareAmount: 0.1,
        logo: tokenLogos.EGGSEGGS,
      },
      {
        ...mainnetTokens.PESOLATINO,
        shareAmount: 0.1,
        logo: tokenLogos.PESOLATINO,
      },
      { ...mainnetTokens.FOMO, shareAmount: 0.1, logo: tokenLogos.FOMO },
      { ...mainnetTokens.MUNDO, shareAmount: 0.1, logo: tokenLogos.MUNDO },
      {
        ...mainnetTokens.EGGPOINT,
        shareAmount: 0.1,
        logo: tokenLogos.EGGPOINT,
      },
      { ...mainnetTokens.EGG, shareAmount: 0.1, logo: tokenLogos.EGG },
      { ...mainnetTokens.USDN, shareAmount: 0.1, logo: tokenLogos.USDN },
    ],
  },
  [MAINNET_POOL_ID.farmsPool2]: {
    contractAddress: "3PKYPKJPHZENAAwH9e7TF5edDgukNxxBt3M",
    layer2Address: "3PLNxoMJYKzcA8qQ7hQidGDaUJNvM4w36nj",
    baseTokenId: mainnetTokens.EGG.assetId,
    name: "Pool Farms 2",
    logo: tokenLogos.EGG,
    defaultAssetId0: mainnetTokens.MARVIN.assetId,
    defaultAssetId1: mainnetTokens.USDN.assetId,
    tokens: [
      { ...mainnetTokens.ENDO, shareAmount: 0.1, logo: tokenLogos.ENDO },
      { ...mainnetTokens.MARVIN, shareAmount: 0.1, logo: tokenLogos.MARVIN },
      { ...mainnetTokens.EGGMOON, shareAmount: 0.1, logo: tokenLogos.EGGMOON },
      { ...mainnetTokens.STREET, shareAmount: 0.1, logo: tokenLogos.STREET },
      { ...mainnetTokens.KOLKHOZ, shareAmount: 0.1, logo: tokenLogos.KOLKHOZ },
      { ...mainnetTokens.FORKLOG, shareAmount: 0.1, logo: tokenLogos.FORKLOG },
      { ...mainnetTokens.CGU, shareAmount: 0.1, logo: tokenLogos.CGU },
      { ...mainnetTokens.EGG, shareAmount: 0.2, logo: tokenLogos.EGG },
      { ...mainnetTokens.USDN, shareAmount: 0.1, logo: tokenLogos.USDN },
    ],
  },
  [MAINNET_POOL_ID.race]: {
    contractAddress: "3PNK5ypnPJioLmLUzfK6ezpaePHLxZd6QLj",
    layer2Address: "3PQSAdwsdyPVVpfBwjtgXboVXUZgeYHycWM",
    baseTokenId: mainnetTokens.USDN.assetId,
    name: "Race Mega Pool 🚜",
    logo: tokenLogos.RACE,
    defaultAssetId0: mainnetTokens.RACE.assetId,
    defaultAssetId1: mainnetTokens.USDN.assetId,
    tokens: [
      { ...mainnetTokens.EGG, shareAmount: 0.4, logo: tokenLogos.EGG },
      { ...mainnetTokens.RACE, shareAmount: 0.4, logo: tokenLogos.RACE },
      { ...mainnetTokens.USDN, shareAmount: 0.2, logo: tokenLogos.USDN },
    ],
  },
  [MAINNET_POOL_ID.egg]: {
    contractAddress: "3PMHkdVCzeLAYuCh92FPtusuxdLk5xMB51y",
    layer2Address: "3P84BhX5dCVs1TCgYnGa57kCHrMz4mUBXyE",
    baseTokenId: mainnetTokens.EGG.assetId,
    name: "Egg Uneven Pool 🥚",
    logo: tokenLogos.EGG,
    defaultAssetId0: mainnetTokens.USDN.assetId,
    defaultAssetId1: mainnetTokens.EGG.assetId,
    tokens: [
      { ...mainnetTokens.EGG, shareAmount: 0.8, logo: tokenLogos.EGG },
      { ...mainnetTokens.USDN, shareAmount: 0.2, logo: tokenLogos.USDN },
    ],
  },
  [MAINNET_POOL_ID.puzzle]: {
    contractAddress: "3PFDgzu1UtswAkCMxqqQjbTeHaX4cMab8Kh",
    baseTokenId: mainnetTokens.USDN.assetId,
    name: "Puzzle Pool",
    logo: tokenLogos.PUZZLE,
    defaultAssetId0: mainnetTokens.PUZZLE.assetId,
    defaultAssetId1: mainnetTokens.USDN.assetId,
    tokens: [
      { ...mainnetTokens.USDT, shareAmount: 0.1, logo: tokenLogos.USDT },
      { ...mainnetTokens.PUZZLE, shareAmount: 0.8, logo: tokenLogos.PUZZLE },
      { ...mainnetTokens.USDN, shareAmount: 0.1, logo: tokenLogos.USDN },
    ],
  },
};

export const MAINNET_CONTRACTS_ADDRESSES = {
  staking: "3PFTbywqxtFfukX3HyT881g4iW5K4QL3FAS",
  ultraStaking: "3PKUxbZaSYfsR7wu2HaAgiirHYwAMupDrYW",
  aggregator: "3PGFHzVGT4NTigwCKP1NcwoXkodVZwvBuuU",
};
