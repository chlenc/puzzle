import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Card from "@components/Card";
import GridTable from "@components/GridTable";
import BN from "@src/utils/BN";
import Divider from "@components/Divider";
import { useCreateCustomPoolsVM } from "@screens/CreateCustomPools/CreateCustomPoolsVm";
import { useStores } from "@stores";
import AddTokenRow from "./AddTokenRow";
import { Row } from "@components/Flex";
import { observer } from "mobx-react-lite";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const AdaptiveRowWithPadding = styled(Row)`
  box-sizing: border-box;
  padding: 16px;
  @media (min-width: 880px) {
    padding: 24px;
  }
`;

const DepositComposition: React.FC<IProps> = () => {
  const vm = useCreateCustomPoolsVM();
  const { accountStore } = useStores();
  return (
    <Root>
      <SizedBox height={24} />
      <Text style={{ width: "100%" }} weight={500} type="secondary">
        Deposit composition
      </Text>
      <SizedBox height={8} />
      <Card paddingMobile="0" paddingDesktop="8px 0">
        <GridTable desktopTemplate={"1fr 1fr"} mobileTemplate={"1fr 1fr"}>
          {vm.poolsAssets.map((token, i) => {
            const balance = accountStore.findBalanceByAssetId(
              token.asset.assetId
            );
            const available =
              balance &&
              balance.balance &&
              BN.formatUnits(balance?.balance, token.asset.decimals);
            const depositAmount = vm.maxToProvide
              .times(vm.providedPercentOfPool)
              .div(100)

              .times(token.share.div(100).div(10));
            return (
              <AddTokenRow
                symbol={token.asset.symbol}
                key={i}
                availableAmount={available}
                //todo change to tokens amount
                depositPrefix="$"
                depositAmount={depositAmount}
                percent={token.share.div(10).toNumber()}
                logo={token.asset.logo}
              />
            );
          })}
        </GridTable>
        <Divider />
        <AdaptiveRowWithPadding justifyContent="space-between">
          <Text fitContent>Total value</Text>
          <Text weight={500} fitContent nowrap>
            $
            {vm.maxToProvide
              .times(vm.providedPercentOfPool)
              .div(100)
              .toFormat(2)}
          </Text>
        </AdaptiveRowWithPadding>
      </Card>
    </Root>
  );
};
export default observer(DepositComposition);
