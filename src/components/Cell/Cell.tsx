import { FC } from "react";
import { Indexes, SudokuField } from "../../types";
import * as S from "./Cell.style";

interface CellProps {
  click: () => void;
  cell: SudokuField;
  activeSpot: Indexes;
  highlightedNum: number | null;
}

const Cell: FC<CellProps> = ({ cell, click, activeSpot, highlightedNum }) => {
  const isHover =
    activeSpot.x === cell.pos.x ||
    activeSpot.y === cell.pos.y ||
    activeSpot.z === cell.pos.z;

  const isCurrentSpot =
    activeSpot.x === cell.pos.x && activeSpot.y === cell.pos.y;

  const isBorderTop = cell.pos.x !== 0 && cell.pos.x % 3 === 0;
  const isBorderLeft = cell.pos.y !== 0 && cell.pos.y % 3 === 0;

  return (
    <S.Cell
      onClick={click}
      borderTop={isBorderTop}
      borderLeft={isBorderLeft}
      readonly={cell.readOnly}
      isHover={isHover}
      isCurrentSpot={isCurrentSpot}
      isCorrect={cell.value === cell.correct}
      isHighlightedNum={cell.value === highlightedNum}
    >
      {cell.value ? cell.value : ""}
    </S.Cell>
  );
};

export default Cell;
