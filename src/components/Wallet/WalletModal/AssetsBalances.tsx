import React, { HTMLAttributes } from "react";
import { observer } from "mobx-react-lite";
import { useWalletVM } from "@components/Wallet/WalletModal/WalletVM";
import InvestRow from "@components/InvestRow";
import { Column } from "@components/Flex";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import Button from "@components/Button";
import { ReactComponent as NotFoundIcon } from "@src/assets/notFound.svg";
import styled from "@emotion/styled";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 360px;
`;

const AssetsBalances: React.FC<IProps> = () => {
  const vm = useWalletVM();
  return (
    <Root>
      {vm.balances.length !== 0 ? (
        vm.balances.map((t) => {
          return (
            <InvestRow
              key={t.assetId}
              logo={t.logo}
              topLeftInfo={t.name}
              topRightInfo={t.formatBalance}
              bottomLeftInfo={t.symbol}
              bottomRightInfo={t.formatUsdnEquivalent}
            />
          );
        })
      ) : (
        <Column justifyContent="center" alignItems="center" crossAxisSize="max">
          <SizedBox height={16} />
          <NotFoundIcon />
          <Text type="secondary" size="medium" textAlign="center">
            You don’t have any assets on your wallet.
            <br />
            Buy WAVES on Waves Exchange to start trading.
          </Text>
          <SizedBox height={16} />
          <Button size="medium">Buy WAVES</Button>
          <SizedBox height={100} />
        </Column>
      )}
    </Root>
  );
};
export default observer(AssetsBalances);