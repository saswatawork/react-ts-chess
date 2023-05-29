import { Actions } from "./utils/actions";
import { ActionProps, ChessInitialState, Player } from "./utils/types";

export const chessInitialState: ChessInitialState = {
  chessBoard: [],
  playerTurn: Player.WHITE,
  activePiece: null,
  chessBoardObj: null,
};

export const ChessReducer = (
  state: ChessInitialState,
  { type, payload }: ActionProps
) => {
  console.log({ type, payload });
  switch (type) {
    case Actions.DEFAULT_BOARD:
      return {
        ...state,
        chessBoard: payload.chessBoard,
        chessBoardObj: payload.chessBoardObj,
      };

    case Actions.UPDATE_BOARD:
      return {
        ...state,
        ...payload,
      };
    case Actions.SET_PLAYER_TURN:
      return {
        ...state,
        chessBoard: payload.chessBoard,
        playerTurn: payload.playerTurn,
        activePiece: payload.activePiece,
      };
    default:
      return state;
  }
};
