import { DiagonalMoveClass } from "../Move/DiagonalMoveClass";
import { StraightMoveClass } from "../Move/StraightMoveClass";
import { CONFIG } from "../config";
import { baseItem } from "../getDefaultBoard";
import {
  ChessBoard,
  ChessPieces,
  Col,
  Player,
  Row,
  SelectedBoardItem,
} from "../types";

interface PawnMove {
  normal: number;
  base: number;
  diagonal: number;
}

export class PawnClass {
  board: ChessBoard;
  boardItem: SelectedBoardItem;
  baseItem;
  player: Player;
  row: Row;
  col: Col;
  pawnMove: PawnMove;
  playerTurn: Player;

  constructor(
    board: ChessBoard,
    boardItem: SelectedBoardItem,
    playerTurn: Player
  ) {
    this.board = board;
    this.boardItem = boardItem;
    this.baseItem = baseItem();
    this.player = this.boardItem.val.player;
    this.playerTurn = playerTurn;
    this.row = this.boardItem.row;
    this.col = this.boardItem.col;
    this.pawnMove = {
      normal: 1,
      base: 2,
      diagonal: 1,
    };
  }

  moveDown() {
    const starightMove = new StraightMoveClass(
      this.board,
      this.boardItem,
      this.playerTurn
    );
    let maxMove = this.pawnMove.normal;
    if (this.row === this.baseItem[this.player] + 1) {
      maxMove = this.pawnMove.base;
    }
    starightMove.verticalDownMove({ maxMove, piece: ChessPieces.PAWN });
    const diagonalMove = new DiagonalMoveClass(
      starightMove.board,
      this.boardItem,
      this.playerTurn
    );
    diagonalMove.diagonalDownMove(1);
    return diagonalMove.board;
  }

  moveUp() {
    const starightMove = new StraightMoveClass(
      this.board,
      this.boardItem,
      this.playerTurn
    );
    let maxMove = this.pawnMove.normal;
    if (this.row === this.baseItem[this.player] - 1) {
      maxMove = this.pawnMove.base;
    }
    starightMove.verticalUpMove({ maxMove, piece: ChessPieces.PAWN });
    const diagonalMove = new DiagonalMoveClass(
      starightMove.board,
      this.boardItem,
      this.playerTurn
    );
    diagonalMove.diagonalUpMove(1);
    return diagonalMove.board;
  }

  getMove() {
    if (this.player && this.row !== 0 && this.row !== CONFIG.ROW - 1) {
      if (this.baseItem[this.player] === 0) {
        this.board = this.moveDown();
      } else {
        this.board = this.moveUp();
      }
    }
    return this.board;
  }
}
