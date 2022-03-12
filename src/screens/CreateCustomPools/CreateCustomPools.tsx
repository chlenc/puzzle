import styled from "@emotion/styled";
import React from "react";
import { Observer } from "mobx-react-lite";
import Layout from "@components/Layout";
import { CreateCustomPoolsVMProvider } from "@screens/CreateCustomPools/CreateCustomPoolsVm";
import GoBack from "@components/GoBack";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import PoolSettingsCard from "@screens/CreateCustomPools/PoolSettingsCard";
import SummaryCard from "@screens/CreateCustomPools/SummaryCard";
import CreatePoolsStepper from "@screens/CreateCustomPools/CreatePoolsStepper";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  min-height: 100%;
  max-width: calc(1160px + 32px);
  margin-bottom: 24px;
  margin-top: 56px;
  text-align: left;

  @media (min-width: 880px) {
    margin-top: 56px;
  }
`;
const Grid = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CreateCustomPoolsImpl: React.FC = () => {
  // const vm = useCreateCustomPoolsVM();
  return (
    <Layout>
      <Observer>
        {() => (
          <Root>
            <GoBack link="/invest" text="Back to Invest" />
            <SizedBox height={24} />
            <Text weight={500} size="large">
              Create pool
            </Text>
            <SizedBox height={24} />
            <Grid>
              <CreatePoolsStepper />
              <PoolSettingsCard />
              <SummaryCard />
            </Grid>
          </Root>
        )}
      </Observer>
    </Layout>
  );
};

const CreateCustomPools: React.FC = () => (
  <CreateCustomPoolsVMProvider>
    <CreateCustomPoolsImpl />
  </CreateCustomPoolsVMProvider>
);
export default CreateCustomPools;