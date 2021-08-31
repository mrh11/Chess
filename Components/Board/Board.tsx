import { container } from "./Board.styles";
import Square from "../Square/Square";
import { createChessMatrix, createColCoors, createRowCoors } from "../../utils/boardCoors";

const Board = (): JSX.Element => {
  const rowCoors: number[] = createRowCoors();
  const colCoors: string[] = createColCoors();
  const array: string[][] = createChessMatrix();
  return (
    <div className={container}>
      {colCoors.map((col, colIndex) => (
        <div key={`col-${col}`} style={{ gridColumn: colIndex + 2 }}>
          {col}
        </div>
      ))}
      {array.map((row, rowIndex) => (
        <>
          <div key={`row-${rowCoors[rowIndex]}`} style={{ gridRow: rowIndex + 2 }}>{
            rowCoors[rowIndex]}
          </div>
          {row.map((cell, colIndex) => (
            <Square key={`${rowIndex}-${colIndex}`} colIndex={colIndex} rowIndex={rowIndex} />
          ))}
        </>
      ))}
    </div>
  )
}

export default Board;
