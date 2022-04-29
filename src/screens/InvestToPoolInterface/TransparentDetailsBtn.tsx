import styled from "@emotion/styled";
import React, { useState } from "react";
import Tooltip from "@components/Tooltip";
import MorePoolInformation from "@screens/InvestToPoolInterface/MorePoolInformation";
import { ReactComponent as MoreIcon } from "@src/assets/icons/dots.svg";
import Dialog from "@components/Dialog";
import { Column, Row } from "@components/Flex";
import Text from "@components/Text";
import Divider from "@components/Divider";
import Button from "@components/Button";
import SizedBox from "@components/SizedBox";
import { useStores } from "@stores";
import { useInvestToPoolInterfaceVM } from "@screens/InvestToPoolInterface/InvestToPoolInterfaceVM";
import TextButton from "@components/TextButton";
import linkIcon from "@src/assets/icons/link.svg";
import copy from "copy-to-clipboard";
import { ReactComponent as CopyIcon } from "@src/assets/icons/darkCopy.svg";
import { ReactComponent as TwitterIcon } from "@src/assets/icons/twitter.svg";
import { ReactComponent as TelegramIcon } from "@src/assets/icons/telegram.svg";
import { ReactComponent as FacebookIcon } from "@src/assets/icons/facebook.svg";
interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
  border: 1px solid #8082c5;
  padding: 7px;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;

  :hover {
    background: #8082c5;
  }
`;

const StyledMoreIcon = styled(MoreIcon)`
  path {
    stroke: #ffffff;
  }
`;

const TransparentDetailsBtn: React.FC<IProps> = () => {
  const { accountStore, notificationStore } = useStores();
  const { EXPLORER_LINK } = accountStore;
  const vm = useInvestToPoolInterfaceVM();
  const [isOpenedDetails, setOpenedDetails] = useState(false);
  const [isOpenedShare, setOpenedShare] = useState(false);

  const puzzlePoolInformation = [
    {
      title: "Pool creator",
      value: (
        <Text size="medium" fitContent nowrap>
          Puzzle Swap
        </Text>
      ),
    },
    {
      title: "Smart-contract",
      value: (
        <TextButton
          size="medium"
          prefix={linkIcon}
          kind="secondary"
          //todo
          onClick={() => window.open(`${EXPLORER_LINK}/123`)}
        >
          View on Explorer
        </TextButton>
      ),
    },
    { title: "Date of creation", value: "1 Jan 2022, 20:12:12" },
    { title: "Total fees earned", value: "$ 123,456.99" },
    { title: "Total creator reward", value: "$ 12,456.99" },
  ];
  const customPoolInformation = [
    { title: "Pool creator", value: "" },
    { title: "Created via", value: "" },
    { title: "Smart-contract", value: "" },
    { title: "Date of creation", value: "1 Jan 2022, 20:12:12" },
    { title: "Total fees earned", value: "$ 123,456.99" },
    { title: "Total creator reward", value: "$ 12,456.99" },
  ];
  const information = Array.from(
    vm.pool.isCustom ? customPoolInformation : puzzlePoolInformation
  );
  const link = `https://puzzleswap.org/${vm.pool.id}/invest`;
  const text = `Invest to ${vm.pool.name} Puzzle Swap megapool`;
  const shareInfo = [
    {
      title: "Twitter",
      onClick: () =>
        window.open(
          `https://twitter.com/intent/tweet?url=${link}&text=${text}`
        ),
      icon: <TwitterIcon />,
    },
    {
      title: "Telegram",
      onClick: () =>
        window.open(`https://telegram.me/share/?url=${link}&text=${text}`),
      icon: <TelegramIcon />,
    },
    {
      title: "Facebook",
      onClick: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${link}&quote=${text}`
        ),
      icon: <FacebookIcon />,
    },
    {
      title: "Copy link",
      onClick: () => {
        copy(window.location.href);
        notificationStore.notify("Link was copied");
        setOpenedShare(false);
      },
      icon: <CopyIcon />,
    },
  ];
  return (
    <>
      <Tooltip
        config={{ placement: "bottom-end", trigger: "click" }}
        content={
          <MorePoolInformation {...{ setOpenedDetails, setOpenedShare }} />
        }
      >
        <Root>
          <StyledMoreIcon />
        </Root>
      </Tooltip>
      <Dialog
        style={{ maxWidth: 400 }}
        bodyStyle={{ minHeight: 232 }}
        title={isOpenedDetails ? "Pool information" : "Share"}
        onClose={() => {
          setOpenedDetails(false);
          setOpenedShare(false);
        }}
        visible={isOpenedDetails || isOpenedShare}
      >
        <Column
          crossAxisSize="max"
          style={{ maxHeight: 352, padding: "10px 0" }}
        >
          {isOpenedDetails &&
            information.map(({ title, value }, index) => (
              <React.Fragment key={index + "poolInformation"}>
                <Row justifyContent="space-between">
                  <Text size="medium" type="secondary">
                    {title}
                  </Text>
                  {typeof value === "string" ? (
                    <Text size="medium" fitContent nowrap>
                      {value}
                    </Text>
                  ) : (
                    value
                  )}
                </Row>
                {information.length - 1 !== index && (
                  <Divider style={{ margin: "9px 0 10px" }} />
                )}
              </React.Fragment>
            ))}
          {isOpenedShare &&
            shareInfo.map(({ title, onClick, icon }, index) => (
              <Button
                fixed
                size="medium"
                kind="secondary"
                onClick={onClick}
                key={index + "share-link"}
                style={{ marginBottom: 8 }}
              >
                {title}
                <SizedBox width={8} />
                {icon}
              </Button>
            ))}
        </Column>
      </Dialog>
    </>
  );
};
export default TransparentDetailsBtn;
