import styled from "@emotion/styled";
import React from "react";
import Layout from "@components/Layout";
import { observer, Observer } from "mobx-react-lite";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import {
  AddLiquidityInterfaceVMProvider,
  useAddLiquidityInterfaceVM,
} from "./AddLiquidityInterfaceVM";
import MultipleTokensAddLiquidity from "./MultipleTokensAddLiquidity";
import BaseTokenAddLiquidityAmount from "./BaseTokenAddLiquidityAmount";
import ShortPoolInfoCard from "@components/ShortPoolInfoCard";
import DialogNotification from "@components/Dialog/DialogNotification";
import GoBack from "@components/GoBack";
import Card from "@components/Card";
import SwitchButtons from "@components/SwitchButtons";
import { useNavigate, useParams } from "react-router-dom";
import ChangePoolModal from "@src/ChangePoolModal";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  min-height: 100%;
  margin-bottom: 24px;
  margin-top: 40px;
  width: 100%;
  max-width: calc(560px + 32px);
  box-sizing: border-box;
  @media (min-width: 880px) {
    margin-top: 56px;
  }
`;

const AddLiquidityInterfaceImpl = () => {
  const vm = useAddLiquidityInterfaceVM();
  const pool = vm.pool;
  const addLiquidityRoute = `/pools/${vm.poolDomain}/addLiquidity`;
  const addOneTokenRoute = `/pools/${vm.poolDomain}/addOneToken`;
  const navigate = useNavigate();
  const activeTab = addOneTokenRoute.includes(window.location.pathname) ? 1 : 0;
  return (
    <Layout>
      <Observer>
        {() => (
          <Root>
            <GoBack
              link={`/pools/${vm.poolDomain}/invest`}
              text="Back to Pool Info"
            />
            <SizedBox height={24} />
            <Text weight={500} size="large">
              Deposit liquidity
            </Text>
            <SizedBox height={4} />
            <Text size="medium">
              Select the method of adding liquidity and enter the value
            </Text>
            <SizedBox height={24} />
            <ShortPoolInfoCard
              title="To"
              poolLogo={pool && pool.logo}
              poolName={pool && pool.name}
              apy={vm.stats?.apy && vm.stats.apy.toFormat(2) + " %"}
              onChangePool={() => vm.setChangePoolModalOpen(true)}
            />
            <SizedBox height={24} />
            <Text weight={500} type="secondary">
              Method
            </Text>
            <SizedBox height={8} />
            <Card>
              <SwitchButtons
                values={["Multiple tokens", `${vm.baseToken.symbol} Token`]}
                active={activeTab}
                onActivate={(i) => {
                  i === 1
                    ? navigate(addOneTokenRoute)
                    : navigate(addLiquidityRoute);
                }}
              />
            </Card>
            <SizedBox height={24} />
            {window.location.pathname.includes(addLiquidityRoute) && (
              <MultipleTokensAddLiquidity />
            )}
            {window.location.pathname.includes(addOneTokenRoute) && (
              <BaseTokenAddLiquidityAmount />
            )}
            <DialogNotification
              onClose={() => vm.setNotificationParams(null)}
              title={vm.notificationParams?.title ?? ""}
              description={vm.notificationParams?.description}
              buttonsDirection={vm.notificationParams?.buttonsDirection}
              type={vm.notificationParams?.type}
              buttons={vm.notificationParams?.buttons}
              style={{ maxWidth: 360 }}
              visible={vm.notificationParams != null}
            />
            <ChangePoolModal
              activePoolId={vm.poolDomain}
              onClose={() => vm.setChangePoolModalOpen(false)}
              visible={vm.changePoolModalOpen}
              onChange={(id) =>
                navigate(
                  activeTab === 1
                    ? `/pools/${id}/addOneToken`
                    : `/pools/${id}/addLiquidity`
                )
              }
            />
          </Root>
        )}
      </Observer>
    </Layout>
  );
};

const AddLiquidityInterface: React.FC = () => {
  const { poolDomain } = useParams<{ poolDomain: string }>();
  return (
    <AddLiquidityInterfaceVMProvider poolDomain={poolDomain ?? ""}>
      <AddLiquidityInterfaceImpl />
    </AddLiquidityInterfaceVMProvider>
  );
};

export default observer(AddLiquidityInterface);
