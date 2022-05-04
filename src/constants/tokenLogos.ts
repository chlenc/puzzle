import mathLogo from "@src/assets/tokens/math-logo.png";
import turtleLogo from "@src/assets/tokens/turtle-logo.png";
import eggseggsLogo from "@src/assets/tokens/eggseggs-logo.jpeg";
import latinaLogo from "@src/assets/tokens/latina-logo.png";
import fomoLogo from "@src/assets/tokens/fomo-logo.jpeg";
import mundoLogo from "@src/assets/tokens/mundo-logo.jpeg";
import eggPointLogo from "@src/assets/tokens/eggpoint-logo.jpeg";
import eggLogo from "@src/assets/tokens/EGG.svg";
import endoLogo from "@src/assets/tokens/endo-logo.jpeg";
import marvinLogo from "@src/assets/tokens/marvin-logo.jpeg";
import eggmoonLogo from "@src/assets/tokens/ido-logo.jpeg";
import streetLogo from "@src/assets/tokens/street-logo.svg";
import kolkhozLogo from "@src/assets/tokens/kolkhoz-logo.jpeg";
import forkLogLogo from "@src/assets/tokens/cartel-logo.png";
import cguLogo from "@src/assets/tokens/cgu-logo.png";
import swopLogo from "@src/assets/tokens/SWOP.svg";
import viresLogo from "@src/assets/tokens/VIRES.svg";
import nsbtLogo from "@src/assets/tokens/nsbt-logo.svg";
import ennoLogo from "@src/assets/tokens/enno-logo.svg";
import signLogo from "@src/assets/tokens/sign-logo.svg";
import duxplorerLogo from "@src/assets/tokens/duxplorer-logo.png";
import usdtLogo from "@src/assets/tokens/USDT.svg";
import puzzleLogo from "@src/assets/tokens/PUZZLE.svg";
import wavesLogo from "@src/assets/tokens/waves-logo.svg";
import usdnLogo from "@src/assets/tokens/usdn-logo.svg";
import raceLogo from "@src/assets/tokens/race-logo.svg";
import unknownLogo from "@src/assets/tokens/unknown-logo.svg";
import btcLogo from "@src/assets/tokens/bitcoin.svg";
import ltcLogo from "@src/assets/tokens/ltc.svg";
import ethLogo from "@src/assets/tokens/ethereum.svg";
import usdcLogo from "@src/assets/tokens/usdc.svg";
import eurn from "@src/assets/tokens/eurn.svg";
import wxLogo from "@src/assets/tokens/WX.svg";
import westLogo from "@src/assets/tokens/WEST.svg";
import wctLogo from "@src/assets/tokens/WCT.svg";
import munaLogo from "@src/assets/tokens/MUNA.svg";
import bnbLogo from "@src/assets/tokens/BNB.svg";
import shegLogo from "@src/assets/tokens/SHEG.png";
import snsbtLogo from "@src/assets/tokens/SNSBT.png";
import tpuzzleLogo from "@src/assets/tokens/staked-puzzle.svg";
import tokens from "./tokens.json";

const tokenLogos: Record<string, string> = {
  DUXPLORER: duxplorerLogo,
  MATH: mathLogo,
  TURTLE: turtleLogo,
  EGGSEGGS: eggseggsLogo,
  PESOLATINO: latinaLogo,
  FOMO: fomoLogo,
  MUNDO: mundoLogo,
  EGGPOINT: eggPointLogo,
  EGG: eggLogo,
  USDN: usdnLogo,
  ENDO: endoLogo,
  MARVIN: marvinLogo,
  EGGMOON: eggmoonLogo,
  STREET: streetLogo,
  KOLKHOZ: kolkhozLogo,
  FORKLOG: forkLogLogo,
  CGU: cguLogo,
  WAVES: wavesLogo,
  SWOP: swopLogo,
  VIRES: viresLogo,
  NSBT: nsbtLogo,
  ENNO: ennoLogo,
  SIGN: signLogo,
  PUZZLE: puzzleLogo,
  USDT: usdtLogo,
  RACE: raceLogo,
  BTC: btcLogo,
  ETH: ethLogo,
  LTC: ltcLogo,
  USDC: usdcLogo,
  EURN: eurn,
  WX: wxLogo,
  WEST: westLogo,
  WCT: wctLogo,
  MUNA: munaLogo,
  BNB: bnbLogo,
  SHEG: shegLogo,
  SNSBT: snsbtLogo,
  UNKNOWN: unknownLogo,
  TPUZZLE: tpuzzleLogo,
};
export const tokenLogosByAssetId: Record<string, string> = {
  [tokens.DUXPLORER.assetId]: duxplorerLogo,
  [tokens.MATH.assetId]: mathLogo,
  [tokens.TURTLE.assetId]: turtleLogo,
  [tokens.EGGSEGGS.assetId]: eggseggsLogo,
  [tokens.PESOLATINO.assetId]: latinaLogo,
  [tokens.FOMO.assetId]: fomoLogo,
  [tokens.MUNDO.assetId]: mundoLogo,
  [tokens.EGGPOINT.assetId]: eggPointLogo,
  [tokens.EGG.assetId]: eggLogo,
  [tokens.USDN.assetId]: usdnLogo,
  [tokens.ENDO.assetId]: endoLogo,
  [tokens.MARVIN.assetId]: marvinLogo,
  [tokens.EGGMOON.assetId]: eggmoonLogo,
  [tokens.STREET.assetId]: streetLogo,
  [tokens.KOLKHOZ.assetId]: kolkhozLogo,
  [tokens.FORKLOG.assetId]: forkLogLogo,
  [tokens.CGU.assetId]: cguLogo,
  [tokens.WAVES.assetId]: wavesLogo,
  [tokens.SWOP.assetId]: swopLogo,
  [tokens.VIRES.assetId]: viresLogo,
  [tokens.NSBT.assetId]: nsbtLogo,
  [tokens.ENNO.assetId]: ennoLogo,
  [tokens.SIGN.assetId]: signLogo,
  [tokens.PUZZLE.assetId]: puzzleLogo,
  [tokens.USDT.assetId]: usdtLogo,
  [tokens.RACE.assetId]: raceLogo,
  [tokens.BTC.assetId]: btcLogo,
  [tokens.ETH.assetId]: ethLogo,
  [tokens.LTC.assetId]: ltcLogo,
  [tokens.USDC.assetId]: usdcLogo,
  [tokens.EURN.assetId]: eurn,
  [tokens.WX.assetId]: wxLogo,
  [tokens.WEST.assetId]: westLogo,
  [tokens.WCT.assetId]: wctLogo,
  [tokens.MUNA.assetId]: munaLogo,
  [tokens.BNB.assetId]: bnbLogo,
  [tokens.SHEG.assetId]: shegLogo,
  [tokens.SNSBT.assetId]: snsbtLogo,
};

export default tokenLogos;