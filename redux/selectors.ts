import { createSelector } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { isValidMove } from '../utils/isValidMove';

const getCurrentBoard = (state): BoardElems.BoardPiece[] => state.boardLogic.board;

export const useSelectorCreator = (selectorCreator, ...args) => {
  const selector = useMemo(() => selectorCreator(...args), args);
  return useSelector(selector);
}

export const selectBoardPiece= ({ rowIndex, colIndex }) => createSelector([
  getCurrentBoard,
], (board): BoardElems.BoardPiece  => {
  const bIndex = 8 * rowIndex + colIndex;
  return board[bIndex];
})

export const getSelectedPiece = (state): BoardElems.BoardPiece  => state.boardLogic.selectedPiece;

export const selectIsPotentialMove = ({ rowIndex, colIndex }) => createSelector([
  getCurrentBoard,
  getSelectedPiece
], (board, chessPiece) => {
  const { index, piece } = chessPiece;
  return isValidMove(piece, index, rowIndex * 8 + colIndex);
})