import { CONFIG } from "../config";
import {
  ChessBoard,
  ChessPieces,
  Col,
  CreateMoveProps,
  MaxMove,
  Player,
  Row,
  SelectedBoardItem,
} from "../types";

interface MoveProps {
  maxMove: MaxMove;
  piece?: ChessPieces;
}

export class StraightMoveClass {
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

  allStraightMove(move: MoveProps) {
    this.horiZontalRightMove(move);
    this.horiZontalLeftMove(move);
    this.verticalUpMove(move);
    this.verticalDownMove(move);
  }

  createMove({ updatedBoard, row, col, maxMove, piece }: CreateMoveProps) {
    const moveStatus = { valid: false, break: false };
    if (piece) {
      if (piece === ChessPieces.PAWN && !updatedBoard[row][col].player) {
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
      if (!updatedBoard[row][col].player) {
        moveStatus.valid = true;
      } else if (
        updatedBoard[row][col].player &&
        updatedBoard[row][col].player !== this.playerTurn
      ) {
        moveStatus.valid = true;
        moveStatus.break = true;
      } else {
        moveStatus.break = true;
      }
    }
    return moveStatus;
  }

  horiZontalRightMove({ maxMove, piece }: MoveProps) {
    const updatedBoard = [...this.board];
    let rowLimit = CONFIG.ROW - 1;
    let currentMove;

    for (let col = this.col + 1; col <= rowLimit; col++) {
      currentMove = this.createMove({
        updatedBoard,
        col,
        row: this.row,
        maxMove,
        piece,
      });
      if (currentMove.valid) {
        updatedBoard[this.row][col].valid = true;
      }
      if (currentMove.break) {
        break;
      }
    }
    this.board = updatedBoard;
    return updatedBoard;
  }

  horiZontalLeftMove({ maxMove, piece }: MoveProps) {
    const updatedBoard = [...this.board];
    let rowLimit = 0;
    let currentMove;

    for (let col = this.col - 1; col >= rowLimit; col--) {
      currentMove = this.createMove({
        updatedBoard,
        col,
        row: this.row,
        maxMove,
        piece,
      });
      if (currentMove.valid) {
        updatedBoard[this.row][col].valid = true;
      }
      if (currentMove.break) {
        break;
      }
    }
    this.board = updatedBoard;
    return updatedBoard;
  }

  verticalUpMove({ maxMove, piece }: MoveProps) {
    const updatedBoard = [...this.board];
    let rowLimit = maxMove ? this.row - maxMove : 0;
    let currentMove;

    for (let row = this.row - 1; row >= rowLimit; row--) {
      currentMove = this.createMove({
        updatedBoard,
        col: this.col,
        row,
        maxMove,
        piece,
      });
      if (currentMove.valid) {
        updatedBoard[row][this.col].valid = true;
      }
      if (currentMove.break) {
        break;
      }
    }
    this.board = updatedBoard;
    return updatedBoard;
  }

  verticalDownMove({ maxMove, piece }: MoveProps) {
    const updatedBoard = [...this.board];
    let rowLimit = maxMove ? this.row + maxMove : CONFIG.ROW - 1;
    let currentMove;

    for (let row = this.row + 1; row <= rowLimit; row++) {
      currentMove = this.createMove({
        updatedBoard,
        col: this.col,
        row,
        maxMove,
        piece,
      });
      if (currentMove.valid) {
        updatedBoard[row][this.col].valid = true;
      }
      if (currentMove.break) {
        break;
      }
    }
    this.board = updatedBoard;
    return updatedBoard;
  }
}
