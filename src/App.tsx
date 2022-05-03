import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import AddLiquidityInterface from "@src/screens/AddLiquidityInterface";
import InvestToPoolInterface from "@src/screens/InvestToPoolInterface";
import Header from "@components/Header";
import { Column } from "@components/Flex";
import NotFound from "@screens/NotFound";
import Landing from "@screens/Landing";
import { useStores } from "@stores";
import Invest from "@screens/Invest";
import WithdrawLiquidityInterface from "@screens/WithdrawLiquidity";
import TradeInterface from "@screens/TradeInterface";
import Staking from "@screens/Staking";
import NFTStaking from "@screens/NFTStaking";
import MultiSwapInterface from "@screens/MultiSwapInterface";
import WalletModal from "@components/Wallet/WalletModal";
import SendAssetModal from "@components/Wallet/SendAssetModal";
import CreateCustomPools from "./screens/CreateCustomPools";
import { ROUTES } from "./constants";

const Root = styled(Column)`
  width: 100%;
  align-items: center;
  background: #f1f2fe;
  min-height: 100vh;
`;

const App: React.FC = () => {
  const { accountStore } = useStores();
  return (
    <Root>
      <Header />
      <Routes>
        {/* Landing */}
        <Route path={ROUTES.ROOT} element={<Landing />} />
        {/* 404 */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        {/* Stake */}
        <Route path={ROUTES.STAKE} element={<Staking />} />

        {/* Swap routes */}
        <Route path={ROUTES.POOL_SWAP} element={<MultiSwapInterface />} />

        {/* Trade */}
        <Route path={ROUTES.TRADE} element={<TradeInterface />} />

        {/* Invest table routes */}
        <Route path={ROUTES.INVEST} element={<Invest />} />

        {/* Invest pool info routes */}
        <Route path={ROUTES.POOLS_INVEST} element={<InvestToPoolInterface />} />

        {/* Add liquidity routes */}
        <Route
          path={ROUTES.POOLS_ADD_LIQUIDITY}
          element={<AddLiquidityInterface />}
        />
        <Route
          path={ROUTES.POOLS_ADD_ONE_TOKEN}
          element={<AddLiquidityInterface />}
        />

        {/* Withdraw liquidity routes */}
        <Route
          path={ROUTES.POOLS_WITHDRAW}
          element={<WithdrawLiquidityInterface />}
        />

        <Route path={ROUTES.ULTRASTAKE} element={<NFTStaking />} />

        <Route path={ROUTES.POOLS_CREATE} element={<CreateCustomPools />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <WalletModal
        onClose={() => accountStore.setWalletModalOpened(false)}
        visible={accountStore.walletModalOpened}
      />
      <SendAssetModal
        onClose={() => accountStore.setSendAssetModalOpened(false)}
        visible={accountStore.sendAssetModalOpened}
      />
    </Root>
  );
};

export default observer(App);
