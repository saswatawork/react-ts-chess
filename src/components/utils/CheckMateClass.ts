import { ChessBoard, Player, SelectedBoardItem } from "./types";

export class CheckMateClass {
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

  isCheckMate(): boolean {
    if (
      this.checkMateByPawn() ||
      this.checkMateByBishop() ||
      this.checkMateByRook() ||
      this.checkMateByKnight() ||
      this.checkMateByQueen()
    ) {
      return true;
    }
    return false;
  }

  checkMateByPawn(): boolean {
    return false;
  }

  checkMateByBishop(): boolean {
    return false;
  }

  checkMateByRook(): boolean {
    return false;
  }

  checkMateByKnight(): boolean {
    return false;
  }

  checkMateByQueen(): boolean {
    return false;
  }
}
