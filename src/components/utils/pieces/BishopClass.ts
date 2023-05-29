import { DiagonalMoveClass } from "../Move/DiagonalMoveClass";
import { ChessBoard, Player, SelectedBoardItem } from "../types";

export class BishopClass {
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
      const diagonalMove = new DiagonalMoveClass(
        this.board,
        this.boardItem,
        this.playerTurn
      );
      diagonalMove.allDiagonalMove(null);
      this.board = diagonalMove.board;
    }
    return this.board;
  }
}
