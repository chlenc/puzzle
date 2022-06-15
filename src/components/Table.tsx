import React from "react";
import { TableProps, useTable } from "react-table";
import styled from "@emotion/styled";

interface IProps extends TableProps {
  columns: any[];
  data: any[];
  fitContent?: boolean;
  onClick?: () => void;
}

const Root = styled.div<{ hovered?: boolean; fitContent?: boolean }>`
  width: ${({ fitContent }) => (fitContent ? "fit-content" : "100%")};
  //width: 100%;
  //width: fit-content;
  border-radius: 16px;
  background: #ffffff;

  table {
    width: 100%;
    border-spacing: 0;

    tr {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #8082c5;
      width: 100%;
      transition: 0.4s;

      :hover {
        ${({ hovered }) => hovered && "cursor: pointer;"};
        ${({ hovered }) => hovered && "background: #f8f8ff;"};
      }

      :last-child {
        td {
        }
      }
    }

    th {
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      text-align: left;
      padding: 14px;
      border-bottom: 1px solid #f1f2fe;
      background: #ffffff;
      cursor: default;
    }

    td {
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      color: #363870;
      padding: 16px;
      border-bottom: 1px solid #f1f2fe;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

const Table: React.FC<IProps> = ({
  columns,
  data,
  onClick,
  fitContent,
  ...rest
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <Root {...rest} hovered={onClick != null} fitContent={fitContent}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={index + "tr-header"}
            >
              {headerGroup.headers.map((column, index) => (
                <th {...column.getHeaderProps()} key={index + "th"}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                style={{
                  opacity: row.original.disabled ? 0.5 : 1,
                  cursor: row.original.disabled ? "not-allowed" : "pointer",
                }}
                {...row.getRowProps()}
                key={i + "tr"}
                onClick={() => !row.original.disabled && row.original.onClick()}
              >
                {row.cells.map((cell, index) => (
                  <td {...cell.getCellProps()} key={index + "td"}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Root>
  );
};

export default Table;
