import { FC } from "react";
import { Indexes, SudokuField } from "../../types";
import * as S from "./Cell.style";

interface CellProps {
  click: () => void;
  cell: SudokuField;
  activeSpot: Indexes;
  x: number;
  y: number;
}

const Cell: FC<CellProps> = ({ cell, click, x, y, activeSpot }) => {
  return (
    <S.Cell
      onClick={click}
      borderTop={x % 3 === 0}
      borderLeft={y % 3 === 0}
      readonly={cell.readOnly}
      isHover={activeSpot.x === x || activeSpot.y === y}
      isCorrect={cell.value === cell.correct}
    >
      {cell.value ? cell.value : ""}
    </S.Cell>
  );
};

export default Cell;
