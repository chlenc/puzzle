import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import Card from "@components/Card";
import SizedBox from "@components/SizedBox";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
`;

const TradesVolume: React.FC<IProps> = () => {
  return (
    <Root>
      <Text weight={500} type="secondary">
        Trades volume
      </Text>
      <SizedBox height={8} />
      <Card style={{ height: 300 }} />
    </Root>
  );
};
export default TradesVolume;
