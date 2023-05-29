import React from "react";
import { useChess } from "../ChessProvider";
import { ChessBoardRow } from "./ChessBoardRow";
import { ChessBoardItem } from "./ChessBoardItem";
import "./chessboard.css";

export const ChessBoard = (): JSX.Element => {
  const {
    chessState: { chessBoard, playerTurn },
  } = useChess();

  return (
    <div className="chess-board">
      <h5>{playerTurn} turn</h5>
      {chessBoard.map((boardRow, row) => (
        <ChessBoardRow row={row} key={row}>
          {boardRow.map((boardItem, col) => (
            <ChessBoardItem
              row={row}
              col={col}
              val={boardItem}
              key={`${row}-${col}`}
            />
          ))}
        </ChessBoardRow>
      ))}
    </div>
  );
};
