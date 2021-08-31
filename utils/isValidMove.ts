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
  // prevnt check of out of bound rows and cols
  // otherwise all adjacentsquares
  const initRow = Math.floor(initial / 8);
  const finRow = Math.floor(final / 8);
}

const knightMove = (currIndex, destIndex) => {
  const dist = destIndex - currIndex;
  const currCol = currIndex % 8;
  const destCol = destIndex % 8;
  // 62 => 48 or 46
  // 45 can go to 28, 30, 39, 35, 51, 55, 60, 62
  // x => 18 +/- 1, 
}

export const isValidMove = (type: string, initial: number, final: number): boolean => {
  const pieceMap = {
    Pawn: pawnMove(initial, final),
    Bishop: bishopMove(initial, final),
    Rook: rookMove(initial, final),
    Queen: queenMove(initial, final),
    default: null
  }

  
  return pieceMap[type];
}