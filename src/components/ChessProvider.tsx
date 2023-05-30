import React, {
  Dispatch,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  ActionProps,
  BoxItem,
  ChessInitialState,
  ChildrenProps,
  Player,
  SelectedBoardItem,
} from "./utils/types";
import { ChessReducer, chessInitialState } from "./ChessReducer";
import { ChessBoardClass } from "./utils/ChessBoardClass";
import { Actions } from "./utils/actions";
import { getDefaultBoard } from "./utils/getDefaultBoard";

interface ChessContextProps {
  chessState: ChessInitialState;
  chessDispatch: Dispatch<ActionProps>;
  getChessPieceMove(
    currentBoardItem: SelectedBoardItem,
    playerTurn: Player
  ): void;
  moveChessPiece(moveTo: BoxItem, playerTurn: Player): void;
}

const ChessContext = createContext<ChessContextProps | null>(null);

export const useChess = () => {
  const chess = useContext(ChessContext);
  if (!chess) {
    throw new Error("useChess must be wrapped inside the ChessProvider");
  }

  return chess;
};

export const ChessProvider = ({ children }: ChildrenProps) => {
  const [chessState, chessDispatch] = useReducer(
    ChessReducer,
    chessInitialState
  );

  useEffect(() => {
    const chessBoardObj = new ChessBoardClass(getDefaultBoard());
    chessDispatch({
      type: Actions.DEFAULT_BOARD,
      payload: {
        chessBoard: chessBoardObj.board,
        chessBoardObj: chessBoardObj,
      },
    });
  }, []);

  const getChessPieceMove = useCallback(
    (boardItem: SelectedBoardItem, playerTurn: Player) => {
      const chessBoardObj = chessState.chessBoardObj as ChessBoardClass;
      chessBoardObj.cleanActiveBoardItem();
      chessBoardObj.activeBoardItem = boardItem;
      chessBoardObj.playerTurn = playerTurn;
      chessBoardObj.getValidMove();
      chessDispatch({
        type: Actions.UPDATE_BOARD,
        payload: { chessBoard: chessBoardObj.board, activePiece: boardItem },
      });
    },
    [chessState.chessBoardObj]
  );

  const moveChessPiece = useCallback(
    (moveTo: BoxItem, playerTurn: Player) => {
      const chessBoardObj = chessState.chessBoardObj as ChessBoardClass;
      chessBoardObj.move(moveTo);
      chessBoardObj.cleanActiveBoardItem();
      chessBoardObj.playerTurn =
        playerTurn === Player.WHITE ? Player.BLACK : Player.WHITE;
      chessDispatch({
        type: Actions.SET_PLAYER_TURN,
        payload: {
          chessBoard: chessBoardObj.board,
          activePiece: null,
          playerTurn: playerTurn === Player.WHITE ? Player.BLACK : Player.WHITE,
        },
      });
    },
    [chessState.chessBoardObj]
  );

  const value = useMemo(() => {
    return {
      chessState,
      chessDispatch,
      getChessPieceMove,
      moveChessPiece,
    };
  }, [chessState, chessDispatch, getChessPieceMove, moveChessPiece]);

  return (
    <ChessContext.Provider value={value}>{children}</ChessContext.Provider>
  );
};
