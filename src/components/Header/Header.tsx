import styled from "@emotion/styled";
import React, { useState } from "react";
import puzzleLogo from "@src/assets/logo.svg";
import mobileMenuIcon from "@src/assets/icons/mobileMenu.svg";
import closeIcon from "@src/assets/icons/close.svg";
import Banner from "./Banner";
import { Column, Row } from "@components/Flex";
import MobileMenu from "@components/Header/MobileMenu";
import SizedBox from "@components/SizedBox";
import Wallet from "@components/Wallet/Wallet";
import { observer } from "mobx-react-lite";
import { ROUTES } from "@src/constants";
import { useLocation } from "react-router-dom";
import { Anchor } from "@components/Anchor";

interface IProps {}

const Root = styled(Column)`
  width: 100%;
  background: #fff;
  align-items: center;
  z-index: 102;
  box-shadow: 0 8px 56px rgba(54, 56, 112, 0.16);

  //todo check
  a {
    text-decoration: none;
  }
`;

const TopMenu = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  padding: 0 16px;
  max-width: 1440px;
  z-index: 102;
  @media (min-width: 880px) {
    height: 80px;
  }
  box-sizing: border-box;
  background: #ffffff;

  .logo {
    height: 30px;
    @media (min-width: 880px) {
      height: 36px;
    }
  }

  .icon {
    cursor: pointer;
  }
`;

const MenuItem = styled(Anchor)<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${({ selected }) => (selected ? "#363870" : "#8082c5")};
  box-sizing: border-box;
  border-bottom: 4px solid
    ${({ selected }) => (selected ? "#7075e9" : "transparent")};
  height: 100%;
  margin: 0 12px;

  &:hover {
    border-bottom: 4px solid #c6c9f4;
    color: #7075e9;
  }
`;

const Mobile = styled.div`
  display: flex;
  min-width: fit-content;
  @media (min-width: 880px) {
    display: none;
  }
`;

const Desktop = styled.div`
  display: none;
  min-width: fit-content;
  @media (min-width: 880px) {
    height: 100%;
    display: flex;
  }
`;

const isRoutesEquals = (a: string, b: string) =>
  a.replaceAll("/", "") === b.replaceAll("/", "");

const Header: React.FC<IProps> = () => {
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
  const [bannerClosed, setBannerClosed] = useState(false);
  const location = useLocation();
  const toggleMenu = (state: boolean) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.classList.toggle("noscroll", state);
    setMobileMenuOpened(state);
  };

  const menuItems = [
    { name: "Explore", link: ROUTES.EXPLORE },
    { name: "Trade", link: ROUTES.TRADE },
    { name: "Invest", link: ROUTES.INVEST },
    { name: "Stake", link: ROUTES.STAKE },
    { name: "NFT", link: "https://puzzlemarket.org/" },
  ];
  return (
    <Root>
      <Mobile>
        <MobileMenu
          opened={mobileMenuOpened}
          onClose={() => toggleMenu(false)}
          {...{ bannerClosed }}
        />
      </Mobile>
      <Banner closed={bannerClosed} setClosed={setBannerClosed} />

      <TopMenu>
        <Row alignItems="center" crossAxisSize="max">
          <a href="https://puzzleswap.org">
            <img className="logo" src={puzzleLogo} alt="logo" />
          </a>
          <Desktop>
            <SizedBox width={54} />
            {menuItems.map(({ name, link }) => (
              <MenuItem
                key={name}
                selected={isRoutesEquals(link, location.pathname)}
                href={link}
                target={link !== "https://puzzlemarket.org/" ? "_self" : ""}
              >
                {name}
              </MenuItem>
            ))}
          </Desktop>
        </Row>
        <Mobile>
          <img
            onClick={() => toggleMenu(!mobileMenuOpened)}
            className="icon"
            src={mobileMenuOpened ? closeIcon : mobileMenuIcon}
            alt="menuControl"
          />
        </Mobile>
        <Desktop>
          <Wallet />
        </Desktop>
      </TopMenu>
    </Root>
  );
};
export default observer(Header);
