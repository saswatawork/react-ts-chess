import React from "react";
import { ChessProvider } from "./ChessProvider";
import { ChessBoard } from "./ChessBoard/ChessBoard";

export const Chess = (): JSX.Element => (
  <ChessProvider>
    <ChessBoard />
  </ChessProvider>
);
