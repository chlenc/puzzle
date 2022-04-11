import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import Card from "@components/Card";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Input from "@components/Input";
import { useCreateCustomPoolsVM } from "@screens/CreateCustomPools/CreateCustomPoolsVm";
import { observer } from "mobx-react-lite";
import { Row } from "@src/components/Flex";
import ShareTokenInput from "@screens/CreateCustomPools/PoolSettingsCard/SelectAssets/ShareTokenInput";
import Notification from "@src/components/Notification";
import ImageUpload from "@components/ImageUpload";
import BN from "@src/utils/BN";
import poolService from "@src/services/poolsService";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Tag = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  color: ${({ active }) => (active ? "#ffffff" : "")};
  background: ${({ active }) => (active ? "#7075E9" : "#fffff")};
  border: 1px solid ${({ active }) => (active ? "#7075E9" : "#f1f2fe")};
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
  white-space: nowrap;
`;
const TitleAndDomainPoolSetting: React.FC<IProps> = () => {
  const vm = useCreateCustomPoolsVM();
  const swapFeeError = vm.swapFee.gt(30) || vm.swapFee.lt(5);
  const [customPercent, setCustomPercent] = useState<BN>(
    vm.swapFee ?? new BN(10)
  );
  console.log(customPercent.toString());
  const handleChangeCustomPercent = (v: BN) => {
    setCustomPercent(v);
    vm.setSwapFee(v);
  };
  const [validationProcessing, setValidationProcessing] = useState(false);
  const [domainError, setDomainError] = useState<string | null>(null);

  const checkDomain = useCallback(
    (domain: string) => {
      if (domain === "") return;
      setValidationProcessing(true);
      vm.setPoolSettingError(false);
      if (
        /[^a-z0-9_-]/.test(domain) ||
        domain.length > 13 ||
        domain.length < 2
      ) {
        setDomainError("2–13 lowercase latin and number characters");
        setValidationProcessing(false);
        return;
      }
      poolService
        .checkDomain(domain)
        .then(() => setDomainError(null))
        .catch(() => {
          vm.setPoolSettingError(true);
          setDomainError("This domain is already taken");
        })
        .finally(() => setValidationProcessing(false));
    },
    [vm]
  );

  useEffect(() => {
    checkDomain(vm.domain);
  }, [vm.domain, checkDomain]);
  return (
    <Root>
      <Text type="secondary" weight={500}>
        Pool Settings
      </Text>
      <SizedBox height={8} />
      <Card>
        <ImageUpload
          onChange={(v) => vm.setLogo(v)}
          image={vm.logo}
          fileName={vm.fileName}
          onFileNameChange={vm.setFileName}
          fileSize={vm.fileSize}
          onFileSizeChange={vm.setFileSize}
        />
        <SizedBox height={16} />
        <Text type="secondary" size="medium">
          Title of the pool
        </Text>
        <SizedBox height={4} />
        <Input
          value={vm.title}
          onChange={(e) => vm.setTitle(e.target.value)}
          placeholder="Enter the title…"
        />
        <SizedBox height={16} />
        <Text type="secondary" size="medium">
          Domain of the pool
        </Text>
        <SizedBox height={4} />
        <Input
          prefix={<Text fitContent>puzzleswap.org/pools/</Text>}
          value={vm.domain}
          onBlur={(e) => checkDomain(e.target.value)}
          onFocus={() => setDomainError(null)}
          onChange={(e) => vm.setDomain(e.target.value)}
          placeholder="…"
          description="2–13 lowercase latin and number characters"
          errorText={domainError ?? ""}
          disabled={validationProcessing}
          error={domainError != null}
        />
        <SizedBox height={16} />
        <Text type="secondary" size="medium">
          Swap fees
        </Text>
        <SizedBox height={8} />
        <Row>
          {Array.from({ length: 3 }).map((_, index) => (
            <Tag
              key={index + "percent"}
              onClick={() => {
                setCustomPercent(new BN(5));
                vm.setSwapFee(new BN((index + 1) * 10));
              }}
              active={vm.swapFee.eq(new BN((index + 1) * 10))}
              style={{ marginRight: 4 }}
            >
              {index + 1} %
            </Tag>
          ))}
          <ShareTokenInput
            amount={customPercent}
            error={swapFeeError}
            onChange={handleChangeCustomPercent}
          />
        </Row>
        {swapFeeError && (
          <Notification
            style={{ marginTop: 16 }}
            type="error"
            text="Swap fees for the pool must be from 0.5% to 3%"
          />
        )}
      </Card>
    </Root>
  );
};
export default observer(TitleAndDomainPoolSetting);
