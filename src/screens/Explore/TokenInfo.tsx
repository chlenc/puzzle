import { Row } from "@src/components/Flex";
import Text from "@src/components/Text";
import React from "react";
import SizedBox from "@components/SizedBox";
import RoundTokenIcon from "@components/RoundTokenIcon";
import tokenLogos from "@src/constants/tokenLogos";
import { TOKENS_BY_ASSET_ID } from "@src/constants";
import BN from "@src/utils/BN";

interface IProps {
  num: number;
  assetId: string;
  change: BN;
}

const TokenInfo: React.FC<IProps> = ({ num, assetId, change }) => {
  return (
    <Row justifyContent="space-between">
      <Row mainAxisSize="fit-content">
        <Text type="purple300">{num}</Text>
        <SizedBox width={8} />
        <RoundTokenIcon src={tokenLogos[TOKENS_BY_ASSET_ID[assetId].symbol]} />
        <SizedBox width={8} />
        <Text nowrap weight={500}>
          {TOKENS_BY_ASSET_ID[assetId].name}
        </Text>
        <SizedBox width={8} />
        <Text nowrap type="purple300">
          {TOKENS_BY_ASSET_ID[assetId].symbol}
        </Text>
      </Row>
      <Text type={change.gt(0) ? "success" : "error"} weight={500} fitContent>
        {change.toFormat(2)}%
      </Text>
    </Row>
  );
};
export default TokenInfo;