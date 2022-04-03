import styled from "@emotion/styled";
import React, { HTMLAttributes, useState } from "react";
import Tooltip from "./Tooltip";
import arrowIcon from "@src/assets/icons/arrowRightBorderless.svg";
import check from "@src/assets/icons/checkMark.svg";
import SizedBox from "@components/SizedBox";
import { Column } from "./Flex";

interface IOption {
  key: string;
  title: string;
}

interface IProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  options: IOption[];
  selected?: IOption;
  onSelect: (key: IOption) => void;
}

const Root = styled.div<{ focused?: boolean }>`
  display: flex;
  padding: 8px 8px 8px 12px;
  border-radius: 10px;
  background: ${({ focused }) => (focused ? "#ffffff" : "#F1F2FE")};
  border: 1px solid ${({ focused }) => (focused ? "#7075e9" : "#f1f2fe")};
  outline: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #363870;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  .menu-arrow {
    transition: 0.4s;
    transform: ${({ focused }) =>
      focused ? "rotate(-90deg)" : "rotate(90deg)"};
  }
`;
const Option = styled.div<{ active?: boolean }>`
  display: flex;
  cursor: pointer;
  position: relative;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${({ active }) => (active ? "#3638708F" : "#363870")};
  padding: 10px 12px;
  background: #ffffff;
  min-width: 136px;

  :hover {
    color: #3638708f;
  }

  ::after {
    transition: 0.4s;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: -8px;
    ${({ active }) => active && `content: url(${check})`};
  }
`;

const Select: React.FC<IProps> = ({ options, selected, onSelect }) => {
  const [focused, setFocused] = useState(false);
  return (
    <Tooltip
      config={{
        placement: "bottom-start",
        trigger: "click",
        onVisibleChange: setFocused,
      }}
      content={
        <Column>
          {options.map((v) => {
            const active = selected?.key === v.key;
            return (
              <Option
                active={active}
                key={v.key + "_option"}
                onClick={() => onSelect(v)}
              >
                {v.title}
              </Option>
            );
          })}
        </Column>
      }
    >
      <Root
        focused={focused}
        onClick={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {selected?.title ?? options[0].title}
        <SizedBox width={10} />
        <img src={arrowIcon} className="menu-arrow" alt="arrow" />
      </Root>
    </Tooltip>
  );
};
export default Select;
