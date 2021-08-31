import { createEmptyBoardArray } from "./boardCoors";

const addPiece = (piece: string, color: string): BoardElems.BoardPiece => {
  return ({
    "piece": piece,
    "color": color
  });
}

/**
 * 
 * @returns a one dimensional array where each index corresponds to one of the 64 squares on the board.
 *          starting from the top left.  Each element is an object storing the piece name and color
 */
 export const initChessPositions = (): BoardElems.BoardPiece[] => {
  const board = createEmptyBoardArray();

  // pawns
  for (let i = 0; i < 8; i++) {
    board[i + 8] = addPiece('Pawn', 'white');
    board[i + 48] = addPiece('Pawn', 'black');
  }

  for (let i = 0; i < 2; i++) {
    // rooks
    board[7 * i] = addPiece('Rook', 'white');
    board[56 + 7 * i] = addPiece('Rook', 'black');

    // knights
    board[1 + 5 * i] = addPiece('Knight', 'white');
    board[57 + 5 * i] = addPiece('Knight', 'black');

    // bishops
    board[2 + 3 * i] = addPiece('Bishop', 'white');
    board[58 + 3 * i] = addPiece('Bishop', 'black');

    // Kings
    board[3 + 56 * i] = addPiece('King', i === 0 ? 'white' : 'black');

    // Queens
    board[4 + 56 * i] = addPiece('Queen', i === 0 ? 'white' : 'black');
  }

  return board;
}