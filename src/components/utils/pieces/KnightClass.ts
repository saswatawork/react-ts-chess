import { KnightMoveClass } from "../Move/KnightMoveClass";
import { ChessBoard, Player, SelectedBoardItem } from "../types";

export class KnightClass {
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
      const knightMove = new KnightMoveClass(
        this.board,
        this.boardItem,
        this.playerTurn
      );
      knightMove.getAllMove();
      this.board = knightMove.board;
    }
    return this.board;
  }
}
