import styled from "@emotion/styled";
import React, { useState } from "react";
import SizedBox from "@components/SizedBox";
import TokenInput from "@screens/MultiSwapInterface/TokenInput";
import { ReactComponent as SwapIcon } from "@src/assets/icons/swap.svg";
import { ReactComponent as ArrowIcon } from "@src/assets/icons/arrowRightBorderless.svg";
import { ReactComponent as InfoIcon } from "@src/assets/icons/info.svg";
import { ReactComponent as ShowMoreIcon } from "@src/assets/icons/showMore.svg";
import { Row } from "@components/Flex";
import Button from "@components/Button";
import SwapDetailRow from "@components/SwapDetailRow";
import Divider from "@src/components/Divider";
import Text from "@components/Text";
import CashbackLabel from "@components/CashbackLabel";
import Card from "@components/Card";
import Details from "@screens/MultiSwapInterface/Details";
import BigNumber from "bignumber.js";
import Tooltip from "@components/Tooltip";

interface IProps {
  poolName: string;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 16px;
  min-width: 100%;
  min-height: 100%;
`;

const RateText = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: #363870;
`;

const MultiSwapInterface: React.FC<IProps> = () => {
  const [token1, setToken1] = useState<BigNumber>(new BigNumber(0));
  return (
    <Root>
      <Card>
        <TokenInput
          value={token1}
          dollarValue={token1}
          onChange={(e) => setToken1(e.target.value)}
          // onMaxClick={() =>account.balance && (e) => setToken1(account.balance)}
        />
        <SizedBox height={16} />
        <Row alignItems="center" style={{ cursor: "pointer" }}>
          <SwapIcon />
          <SizedBox width={16} />
          <RateText>1 WAVES = 0.76 PUZZLE</RateText>
          <SizedBox width={16} />
        </Row>
        <SizedBox height={16} />
        <TokenInput
          value={token1}
          dollarValue={token1}
          onChange={(e) => setToken1(e.target.value)}
        />
        <SizedBox height={24} />
        <Button disabled>Insufficient WAVES balance</Button>
        <SizedBox height={16} />
        <SwapDetailRow title="Route">
          <Row
            alignItems="center"
            mainAxisSize="fit-content"
            justifyContent="flex-end"
          >
            <Text>WAVES</Text>&nbsp;
            <ArrowIcon />
            &nbsp;
            <Text>USDN</Text>&nbsp;
            <ArrowIcon />
            &nbsp;
            <Text>PUZZLE</Text>&nbsp;
            <ShowMoreIcon />
          </Row>
        </SwapDetailRow>
        <Divider />
        <SwapDetailRow title="Minimum to receive">
          <Row
            alignItems="center"
            mainAxisSize="fit-content"
            justifyContent="flex-end"
          >
            75.32 PUZZLE&nbsp;
            <Tooltip content="Объемный текст в котором подробно рассказано о происходящем на экране">
              <InfoIcon />
            </Tooltip>
          </Row>
        </SwapDetailRow>
        <Divider />
        <SwapDetailRow style={{ marginBottom: 0 }} title="Cashback">
          <CashbackLabel>0.26</CashbackLabel>
        </SwapDetailRow>
      </Card>
      <SizedBox height={16} />
      <Details />
    </Root>
  );
};
export default MultiSwapInterface;