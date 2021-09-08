const isRookPathOpen = (board: BoardElems.BoardPiece[], currIndex: number, dstIndex: number) => {

  const isColMove = currIndex % 8 === dstIndex % 8;
  const direction = (dstIndex - currIndex) / Math.abs(dstIndex - currIndex);
  const length = isColMove ? Math.floor((Math.abs(dstIndex - currIndex)) / 8) : Math.floor(Math.abs(dstIndex - currIndex));

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
  console.log('dstIndex', dstIndex);
  // console.log('board', board);

  const pathDist = dstIndex - currIndex;
  const pathLength = Math.abs(pathDist);
  console.log('pathLength', pathLength);
    // console.log('pathDist', pathDist);
  const isMajorMove = pathLength % 9 === 0;
  const isMinorMove = pathLength % 7 === 0;
  if ((isMajorMove || isMinorMove) && pathLength > 1) {
    const direction = pathDist / pathLength;
    console.log('direction', direction);

    const length = isMajorMove ? Math.floor(pathLength / 7) : Math.floor(pathLength / 9);
    console.log('len', length);
    console.log('testing potential index', currIndex + direction * 7 * 1);
    for (let i = 1; i < length; i++) {
      const testIndex = isMajorMove ? currIndex + direction * 7 * i : currIndex + direction * 9 * i;
      console.log('testIndex', testIndex);
      const square: BoardElems.BoardPiece = board[testIndex];
      if (square.piece === null) {
        return true;
      }
    }
    return false;
  }
  return true;
}

const isQueenPathOpen = (board: BoardElems.BoardPiece[], currIndex: number, dstIndex: number) => {
  return isBishopPathOpen(board, currIndex, dstIndex) || isRookPathOpen(board, currIndex, dstIndex);
}

export const isPathOpen = (piece, board, currIndex, dstIndex): boolean => {
  const pathMap = {
    Rook: isRookPathOpen,
    Bishop: isBishopPathOpen,
    Queen: isQueenPathOpen,
    Knight: () => false, // Knights can travel regardless of pieces on its path
    King: () => false, // no pieces can exist in between a King's initial and final position
    Pawn: () => false, // Todo: add logic for this
  }
  return pathMap[piece](board, currIndex, dstIndex);
}

