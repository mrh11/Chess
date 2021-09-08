import React from 'react';
import { squareStyle, dot } from "./Square.styles";
import { cx } from 'linaria';
import { getSquareCSS } from "../../utils/boardCoors";
import { selectBoardPiece, selectIsPotentialMove } from '../../redux/selectors';
import { useSelectorCreator } from '../../hooks/useSelectorCreator';
import GenericPiece from '../Piece/GenericPiece';

interface SquareProps {
  colIndex: number,
  rowIndex: number,
}

const Square: React.FC<SquareProps> = ({ colIndex, rowIndex }) => {
  const { isColored, cssGridArea } = getSquareCSS(rowIndex, colIndex);

  const boardPiece: any = useSelectorCreator(selectBoardPiece, { rowIndex, colIndex });
  const isHighlighted = useSelectorCreator(selectIsPotentialMove, { rowIndex, colIndex });
  const { piece, color } = boardPiece;

  return (
    <div className={cx(squareStyle, isColored && 'colored')} style={{ gridArea: cssGridArea }}>
      {rowIndex * 8 + colIndex}
      {isHighlighted && <span className={dot}/>}
      <GenericPiece piece={piece} color={color} rowIndex={rowIndex} colIndex={colIndex}/>
    </div>
  )
}

export default Square;