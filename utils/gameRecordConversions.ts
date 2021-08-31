import { createEmptyBoardArray } from "./boardCoors";

const pieceMap = {
  'King': 'K',
  'Queen': 'Q',
  'Bishop': 'B',
  'Pawn': '',
  'Rook': 'R',
  'Knight': 'N'
};

// map each board index to the valid chess square coordinate (ie a1, a2, ... h7, h8):
export const squaresTuple: string[] = createEmptyBoardArray()
  .map((cell, index) => `${String.fromCharCode(index % 8 + 97)}${Math.floor(index / 8) + 1}`);

// this game can be thought of using two different coordinate systems.  All user interactions are
// are handled using a one dimensional array where index 0 maps to a1 from a conventional chess notation
// since chess notation takes into account the whole board these utility functions are just used to map pieces
// elements of chess notation while the proper record is generated within redux
export const convertMoveToRecord = (piece: string, squareIndex: number): any =>
  ({ "piece": pieceMap[piece], "square": squaresTuple[squareIndex]});


export const convertRecordToMove = (move: string) => {};