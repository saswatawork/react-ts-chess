import {
  BoxItem,
  ChessBoard,
  ChessPieces,
  Player,
  SelectedBoardItem,
} from "../types";
import { BishopClass } from "./BishopClass";
import { KingClass } from "./KingClass";
import { KnightClass } from "./KnightClass";
import { PawnClass } from "./PawnClass";
import { QueenClass } from "./QueenClass";
import { RookClass } from "./RookClass";

export class ChessBoardClass {
  boardItem: SelectedBoardItem | null;
  board: ChessBoard;
  _playerTurn: Player;
  _pawn: PawnClass | null;
  _bishop: BishopClass | null;
  _rook: RookClass | null;
  _knight: KnightClass | null;
  _queen: QueenClass | null;
  _king: KingClass | null;

  constructor(board: ChessBoard) {
    this.board = board;
    this.boardItem = null;
    this._playerTurn = Player.WHITE;
    this._pawn = null;
    this._bishop = null;
    this._rook = null;
    this._knight = null;
    this._queen = null;
    this._king = null;
  }

  set playerTurn(player: Player) {
    this._playerTurn = player;
  }

  set activeBoardItem(boardItem: SelectedBoardItem | null) {
    if (boardItem) {
      this.boardItem = boardItem;
      this.pawn = new PawnClass(
        this.board,
        this.activeBoardItem,
        this._playerTurn
      );
      this.bishop = new BishopClass(
        this.board,
        this.activeBoardItem,
        this._playerTurn
      );
      this.rook = new RookClass(
        this.board,
        this.activeBoardItem,
        this._playerTurn
      );
      this.knight = new KnightClass(
        this.board,
        this.activeBoardItem,
        this._playerTurn
      );
      this.queen = new QueenClass(
        this.board,
        this.activeBoardItem,
        this._playerTurn
      );
      this.king = new KingClass(
        this.board,
        this.activeBoardItem,
        this._playerTurn
      );
    } else {
      this.boardItem = null;
      this.pawn = null;
    }
  }

  get activeBoardItem(): SelectedBoardItem {
    if (!this.boardItem) {
      throw new Error("Active board Item can not be null");
    }
    return this.boardItem;
  }

  set pawn(pawn: PawnClass | null) {
    this._pawn = pawn;
  }

  get pawn(): PawnClass {
    if (!this._pawn) {
      throw new Error("Pawn can not be null");
    }
    return this._pawn;
  }

  set bishop(pawn: BishopClass | null) {
    this._bishop = pawn;
  }

  get bishop(): BishopClass {
    if (!this._bishop) {
      throw new Error("Bishop can not be null");
    }
    return this._bishop;
  }

  set rook(rook: RookClass | null) {
    this._rook = rook;
  }

  get rook(): RookClass {
    if (!this._rook) {
      throw new Error("Rook can not be null");
    }
    return this._rook;
  }

  set knight(knight: KnightClass | null) {
    this._knight = knight;
  }

  get knight(): KnightClass {
    if (!this._knight) {
      throw new Error("Knight can not be null");
    }
    return this._knight;
  }

  set queen(queen: QueenClass | null) {
    this._queen = queen;
  }

  get queen(): QueenClass {
    if (!this._queen) {
      throw new Error("Queen can not be null");
    }
    return this._queen;
  }

  set king(king: KingClass | null) {
    this._king = king;
  }

  get king(): KingClass {
    if (!this._king) {
      throw new Error("king can not be null");
    }
    return this._king;
  }

  getValidMove() {
    switch (this.activeBoardItem.val.piece) {
      case ChessPieces.PAWN:
        return this.pawn.getMove();
      case ChessPieces.BISHOP:
        return this.bishop.getMove();
      case ChessPieces.ROOK:
        return this.rook.getMove();
      case ChessPieces.KNIGHT:
        return this.knight.getMove();
      case ChessPieces.QUEEN:
        return this.queen.getMove();
      case ChessPieces.KING:
        return this.king.getMove();
      default:
        break;
    }
  }

  cleanActiveBoardItem() {
    let boardCopy = [...this.board];
    this.board.forEach((boardRow, row) =>
      boardRow.forEach((_, col) => {
        boardCopy[row][col].valid = false;
      })
    );
    this.board = boardCopy;
    this.activeBoardItem = null;
  }

  move({ row, col }: BoxItem) {
    const boardCopy = [...this.board];
    boardCopy[row][col].piece =
      this.board[this.activeBoardItem.row][this.activeBoardItem.col].piece;
    boardCopy[row][col].player =
      this.board[this.activeBoardItem.row][this.activeBoardItem.col].player;
    boardCopy[row][col].valid = false;
    boardCopy[this.activeBoardItem.row][this.activeBoardItem.col].piece = null;
    boardCopy[this.activeBoardItem.row][this.activeBoardItem.col].player = null;
    boardCopy[this.activeBoardItem.row][this.activeBoardItem.col].valid = false;
    this.board = boardCopy;
    return this.board;
  }
}
