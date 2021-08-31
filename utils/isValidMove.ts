// determines what squares a chess piece could move to assuming there are not
// any pieces blocking its path or pieces of the same color on the dest square

const pawnMove = (initial: number, final: number): boolean => {
  const dist = final - initial;
  const length = Math.abs(dist);
  return (length > 0 && length < 64 && (dist === -8 || dist === -16))
}

const rookMove = (initial: number, final: number): boolean => {
  const initCol = initial % 8;
  const initRow = Math.floor(initial / 8);

  const finCol = final % 8;
  const finRow = Math.floor(final / 8);

  const onSameCol = initCol === finCol;
  const onSameRow = initRow === finRow;

  return onSameCol || onSameRow;
}

const bishopMove = (initial: number, final: number): boolean => {
  const dist = final - initial;
  const length = Math.abs(dist);
  const initCol = initial % 8;
  const finCol = final % 8;

  const onTopMajor = (length % 9 === 0 && dist < 0 && finCol < initCol);
  const onBotMajor = (length % 9 === 0 && dist > 0 && finCol > initCol);
  const onTopMinor = (length % 7 === 0 && dist < 0 && finCol > initCol);
  const onBotMinor = (length % 7 === 0 && dist > 0 && finCol < initCol);

  return onTopMajor || onBotMajor || onTopMinor || onBotMinor;
}

const queenMove = (initial: number, final: number): boolean => bishopMove(initial, final) || rookMove(initial, final);

const kingMove = (initial: number, final: number): boolean => {
  const initRow = Math.floor(initial / 8);
  const initCol = initial % 8;
  const length = Math.abs(final - initial);

  // board boundaries
  const topRow = initRow > 0;
  const bottomRow = initRow < 7;
  const leftCol = initCol > 0;
  const rightCol = initCol < 7;

  return ((topRow || bottomRow) && 7 <= length && length <= 9) || ((leftCol || rightCol) && length === 1);
}

const knightMove = (initial: number, final: number): boolean => {
  const length = Math.abs(final - initial);
  const initCol = initial % 8;
  const finCol = final % 8;
  const colLength = Math.abs(finCol - initCol);

  return ((length === 17 || length === 15) && colLength === 1) || ((length === 6 || length === 10) && colLength === 2); 
}

export const isValidMove = (type: string, initial: number, final: number): boolean => {
  const pieceMap = {
    Pawn: pawnMove(initial, final),
    Bishop: bishopMove(initial, final),
    Rook: rookMove(initial, final),
    Queen: queenMove(initial, final),
    King: kingMove(initial, final),
    Knight: knightMove(initial, final),
  }
  return pieceMap[type];
}