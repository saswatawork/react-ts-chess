import { ChessBoard, Col, Player, Row, SelectedBoardItem } from "../types";

export class KnightMoveClass {
  board: ChessBoard;
  row: Row;
  col: Col;
  playerTurn: Player;

  constructor(
    board: ChessBoard,
    boardItem: SelectedBoardItem,
    playerTurn: Player
  ) {
    this.board = board;
    this.playerTurn = playerTurn;
    this.row = boardItem.row;
    this.col = boardItem.col;
  }

  getAllMove() {
    this.horizontalRightUp();
    this.horizontalRightDown();
    this.horizontalLeftUp();
    this.horizontalLeftDown();
    this.verticalUpRight();
    this.verticalUpLeft();
    this.verticalDownRight();
    this.verticalDownLeft();
  }

  createMove(row: Row, col: Col) {
    const updatedBoard = [...this.board];
    if (
      updatedBoard[row] &&
      updatedBoard[row][col] &&
      (!updatedBoard[row][col].player ||
        (updatedBoard[row][col].player &&
          updatedBoard[row][col].player !== this.playerTurn))
    ) {
      updatedBoard[row][col].valid = true;
    }

    return updatedBoard;
  }

  horizontalRightUp() {
    this.board = this.createMove(this.row - 1, this.col + 2);
  }

  horizontalRightDown() {
    this.board = this.createMove(this.row + 1, this.col + 2);
  }

  horizontalLeftUp() {
    this.board = this.createMove(this.row - 1, this.col - 2);
  }

  horizontalLeftDown() {
    this.board = this.createMove(this.row + 1, this.col - 2);
  }

  verticalUpRight() {
    this.board = this.createMove(this.row - 2, this.col + 1);
  }

  verticalUpLeft() {
    this.board = this.createMove(this.row - 2, this.col - 1);
  }

  verticalDownRight() {
    this.board = this.createMove(this.row + 2, this.col + 1);
  }

  verticalDownLeft() {
    this.board = this.createMove(this.row + 2, this.col - 1);
  }
}
