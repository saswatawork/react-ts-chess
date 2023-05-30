import { DiagonalMoveClass } from "../Move/DiagonalMoveClass";
import { StraightMoveClass } from "../Move/StraightMoveClass";
import { ChessBoard, Player, SelectedBoardItem } from "../types";

export class QueenClass {
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
      straightMove.allStraightMove({ maxMove: null });
      const diagonalMove = new DiagonalMoveClass(
        straightMove.board,
        this.boardItem,
        this.playerTurn
      );
      diagonalMove.allDiagonalMove({ maxMove: null });
      this.board = diagonalMove.board;
    }
    return this.board;
  }
}
