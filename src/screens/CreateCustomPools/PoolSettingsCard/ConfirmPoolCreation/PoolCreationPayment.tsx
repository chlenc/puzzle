import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Card from "@components/Card";
import NoPayment from "./NoPayment";
import SelectArtefact, {
  SelectArtefactSkeleton,
} from "@screens/CreateCustomPools/PoolSettingsCard/ConfirmPoolCreation/SelectArtefact";
import { useCreateCustomPoolsVM } from "@screens/CreateCustomPools/CreateCustomPoolsVm";
import Notification from "@components/Notification";
import { useStores } from "@stores";
import BN from "@src/utils/BN";
import { TOKENS_BY_SYMBOL } from "@src/constants";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const PoolCreationPayment: React.FC<IProps> = () => {
  const { accountStore, nftStore } = useStores();

  const { findBalanceByAssetId } = accountStore;
  const puzzleBalance = findBalanceByAssetId(TOKENS_BY_SYMBOL.PUZZLE.assetId);
  const vm = useCreateCustomPoolsVM();
  return (
    <Root>
      <Text type="secondary" weight={500}>
        Payment for creation
      </Text>
      <SizedBox height={8} />
      <Card>
        {nftStore.accountNFTs == null && <SelectArtefactSkeleton />}
        {nftStore.accountNFTs != null &&
          (vm.isThereArtefacts ? <SelectArtefact /> : <NoPayment />)}
        {puzzleBalance &&
          puzzleBalance?.balance?.lt(
            BN.parseUnits(vm.puzzleNFTPrice, puzzleBalance.decimals)
          ) && (
            <div style={{ width: "100%" }}>
              <SizedBox height={8} />
              <Notification
                type="warning"
                text="Your Puzzle balance is too low to buy NFT."
              />
            </div>
          )}
      </Card>
    </Root>
  );
};
export default observer(PoolCreationPayment);
