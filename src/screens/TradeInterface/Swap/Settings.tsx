import styled from "@emotion/styled";
import React from "react";
import { useTradeVM } from "@screens/TradeInterface/TradeVM";
import { observer } from "mobx-react-lite";
import useCollapse from "react-collapsed";
import Card from "@components/Card";
import { ReactComponent as Close } from "@src/assets/icons/darkClose.svg";
import Text from "@components/Text";
import { Column, Row } from "@src/components/Flex";
import Tooltip from "@src/components/Tooltip";
import BN from "@src/utils/BN";
import SizedBox from "@components/SizedBox";
import { ReactComponent as InfoIcon } from "@src/assets/icons/info.svg";
import ShareTokenInput from "@screens/CreateCustomPools/PoolSettingsCard/SelectAssets/ShareTokenInput";
import TextButton from "@components/TextButton";
import Button from "@components/Button";

interface IProps {}

const Root = styled(Card)`
  position: absolute;
  z-index: 20;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  inset: 0;
`;

//todo
const Tag = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  color: ${({ active }) => (active ? "#ffffff" : "")};
  background: ${({ active }) => (active ? "#7075E9" : "#fffff")};
  border: 1px solid ${({ active }) => (active ? "#7075E9" : "#f1f2fe")};
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
  white-space: nowrap;
`;

const Settings: React.FC<IProps> = () => {
  const vm = useTradeVM();
  const { getCollapseProps } = useCollapse({
    isExpanded: vm.openedSettings,
    easing: "cubic-bezier(0.1, 0.7, 1.0, 0.1)",
  });
  const handleClose = () => vm.setOpenedSettings(false);
  const handleSave = () => {
    handleClose();
  };
  const handleReset = () => {
    handleClose();
  };
  return (
    <Root
      paddingDesktop="16px 24px"
      paddingMobile="16px"
      justifyContent="space-between"
      {...getCollapseProps()}
    >
      {/*header*/}
      <Row
        alignItems="center"
        justifyContent="space-between"
        style={{ borderBottom: "1px solid #f1f2fe", paddingBottom: 16 }}
      >
        <Text weight={500}>Settings</Text>
        <Close onClick={handleClose} style={{ cursor: "pointer" }} />
      </Row>
      <SizedBox height={24} />
      {/*body*/}
      <Column>
        <Column>
          <Tooltip
            config={{ placement: "bottom-end", trigger: "click" }}
            content={
              <Column>
                <Text>
                  Maximum acceptable % difference between the expected amount of
                  token and the amount you actually receive if the token ratio
                  in the pool suddenly change.
                </Text>
              </Column>
            }
          >
            <Row alignItems="center">
              <Text fitContent weight={500}>
                Slippage tolerance
              </Text>
              <InfoIcon style={{ marginLeft: 8 }} />
            </Row>
          </Tooltip>
          <SizedBox height={8} />
          <Row>
            {[0.1, 0.5, 1].map((v) => (
              <Tag
                key={v + "percent"}
                // onClick={() => vm.setSwapFee(new BN((index + 1) * 10))}
                // active={vm.swapFee.eq(new BN((index + 1) * 10))}
                style={{ marginRight: 4 }}
              >
                {v} %
              </Tag>
            ))}
            <ShareTokenInput
              onClick={() => {}}
              amount={new BN(20)}
              onChange={() => null}
            />
          </Row>
        </Column>
        <SizedBox height={24} />
      </Column>
      {/*footer*/}
      <Row
        alignItems="center"
        justifyContent="space-between"
        style={{ borderTop: "1px solid #f1f2fe", paddingTop: 16 }}
      >
        <TextButton kind="secondary" weight={500} onClick={handleReset}>
          Reset
        </TextButton>
        <Button size="medium" onClick={handleSave}>
          Save
        </Button>
      </Row>
    </Root>
  );
};
export default observer(Settings);
