const pawnMove = (initial, final) => {
  const dist = final - initial;
  const length = Math.abs(dist);
  return (length > 0 && length < 64 && (dist === -8 || dist === -16))
}

const rookMove = (initial, final) => {
  const initCol = initial % 8;
  const initRow = Math.floor(initial / 8);

  const finCol = final % 8;
  const finRow = Math.floor(final / 8);

  const onSameCol = initCol === finCol;
  const onSameRow = initRow === finRow;

  return onSameCol || onSameRow;
}

const bishopMove = (initial, final) => {
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

const queenMove = (initial, final) => bishopMove(initial, final) || rookMove(initial, final);

const kingMove = (initial, final) => {
  const initRow = Math.floor(initial / 8);
  const initCol = initial % 8;
  const dist = final - initial;
  const length = Math.abs(dist);

  // board boundaries
  const topRow = initRow > 0;
  const bottomRow = initRow < 7;
  const leftCol = initCol > 0;
  const rightCol = initCol < 7;

  return ((topRow || bottomRow) && 7 <= length && length <= 9) || ((leftCol || rightCol) && length === 1);
}

const knightMove = (initial, final) => {
  const initRow = Math.floor(initial / 8);
  const initCol = initial & 8;

  const length = Math.abs(initial - final);

  const topRow = initRow > 1;
  const bottomRow = initRow < 6;
  const leftCol = initCol > 0;
  const rightCol = initCol < 7;

  return ((topRow || bottomRow) && (length === 15 || length === 17)) || ((leftCol || rightCol) && (length === 6 || length === 10));
}

export const isValidMove = (type: string, initial: number, final: number): boolean => {
  const pieceMap = {
    Pawn: pawnMove(initial, final),
    Bishop: bishopMove(initial, final),
    Rook: rookMove(initial, final),
    Queen: queenMove(initial, final),
    King: kingMove(initial, final),
    Knight: knightMove(initial, final),
    default: null
  }
  return pieceMap[type];
}