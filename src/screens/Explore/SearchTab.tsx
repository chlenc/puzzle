import styled from "@emotion/styled";
import React, { useState } from "react";
import Input from "@components/Input";
import Select from "@components/Select";
import SizedBox from "@components/SizedBox";
import { Row } from "@components/Flex";
import { useExploreVM } from "@screens/Explore/ExploreVm";
import { observer } from "mobx-react-lite";

const Root = styled.div`
  background: #ffffff;
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  border: 1px solid #f1f2fe;
  border-radius: 16px;
  box-sizing: border-box;
  @media (min-width: 880px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
const Filters = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  @media (min-width: 880px) {
    padding: 24px;
  }
`;
const Selects = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 0 16px 16px;
  align-items: center;
  box-sizing: border-box;
  @media (min-width: 880px) {
    padding: 16px;
    flex-wrap: nowrap;
    width: 100%;
  }
`;
const StyledRow = styled(Row)`
  //flex-wrap: wrap;

  //& > :first-of-type {
  //  margin-bottom: 8px;
  //}
  //
  //@media (min-width: 380px) {
  //  & > :first-of-type {
  //    margin-bottom: 0;
  //  }
  //}
  //@media (min-width: 1080px) {
  //  flex-wrap: nowrap;
  //}
`;
const categoriesOptions = [
  { title: "All categories", key: "all" },
  {
    title: "Global coins",
    key: "global",
  },
  { title: "Stablecoins", key: "stable" },
  { title: "Waves DeFi", key: "defi" },
  { title: "Waves Ducks", key: "duck" },
];
const createdByOptions = [
  { title: "All tokens", key: "all" },
  { title: "Watchlist", key: "watchlist" },
  { title: "I have on balance", key: "positiveBalance" },
];
const InputWrapper = styled.div`
  display: flex;
  @media (min-width: 880px) {
    min-width: 340px;
  }
`;
const SearchTab: React.FC = () => {
  const vm = useExploreVM();
  return (
    <Root>
      <Selects>
        <StyledRow mainAxisSize="fit-content">
          <Select
            options={categoriesOptions}
            selected={categoriesOptions[vm.tokenCategoryFilter]}
            onSelect={({ key }) => {
              const index = categoriesOptions.findIndex((o) => o.key === key);
              vm.setTokenCategoryFilter(index);
            }}
          />
          <SizedBox width={12} />
          <Select
            options={createdByOptions}
            selected={createdByOptions[vm.tokenUserFilter]}
            onSelect={({ key }) => {
              const index = createdByOptions.findIndex((o) => o.key === key);
              vm.setUserFilter(index);
            }}
          />
          <SizedBox width={12} />
        </StyledRow>
      </Selects>
      <Filters>
        <InputWrapper>
          <Input
            style={{ height: 40 }}
            icon="search"
            placeholder="Search by title or asset…"
            value={vm.tokenNameFilter}
            onChange={(e) => vm.setTokenNameFilter(e.target.value)}
          />
        </InputWrapper>
      </Filters>
    </Root>
  );
};
export default observer(SearchTab);
