import { CONFIG } from "../config";
import {
  ChessBoard,
  ChessPieces,
  Col,
  CreateMoveProps,
  MoveProps,
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

  diagonalUpMove(move: MoveProps) {
    this.diagonalUpRightMove(move);
    this.diagonalUpLeftMove(move);
  }

  diagonalDownMove(move: MoveProps) {
    this.diagonalDownRightMove(move);
    this.diagonalDownLeftMove(move);
  }

  allDiagonalMove(move: MoveProps) {
    this.diagonalUpRightMove(move);
    this.diagonalUpLeftMove(move);
    this.diagonalDownRightMove(move);
    this.diagonalDownLeftMove(move);
  }

  createMove({ updatedBoard, row, col, maxMove, piece }: CreateMoveProps) {
    const moveStatus = { valid: false, break: false };
    if (piece) {
      if (
        piece === ChessPieces.PAWN &&
        updatedBoard[row] &&
        updatedBoard[row][col] &&
        updatedBoard[row][col].player &&
        updatedBoard[row][col].player !== this.playerTurn
      ) {
        moveStatus.valid = true;
      } else if (
        piece === ChessPieces.KING &&
        updatedBoard[row] &&
        updatedBoard[row][col] &&
        updatedBoard[row][col].player !== this.playerTurn &&
        updatedBoard[row][col].piece !== ChessPieces.KING
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

  diagonalUpRightMove({ maxMove, piece }: MoveProps) {
    const updatedBoard = [...this.board];
    let col = this.col + 1;
    let rowLimit = maxMove ? this.row - maxMove : 0;
    let currentMove;

    for (let row = this.row - 1; row >= rowLimit; row--) {
      currentMove = this.createMove({ updatedBoard, row, col, maxMove, piece });
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

  diagonalUpLeftMove({ maxMove, piece }: MoveProps) {
    const updatedBoard = [...this.board];
    let col = this.col - 1;
    let rowLimit = maxMove ? this.row - maxMove : 0;
    let currentMove;

    for (let row = this.row - 1; row >= rowLimit; row--) {
      currentMove = this.createMove({ updatedBoard, row, col, maxMove, piece });
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

  diagonalDownRightMove({ maxMove, piece }: MoveProps) {
    const updatedBoard = [...this.board];
    let col = this.col + 1;
    let rowLimit = maxMove ? this.row + maxMove : CONFIG.ROW;
    let currentMove;

    for (let row = this.row + 1; row <= rowLimit; row++) {
      currentMove = this.createMove({ updatedBoard, row, col, maxMove, piece });
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

  diagonalDownLeftMove({ maxMove, piece }: MoveProps) {
    const updatedBoard = [...this.board];
    let col = this.col - 1;
    let rowLimit = maxMove ? this.row + maxMove : CONFIG.ROW;
    let currentMove;

    for (let row = this.row + 1; row <= rowLimit; row++) {
      currentMove = this.createMove({ updatedBoard, row, col, maxMove, piece });
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
