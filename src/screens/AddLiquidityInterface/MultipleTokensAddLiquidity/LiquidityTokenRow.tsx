import React from "react";
import { Column, Row } from "@components/Flex";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import { observer } from "mobx-react-lite";
import BN from "@src/utils/BN";
import SquareTokenIcon from "@components/SquareTokenIcon";
import styled from "@emotion/styled";

interface IProps {
  availableAmount: BN;
  depositAmount: BN;
  percent: number;
  symbol: string;
  logo: string;
}

const Root = styled.div<{ warning: boolean }>`
  .text {
    color: ${({ warning }) => warning && "#ed827e"};
  }
`;
const LiquidityTokenRow: React.FC<IProps> = ({
  availableAmount,
  depositAmount,
  percent,
  symbol,
  logo,
}) => {
  const available = availableAmount.toFormat(4);
  const deposit = depositAmount.toFormat(4);
  return (
    <Root className="gridRow" warning={availableAmount.eq(0)}>
      <Row alignItems="center" mainAxisSize="fit-content">
        <SquareTokenIcon
          src={logo}
          alt="logo"
          style={{ width: 40, height: 40 }}
        />
        <SizedBox width={8} />
        <Column>
          <Text fitContent size="medium" className="text">
            {symbol}
          </Text>
          <Text fitContent type="secondary" size="small" className="text">
            <span>Share: </span>
            <span
              style={{
                color: availableAmount.eq(0) ? "#ed827e" : "#363870",
                paddingLeft: 1,
              }}
            >
              {percent} %
            </span>
          </Text>
        </Column>
      </Row>
      <Column style={{ width: "100%", textAlign: "end" }}>
        <Text nowrap className="text">
          {deposit}
        </Text>
        <Text type="secondary" size="small" className="text">
          Available: {available}
        </Text>
      </Column>
    </Root>
  );
};
export default observer(LiquidityTokenRow);
