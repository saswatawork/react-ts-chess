import { CONFIG } from "../config";
import {
  ChessBoard,
  Col,
  CreateMoveProps,
  MaxMove,
  Player,
  Row,
  SelectedBoardItem,
} from "../types";

export class DiagonalMoveClass {
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

  diagonalUpMove(maxMove: MaxMove) {
    this.diagonalUpRightMove(maxMove);
    this.diagonalUpLeftMove(maxMove);
  }

  diagonalDownMove(maxMove: MaxMove) {
    this.diagonalDownRightMove(maxMove);
    this.diagonalDownLeftMove(maxMove);
  }

  allDiagonalMove(maxMove: MaxMove) {
    this.diagonalUpRightMove(maxMove);
    this.diagonalUpLeftMove(maxMove);
    this.diagonalDownRightMove(maxMove);
    this.diagonalDownLeftMove(maxMove);
  }

  createMove({ updatedBoard, row, col, maxMove }: CreateMoveProps) {
    const moveStatus = { valid: false, break: false };
    if (maxMove) {
      if (
        maxMove &&
        updatedBoard[row] &&
        updatedBoard[row][col] &&
        updatedBoard[row][col].player &&
        updatedBoard[row][col].player !== this.playerTurn
      ) {
        moveStatus.valid = true;
      } else {
        moveStatus.break = true;
      }
    } else {
      if (updatedBoard[row] && updatedBoard[row][col]) {
        if (updatedBoard[row][col].player) {
          if (updatedBoard[row][col].player !== this.playerTurn) {
            moveStatus.valid = true;
            moveStatus.break = true;
          } else {
            moveStatus.break = true;
          }
        } else {
          moveStatus.valid = true;
        }
      } else {
        moveStatus.break = true;
      }
    }
    return moveStatus;
  }

  diagonalUpRightMove(maxMove: MaxMove) {
    const updatedBoard = [...this.board];
    let col = this.col + 1;
    let rowLimit = maxMove ? this.row - maxMove : 0;
    let currentMove;

    for (let row = this.row - 1; row >= rowLimit; row--) {
      currentMove = this.createMove({ updatedBoard, row, col, maxMove });
      if (currentMove.valid) {
        updatedBoard[row][col].valid = true;
      }
      if (currentMove.break) {
        break;
      }
      col++;
    }

    this.board = updatedBoard;
    return updatedBoard;
  }

  diagonalUpLeftMove(maxMove: MaxMove) {
    const updatedBoard = [...this.board];
    let col = this.col - 1;
    let rowLimit = maxMove ? this.row - maxMove : 0;
    let currentMove;

    for (let row = this.row - 1; row >= rowLimit; row--) {
      currentMove = this.createMove({ updatedBoard, row, col, maxMove });
      if (currentMove.valid) {
        updatedBoard[row][col].valid = true;
      }
      if (currentMove.break) {
        break;
      }
      col--;
    }

    this.board = updatedBoard;
    return updatedBoard;
  }

  diagonalDownRightMove(maxMove: MaxMove) {
    const updatedBoard = [...this.board];
    let col = this.col + 1;
    let rowLimit = maxMove ? this.row + maxMove : CONFIG.ROW;
    let currentMove;

    for (let row = this.row + 1; row <= rowLimit; row++) {
      currentMove = this.createMove({ updatedBoard, row, col, maxMove });
      if (currentMove.valid) {
        updatedBoard[row][col].valid = true;
      }
      if (currentMove.break) {
        break;
      }
      col++;
    }
    this.board = updatedBoard;
    return updatedBoard;
  }

  diagonalDownLeftMove(maxMove: MaxMove) {
    const updatedBoard = [...this.board];
    let col = this.col - 1;
    let rowLimit = maxMove ? this.row + maxMove : CONFIG.ROW;
    let currentMove;

    for (let row = this.row + 1; row <= rowLimit; row++) {
      currentMove = this.createMove({ updatedBoard, row, col, maxMove });
      if (currentMove.valid) {
        updatedBoard[row][col].valid = true;
      }
      if (currentMove.break) {
        break;
      }
      col--;
    }
    this.board = updatedBoard;
    return updatedBoard;
  }
}
