import styled from "@emotion/styled";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import puzzleLogo from "@src/old_components/img/puzzle-logo.svg";
import mobileMenuIcon from "@src/assets/icons/mobileMenu.svg";
import closeIcon from "@src/assets/icons/close.svg";
import Banner from "./Banner";
import { Column, Row } from "@components/Flex";
import MobileMenu from "@components/Header/MobileMenu";
import { WalletModule } from "@src/old_components/WalletModule";
import SizedBox from "@components/SizedBox";

interface IProps {}

const Root = styled(Column)`
  width: 100%;
  background: #fff;
  align-items: center;
  box-shadow: 0px 8px 56px rgba(54, 56, 112, 0.16);
`;

const TopMenu = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  padding: 0 16px;
  max-width: 1440px;
  z-index: 101;
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

const MenuItem = styled(Link)<{ selected?: boolean }>`
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

const menuItems = [
  { name: "Farms 1", link: "/farms" },
  { name: "Farms 2", link: "/farms2" },
  { name: "DeFi", link: "/defi" },
  { name: "Race", link: "/race" },
  { name: "Puzzle", link: "/puzzle" },
];

const Header: React.FC<IProps> = () => {
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
  const [bannerClosed, setBannerClosed] = useState(false);
  const location = useLocation();
  const toggleMenu = () => {
    document.body.classList.toggle("noscroll");
    setMobileMenuOpened((prev) => !prev);
  };
  return (
    <Root>
      {mobileMenuOpened && (
        <Mobile>
          <MobileMenu {...{ bannerClosed }} />
        </Mobile>
      )}
      <Banner closed={bannerClosed} setClosed={setBannerClosed} />

      <TopMenu>
        <Row alignItems="center" crossAxisSize="max">
          <Link to="/">
            <img className="logo" src={puzzleLogo} alt="logo" />
          </Link>
          <Desktop>
            <SizedBox width={54} />
            {menuItems.map(({ name, link }, key) => (
              <MenuItem
                selected={link === location.pathname}
                to={link}
                key={key}
              >
                {name}
              </MenuItem>
            ))}
          </Desktop>
        </Row>
        <Mobile>
          <img
            onClick={toggleMenu}
            className="icon"
            src={mobileMenuOpened ? closeIcon : mobileMenuIcon}
            alt="menuControl"
          />
        </Mobile>
        <Desktop>
          <WalletModule />
        </Desktop>
      </TopMenu>
    </Root>
  );
};
export default Header;