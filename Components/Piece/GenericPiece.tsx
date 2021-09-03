import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import King from '../../ChessPieces/King';
import Knight from '../../ChessPieces/Knight';
import Pawn from '../../ChessPieces/Pawn';
import Queen from '../../ChessPieces/Queen';
import Rook from '../../ChessPieces/Rook';
import Bishop from '../../ChessPieces/Bishop';
import { selectPiece } from '../../redux/gameLogicReducer';

const GenericPieceMap = ( color ) => ({
  King: <King color={color}/>,
  Knight: <Knight color={color}/>,
  Pawn: <Pawn color={color}/>,
  Queen: <Queen color={color}/>,
  Rook: <Rook color={color}/>,
  Bishop: <Bishop color={color}/>,
})

const GenericPiece = ({ piece, color, rowIndex, colIndex }) => {
  const dispatch = useDispatch();

  const handlePieceClick = useCallback(() => {
    const index = colIndex + rowIndex * 8;
    dispatch(selectPiece({
      piece,
      color,
      index,
    }))
  }, [piece]);
  
  return (
    <div className="drag" draggable style={{ backgroundColor: "transparent" }} onClick={handlePieceClick}>
      {GenericPieceMap(color)[piece]}
    </div>
  )
}

export default GenericPiece;