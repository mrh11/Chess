import { createSelector } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { isPathOpen } from '../utils/isPathBlocked';
import { isValidMove } from '../utils/isValidMove';

const getCurrentBoard = (state): BoardElems.BoardPiece[] => state.boardLogic.board;

export const selectBoardPiece = ({ rowIndex, colIndex }) => createSelector([
  getCurrentBoard,
], (board): BoardElems.BoardPiece  => {
  const bIndex = 8 * rowIndex + colIndex;
  return board[bIndex];
});

export const getSelectedPiece = (state): BoardElems.BoardPiece  => state.boardLogic.selectedPiece;

export const selectIsPotentialMove = ({ rowIndex, colIndex }) => createSelector([
  getCurrentBoard,
  getSelectedPiece
], (board, chessPiece): boolean => {
  const { index: currIndex, piece, color } = chessPiece;
  // no piece has been selected to move;
  if (piece === null) {
    return false;
  }

  let availableSquare = true;
  const dstIndex = rowIndex * 8 + colIndex;
  const destSquare = board[dstIndex];
  
  const isValid = isValidMove(piece, currIndex, dstIndex);
  const openSquare = destSquare.color !== color;
  const openPath = isPathOpen(piece, board, currIndex, dstIndex);
  console.log('openPath', openPath);
  if (!isValid || !openSquare || !openPath) {
    availableSquare = false;
  }

  return availableSquare;
});


