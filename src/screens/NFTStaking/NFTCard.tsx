import styled from "@emotion/styled";
import React from "react";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import Button from "@components/Button";
import { Column, Row } from "@src/components/Flex";
import DetailsButton from "@components/DetailsButton";
import { ReactComponent as LinkIcon } from "@src/assets/icons/link.svg";
import { IArtwork } from "@src/services/statsService";
import BN from "@src/utils/BN";
import { TOKENS } from "@src/constants";
interface IProps {
  artwork: IArtwork;
  isInOwn?: boolean;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 8px;
  border-radius: 16px;
  //width: calc(100% - 32px);
  width: fit-content;
`;
const Img = styled.img`
  border: 1px solid #f1f2fe;
  border-radius: 12px;
  width: 100%;
  min-width: 262px;
  height: auto;
`;
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;
const Buttons = styled.div`
  display: flex;
  a {
    width: 100%;
  }
`;

const NFTCard: React.FC<IProps> = ({ artwork, isInOwn }) => {
  const signArtLink = `https://mainnet.sign-art.app/user/3PFTZA987iHHbP6UWVTbbrquNetcFSULqUP/artwork/${artwork.typeId}`;
  const explorerLink = `https://www.wavesexplorer.com/assets/${artwork.nft}`;
  //name
  //art_name_DxJAxqQhWAojdnzmcZpHAE3Hbm39JPAaCq9rEMJqNn61_3PFTZA987iHHbP6UWVTbbrquNetcFSULqUP
  //PUZZLE Early Eagle"

  //soldOut
  //art_onsale_DxJAxqQhWAojdnzmcZpHAE3Hbm39JPAaCq9rEMJqNn61_3PFTZA987iHHbP6UWVTbbrquNetcFSULqUP
  //false

  //price
  //art_price_DxJAxqQhWAojdnzmcZpHAE3Hbm39JPAaCq9rEMJqNn61_3PFTZA987iHHbP6UWVTbbrquNetcFSULqUP
  //10000000

  //currency assetId
  //art_assetAccepted_DxJAxqQhWAojdnzmcZpHAE3Hbm39JPAaCq9rEMJqNn61_3PFTZA987iHHbP6UWVTbbrquNetcFSULqUP
  //DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p

  //low quality pictire
  //art_display_cid_DxJAxqQhWAojdnzmcZpHAE3Hbm39JPAaCq9rEMJqNn61_3PFTZA987iHHbP6UWVTbbrquNetcFSULqUP
  //bafybeih3bj2c5msxiazqgdjqxosrqd3fweutquomn4zs4pcgnbjsfl5si4/display.jpeg
  //https://bafybeih3bj2c5msxiazqgdjqxosrqd3fweutquomn4zs4pcgnbjsfl5si4.ipfs.infura-ipfs.io/display.jpeg

  //high quality pictire
  //art_export_cid_DxJAxqQhWAojdnzmcZpHAE3Hbm39JPAaCq9rEMJqNn61_3PFTZA987iHHbP6UWVTbbrquNetcFSULqUP
  //bafybeicu3jbyory4s34dzgbxsjn2t3klfueijjoj3hxsjb7tgvfj57csl4/exported.jpeg
  //https://bafybeicu3jbyory4s34dzgbxsjn2t3klfueijjoj3hxsjb7tgvfj57csl4.ipfs.infura-ipfs.io/exported.jpeg

  return (
    <Root>
      <Img src={artwork.imageUrl} alt={artwork.name} />
      <Bottom>
        <Row mainAxisSize="stretch" justifyContent="space-between">
          <Column>
            <Text size="small">{artwork.name}</Text>
            <Text size="medium" weight={500}>
              <span style={{ color: "#35A15A" }}>{artwork.apy}%</span> boost APY
            </Text>
          </Column>
          <Column>
            <Text size="small" type="secondary">
              Floor price
            </Text>
            <Text size="medium">
              {(artwork as any).floorPrice != null
                ? `~ ${BN.formatUnits(
                    (artwork as any).floorPrice,
                    TOKENS.W.USDN.decimals
                  ).toFormat(2)} $`
                : ""}
            </Text>
          </Column>
        </Row>
        <SizedBox height={16} />
        <Buttons>
          <a href={signArtLink} rel="noopener noreferrer" target="_blank">
            <Button size="medium" fixed>
              Buy on SignArt
            </Button>
          </a>
          {isInOwn && (
            <DetailsButton style={{ marginLeft: 8 }}>
              <a href={signArtLink} rel="noreferrer noopener" target="_blank">
                <Row alignItems="center">
                  <LinkIcon />
                  <SizedBox width={8} />
                  <Text>View on SignArt</Text>
                </Row>
              </a>
              <SizedBox height={20} />
              <a href={explorerLink} rel="noreferrer noopener" target="_blank">
                <Row alignItems="center">
                  <LinkIcon />
                  <SizedBox width={8} />
                  <Text>View on Waves Explorer</Text>
                </Row>
              </a>
            </DetailsButton>
          )}
        </Buttons>
      </Bottom>
    </Root>
  );
};
export default NFTCard;
