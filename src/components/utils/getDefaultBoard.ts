import { CONFIG } from "./config";
import { ChessBoard, ChessPieces, Player } from "./types";

export const baseItem = () => {
  if (CONFIG.BASE_ITEM === Player.WHITE) {
    return {
      [CONFIG.ROW - 1]: Player.WHITE,
      [CONFIG.ROW - 2]: Player.WHITE,
      0: Player.BLACK,
      1: Player.BLACK,
      [Player.BLACK]: 0,
      [Player.WHITE]: CONFIG.ROW - 1,
    };
  }

  return {
    [CONFIG.ROW - 1]: Player.BLACK,
    [CONFIG.ROW - 2]: Player.BLACK,
    0: Player.WHITE,
    1: Player.WHITE,
    [Player.WHITE]: 0,
    [Player.BLACK]: CONFIG.ROW - 1,
  };
};

export const getDefaultBoard = (): ChessBoard => {
  const baseChessItem = baseItem();
  const defaultBoard = Array.from({ length: CONFIG.ROW }, (_, row) =>
    Array.from({ length: CONFIG.COL }, (_, col) => {
      // black pieces
      // The Pawn
      if (row === 1 || row === 6) {
        return {
          player: baseChessItem[row],
          piece: ChessPieces.PAWN,
          valid: false,
        };
      }

      if (row === 0 || row === 7) {
        switch (col) {
          // The Rook
          case 0:
          case 7:
            return {
              player: baseChessItem[row],
              piece: ChessPieces.ROOK,
              valid: false,
            };
          // The Knight
          case 1:
          case 6:
            return {
              player: baseChessItem[row],
              piece: ChessPieces.KNIGHT,
              valid: false,
            };
          // The Bishop
          case 2:
          case 5:
            return {
              player: baseChessItem[row],
              piece: ChessPieces.BISHOP,
              valid: false,
            };
          // The Queen
          case 3:
            return {
              player: baseChessItem[row],
              piece: ChessPieces.QUEEN,
              valid: false,
            };
          // The King
          case 4:
            return {
              player: baseChessItem[row],
              piece: ChessPieces.KING,
              valid: false,
            };
          default:
            break;
        }
      }
      return { player: null, piece: null, valid: false };
    })
  );

  return defaultBoard;
};
