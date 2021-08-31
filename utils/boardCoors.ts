export const createColCoors = (): string[] => Array.from(Array(8)).map((_, i) => String.fromCharCode(i + 65));

export const createRowCoors = (): number[] => Array.from({length: 8}, (_, i) => i + 1);

export const createChessMatrix = (): string[][] => Array(8).fill(Array(8).fill(''));

export const getSquareCSS = (rowIndex: number, colIndex: number) => {
  const gridRow = rowIndex % 8 + 2;
  const gridCol = colIndex % 8 + 2;
  const cssGridArea = `${gridRow} / ${gridCol}`;
  const isColored = (gridRow % 2 === 0 && gridCol % 2 !== 0) || (gridRow % 2 !== 0 && gridCol % 2 === 0);
  return {isColored, cssGridArea}
}

export const createEmptyBoardArray = (): any[] => Array(64).fill({ piece: null, color: null });
