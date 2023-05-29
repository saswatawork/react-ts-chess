import React from "react";
import cs from "classnames";
import { BoardItem, ChessPieces, Player } from "../utils/types";
import { useChess } from "../ChessProvider";
import "./chessBoardItem.css";

export const ChessBoardItem = ({ row, col, val }: BoardItem): JSX.Element => {
  const {
    chessState: { playerTurn, activePiece },
    getChessPieceMove,
    moveChessPiece,
  } = useChess();

  const onSelect = () => {
    console.log({ playerTurn });
    if (playerTurn === val.player) {
      getChessPieceMove(
        {
          row,
          col,
          val: {
            ...val,
            player: val.player as Player,
            piece: val.piece as ChessPieces,
          },
        },
        playerTurn
      );
    } else if (activePiece && val.valid)
      moveChessPiece({ row, col }, playerTurn);
  };

  return (
    <button
      className={cs("chess-board__item", { valid: val.valid })}
      style={{
        backgroundImage: `url("${process.env.PUBLIC_URL}/assets/chess/${val.player}-${val.piece}.svg")`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      data-chess={`${val.player}-${val.piece}-${row}-${col}`}
      onClick={onSelect}
      key={`board-item-${row}-${col}`}
    >
      {val.valid && <div className="valid"></div>}
      {/* {`${row}-${col}`} */}
    </button>
  );
};
