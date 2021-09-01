const isRookPathOpen = (board: BoardElems.BoardPiece[], currIndex: number, dstIndex: number) => {

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

const isBishopPathOpen = (board: BoardElems.BoardPiece[], currIndex: number, dstIndex: number) => {
  const pathDist = currIndex - dstIndex;
  console.log('pathDist', pathDist);
  const pathLength = Math.abs(pathDist);
  const direction = pathDist / pathLength;
  const isMajorMove = pathLength % 7 === 0;
  console.log('isMajorMove', isMajorMove);

  const length = isMajorMove ? pathLength / 7 : pathLength / 9;
  console.log('len', length);
  for (let i = 1; i < length; i++) {
    const testIndex = isMajorMove ? currIndex + direction * 7 * i : currIndex + direction * 9 * i;
    console.log('testIndex', testIndex);
    const square: BoardElems.BoardPiece = board[testIndex];
    if (square.piece !== null) {
      return false;
    }
  }

  return true;
}

const isQueenPathOpen = (board: BoardElems.BoardPiece[], currIndex: number, dstIndex: number) => {
  return isBishopPathOpen(board, currIndex, dstIndex) || isRookPathOpen(board, currIndex, dstIndex);
}

export const isPathOpen = (piece, board, currIndex, dstIndex): boolean => {
  const pathMap = {
    Rook: isRookPathOpen(board, currIndex, dstIndex),
    Bishop: isBishopPathOpen(board, currIndex, dstIndex),
    Queen: isQueenPathOpen(board, currIndex, dstIndex),
    Knight: true, // Knights can travel regardless of pieces on its path
    King: true, // no pieces can exist in between a King's initial and final position
    Pawn: true, // Todo: add logic for this
  }
  return pathMap[piece];
}

