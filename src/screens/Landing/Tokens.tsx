import styled from "@emotion/styled";
import React from "react";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Tokens: React.FC<IProps> = () => {
  return <Root></Root>;
};
export default Tokens;
