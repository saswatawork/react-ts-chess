import { ReactNode } from "react";
import { ChessBoardClass } from "./ChessBoardClass";

export interface ChildrenProps {
  children: ReactNode | ReactNode[];
}

export type Row = number;
export type Col = number;
export interface ActionProps {
  type: string;
  payload?: any;
}

export interface BoxItem {
  row: Row;
  col: Col;
}

export interface BoardItem {
  row: Row;
  col: Col;
  val: ChessBoardItem;
}

export interface SelectedBoardItem extends BoardItem {
  val: SelectedChessBoardItem;
}

interface SelectedChessBoardItem extends ChessBoardItem {
  player: Player;
  piece: ChessPieces;
}

export interface ChessBoardItem {
  player: Player | null;
  piece: ChessPieces | null;
  valid: boolean;
}

export type ChessBoard = Array<Array<ChessBoardItem>>;

export interface ChessInitialState {
  chessBoardObj: ChessBoardClass | null;
  chessBoard: ChessBoard;
  playerTurn: Player;
  activePiece: SelectedBoardItem | null;
}

export enum Player {
  WHITE = "white",
  BLACK = "black",
}

export enum ChessPieces {
  PAWN = "pawn",
  ROOK = "rook",
  KNIGHT = "knight",
  BISHOP = "bishop",
  KING = "king",
  QUEEN = "queen",
}

export type MaxMove = number | null;
export interface CreateMoveProps {
  updatedBoard: ChessBoard;
  row: Row;
  col: Col;
  maxMove: MaxMove;
  piece?: ChessPieces;
}

export interface MoveProps {
  maxMove: MaxMove;
  piece?: ChessPieces;
}
