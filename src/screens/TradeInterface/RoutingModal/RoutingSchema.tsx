import styled from "@emotion/styled";
import React from "react";
import { useTradeVM } from "@screens/TradeInterface/TradeVM";
import Route from "@screens/TradeInterface/RoutingModal/Route";
import { ReactComponent as Arrow } from "@src/assets/icons/blackRightArrow.svg";
import SquareTokenIcon from "@components/SquareTokenIcon";
import SizedBox from "@components/SizedBox";

interface IProps {}

const Root = styled.div`
  display: flex;
  align-items: center;
  overflow: scroll;
`;
const RoutesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const RoutingSchema: React.FC<IProps> = () => {
  const vm = useTradeVM();
  const values = vm.schemaValues;
  return (
    <Root>
      <RoutesContainer>
        {values?.map((i, index) => (
          <Route
            {...i}
            key={index}
            token0Logo={vm.token0.logo}
            singleRoute={values?.length === 1}
          />
        ))}
      </RoutesContainer>
      {values?.length !== 1 && <SizedBox width={12} />}
      <Arrow />
      <SizedBox width={12} />
      <div style={{ position: "relative" }}>
        {values?.length !== 1 && (
          <Arrow
            height="100%"
            style={{ position: "absolute", left: "-32px" }}
          />
        )}
        <SquareTokenIcon src={vm.token1.logo} />
      </div>
    </Root>
  );
};
export default RoutingSchema;
