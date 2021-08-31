import { AnyAction, createAction, createReducer } from '@reduxjs/toolkit';
import { initChessPositions } from '../utils/initialPieces';

//actions
export const movePiece = createAction<any>('MovePiece');
export const restorePiece = createAction<any>('RestorePiece');
export const undoMove = createAction('UndoMove');
export const redoMove = createAction('RedoMove');
export const newGame = createAction('NewGame');
export const selectPiece = createAction<any>('SelectPiece');

export const initialState = () => {
  return {
    board: initChessPositions(),
    capturedWhite: [],
    capturedBlack: [],
    recordedMoves: [],
    selectedPiece: { piece: null, color: null, index: null },
  }
}

// reducer
export const boardLogic = createReducer(initialState(), (builder) => {
  builder
    .addCase(movePiece, (state, action) => {
      const { piece, initial, final } = action.payload;
      const isValidMove = true;
      const isCapture = state.board[final] !== null;
        if (isCapture) {
          piece.color === 'white' ? state.capturedWhite.push(piece) : state.capturedBlack.push(piece);
        }
        state.board[initial] = null;
    })
    .addCase(restorePiece, (state, action) => {
      const { restoredColor, piece, initial, final } = action.payload;
      if (restoredColor === 'white') {
        // remove piece from captured area
        state.capturedWhite = state.capturedWhite.slice(0, initial)
          .concat(state.capturedWhite.slice(initial + 1));
        // add pawn to captured area
        state.capturedWhite.push(state.board[final]);
      } else {
        // remove piece from captured area
        state.capturedBlack = state.capturedBlack.slice(0, initial)
          .concat(state.capturedBlack.slice(initial + 1));
        // add pawn to captured area
        state.capturedBlack.push(state.board[final]);
      }
      state.board[final] = piece;
    })
    .addCase(newGame, (state) => {
      state.capturedWhite = [],
      state.capturedBlack = [],
      state.recordedMoves = [],
      state.board = initChessPositions();
    })
    .addCase(selectPiece, (state, action) => {
      const { index, piece, color } = action.payload;
      state.selectedPiece = {
        piece,
        color,
        index,
      }
    })
})
