import { DiagonalMoveClass } from "../Move/DiagonalMoveClass";
import { StraightMoveClass } from "../Move/StraightMoveClass";
import { ChessBoard, ChessPieces, Player, SelectedBoardItem } from "../types";

export class KingClass {
  board: ChessBoard;
  boardItem: SelectedBoardItem;
  player: Player;
  playerTurn: Player;

  constructor(
    board: ChessBoard,
    boardItem: SelectedBoardItem,
    playerTurn: Player
  ) {
    this.board = board;
    this.boardItem = boardItem;
    this.player = this.boardItem.val.player;
    this.playerTurn = playerTurn;
  }

  getMove() {
    if (this.player) {
      const straightMove = new StraightMoveClass(
        this.board,
        this.boardItem,
        this.playerTurn
      );
      straightMove.allStraightMove({ maxMove: 1, piece: ChessPieces.KING });
      const diagonalMove = new DiagonalMoveClass(
        straightMove.board,
        this.boardItem,
        this.playerTurn
      );
      diagonalMove.allDiagonalMove(1);
      this.board = diagonalMove.board;
    }
    return this.board;
  }
}
