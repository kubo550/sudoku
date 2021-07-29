import { FC } from "react";
import { Indexes, SudokuField } from "../../types";
import { matrixArray, squareBoard } from "../../utils/createSudoku";
import * as S from "./Cell.style";

interface CellProps {
  click: () => void;
  cell: SudokuField;
  activeSpot: Indexes;
  highlightedNum: number | null;
  board: SudokuField[][];
  isWin: boolean;
}

const Cell: FC<CellProps> = ({
  cell,
  click,
  activeSpot,
  highlightedNum,
  board,
  isWin,
}) => {
  const isHover =
    activeSpot.x === cell.pos.x ||
    activeSpot.y === cell.pos.y ||
    activeSpot.z === cell.pos.z;

  const isCurrentSpot =
    activeSpot.x === cell.pos.x && activeSpot.y === cell.pos.y;

  const isBorderTop = cell.pos.x !== 0 && cell.pos.x % 3 === 0;
  const isBorderLeft = cell.pos.y !== 0 && cell.pos.y % 3 === 0;

  const completedRow = board[cell.pos.x].every(
    tile => tile.correct === tile.value
  );

  const completedCol = matrixArray(board)[cell.pos.y].every(
    tile => tile.correct === tile.value
  );

  const completedSquare = squareBoard(board)[cell.pos.z].every(
    tile => tile.correct === tile.value
  );

  const completedSudoku = isWin;

  // todo Repair animation

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
      className={`${completedRow ? "completedRow" : ""} ${
        completedCol ? "completedCol" : ""
      } ${completedSquare ? "completedSquare" : ""} ${
        completedSudoku ? "completedSudoku" : ""
      }
      `}
    >
      {cell.value ? cell.value : ""}
    </S.Cell>
  );
};

export default Cell;
