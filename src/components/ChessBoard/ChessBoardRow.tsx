import React from "react";
import { ChildrenProps } from "../utils/types";
import "./chessBoardRow.css";

interface ChessBoardRowProps extends ChildrenProps {
  row: number;
}

export const ChessBoardRow = ({
  children,
  row,
}: ChessBoardRowProps): JSX.Element => (
  <div className="chess-board__row-wrapper" key={`row-${row}`}>
    {row}
    <div className="chess-board__row">{children}</div>
  </div>
);
