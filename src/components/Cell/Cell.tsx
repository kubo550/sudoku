import { FC } from "react";
import { Indexes, SudokuField } from "../../types";
import * as S from "./Cell.style";

interface CellProps {
  click: () => void;
  cell: SudokuField;
  activeSpot: Indexes;
}

const Cell: FC<CellProps> = ({ cell, click, activeSpot }) => {
  return (
    <S.Cell
      onClick={click}
      borderTop={cell.pos.x % 3 === 0}
      borderLeft={cell.pos.y % 3 === 0}
      readonly={cell.readOnly}
      isHover={
        activeSpot.x === cell.pos.x ||
        activeSpot.y === cell.pos.y ||
        activeSpot.z === cell.pos.z
      }
      isCorrect={cell.value === cell.correct}
    >
      {cell.value ? cell.value : ""}
    </S.Cell>
  );
};

export default Cell;
