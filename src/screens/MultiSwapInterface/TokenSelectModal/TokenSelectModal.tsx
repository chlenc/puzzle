import React, { createRef, useCallback, useState } from "react";
import useOnClickOutside from "@src/hooks/useOnClickOutside";
import SearchInput from "@screens/MultiSwapInterface/SearchInput";
import TokenInfo from "@screens/MultiSwapInterface/TokenSelectModal/TokenInfo";
import Dialog from "@components/Dialog";
import Scrollbar from "@src/components/Scrollbar";
import { Column } from "@src/components/Flex";
import SizedBox from "@components/SizedBox";
import { ITokenConfig } from "@src/constants";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import Text from "@components/Text";
import { IAssetBalance } from "@stores/AccountStore";
import BigNumber from "bignumber.js";

interface IProps {
  onClose: () => void;
  tokens: ITokenConfig[];
  balances: IAssetBalance[];
  onSelect: (assetId: string) => void;
}

const TokenSelectModal: React.FC<IProps> = ({
  onClose,
  tokens,
  balances,
  onSelect,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredTokens, setFilteredTokens] = useState<ITokenConfig[]>(tokens);

  const handleSearch = (event: any) => {
    setSearchValue(event.target.value);
    debounce(event.target.value);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounce = useCallback(
    _.debounce((_searchVal: string) => {
      const filter = tokens.filter(
        (v) =>
          v.symbol.toLowerCase().includes(_searchVal.toLowerCase()) ||
          v.name.toLowerCase().includes(_searchVal.toLowerCase())
      );
      setFilteredTokens(filter);
    }, 100),
    []
  );
  const ref = createRef<HTMLDivElement>();
  useOnClickOutside(ref, onClose);

  const handleTokenSelect = (assetId: string) => {
    onSelect(assetId);
    onClose();
  };

  const amounts = tokens.reduce<Record<string, BigNumber>>(
    (acc, { assetId }) => {
      const asset = balances.find((b) => b.assetId === assetId);
      acc[assetId] =
        asset?.balance != null
          ? new BigNumber(asset.balance).div(Math.pow(10, asset.decimals ?? 8))
          : new BigNumber(0);
      return acc;
    },
    {}
  );

  return (
    <Dialog
      style={{ maxWidth: 360 }}
      bodyStyle={{ minHeight: 440 }}
      onClose={onClose}
      title="Select a token"
    >
      <SearchInput
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search by name or ticker…"
      />
      <SizedBox height={16} />
      <Scrollbar style={{ marginRight: -16 }}>
        <Column
          crossAxisSize="max"
          style={{ maxHeight: 352, paddingRight: 16 }}
        >
          {filteredTokens && filteredTokens.length > 0 ? (
            filteredTokens
              .slice()
              .sort((a, b) => {
                const amountA = amounts[a.assetId];
                const amountB = amounts[b.assetId];
                return amountA.lt(amountB) ? 1 : -1;
              })
              .map((t) => (
                <TokenInfo
                  amount={amounts[t.assetId].toFormat(2)}
                  onClick={() => handleTokenSelect(t.assetId)}
                  key={t.assetId}
                  token={t}
                />
              ))
          ) : (
            <Text>No tokens found</Text>
          )}
          <SizedBox height={16} width={16} />
        </Column>
      </Scrollbar>
    </Dialog>
  );
};
export default observer(TokenSelectModal);
