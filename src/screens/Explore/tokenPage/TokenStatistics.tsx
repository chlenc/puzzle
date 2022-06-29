import styled from "@emotion/styled";
import React from "react";
import Card from "@components/Card";
import Text from "@components/Text";
import { Column, Row } from "@src/components/Flex";
import { observer } from "mobx-react-lite";
import { useExploreVM } from "@screens/Explore/ExploreVm";
interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    margin-bottom: 24px;
  }
  & > :last-of-type {
    margin-bottom: 0;
  }

  @media (min-width: 880px) {
    flex-direction: row;
    & > * {
      margin-bottom: 0;
      margin-right: 24px;
    }
    & > :last-of-type {
      margin-right: 0;
    }
  }
`;

const StyledCard = styled(Card)``;

const TokenStatistics: React.FC<IProps> = () => {
  const vm = useExploreVM();
  return (
    <Root>
      <StyledCard style={{ flex: 1 }}>
        <Text weight={500}>Price today</Text>
        <Stats
          data={[
            {
              title: `${vm.asset?.symbol} price`,
              value: `$ ${vm.tokenDetails.currentPrice?.toFormat(2)}`,
            },
            {
              title: "24h change",
              valueColor: vm.tokenDetails.change24H?.gte(0)
                ? "#35A15A"
                : "#ED827E",
              value: `${
                vm.tokenDetails.change24H?.gte(0) ? "+" : "-"
              } ${vm.tokenDetails.change24H?.toFormat(2)} %`,
            },
            {
              title: "24h Low / 24h High",
              value: `$ ${vm.low24H.toFormat(2)} / $ ${vm.high24H.toFormat(2)}`,
            },
          ]}
        />
      </StyledCard>
      <StyledCard style={{ flex: 1 }}>
        <Text weight={500}>Supply</Text>
        <Stats
          data={[
            {
              title: "Total supply",
              value: vm.tokenDetails.totalSupply?.toFormat(2),
            },
            {
              title: "Circulating supply",
              value: vm.tokenDetails.circulatingSupply?.toFormat(2),
            },
            {
              title: "Total burned",
              value: vm.tokenDetails.totalBurned?.toFormat(2),
            },
          ]}
        />
      </StyledCard>
      <StyledCard style={{ flex: 1 }}>
        <Text weight={500}>Market cap</Text>
        <Stats
          data={[
            {
              title: "Fully diluted MC",
              value: vm.tokenDetails.fullyDilutedMC?.toFormat(2),
            },
            {
              title: "Market cap",
              value: vm.tokenDetails.marketCap?.toFormat(2),
            },
          ]}
        />
      </StyledCard>
    </Root>
  );
};

const StatsRoot = styled(Column)`
  & > * {
    padding: 8px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #f1f2fe;
  }
  & > :last-of-type {
    border-bottom: none;
  }
`;

const Stats: React.FC<{
  data: Array<{
    title: string;
    value: string | number | JSX.Element | undefined;
    valueColor?: string;
  }>;
}> = ({ data }) => (
  <StatsRoot crossAxisSize="max">
    {data.map(({ title, value, valueColor }, i) => (
      <Row justifyContent="space-between" alignItems="center" key={i}>
        <Text type="secondary" size="medium">
          {title}
        </Text>
        <Text style={{ textAlign: "right", color: valueColor }} size="medium">
          {value}
        </Text>
      </Row>
    ))}
  </StatsRoot>
);

export default observer(TokenStatistics);
