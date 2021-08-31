export const isRookPathOpen = (board: BoardElems.BoardPiece[], currIndex: number, dstIndex: number) => {

  const isColMove = currIndex % 8 === dstIndex % 8;
  const direction = (dstIndex - currIndex) / Math.abs(dstIndex - currIndex);
  const length = isColMove ? Math.floor((Math.abs(dstIndex - currIndex)) / 8) : Math.abs(dstIndex - currIndex);

  for (let i = 1; i < length; i++) {
    const testIndex = isColMove ? currIndex + direction * 8 * i : currIndex + direction * i;
    const square: BoardElems.BoardPiece = board[testIndex];
    if (square.piece !== null) {
      return false;
    }
  }

  return true;
}

export const isBishopPathOpen = (board: BoardElems.BoardPiece[], currIndex: number, dstIndex: number) => {
  
}

export const isPathOpen = (board, currIndex, dstIndex) => {
  const pathMap = {
    Rook: isRookPathOpen(board, currIndex, dstIndex),

  }
}