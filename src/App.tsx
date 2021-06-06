import { useCallback, useEffect, useState } from "react";
import { Arrow, Index, Indexes, SudokuField } from "./types";
import Cell from "./components/Cell/Cell";
import { resolvingSudoku, getPlayableBoard } from "./utils/createSudoku";
import {
  ARROWS,
  NUMBERS,
  calculateCoords,
  isThisSpot,
  isValidField,
  getNewSpot,
  isCorrectCoords,
} from "./utils/play";

const initialBoard = [
  [4, 0, 2, 6, 3, 8, 1, 0, 0],
  [7, 8, 0, 9, 5, 0, 3, 0, 0],
  [3, 1, 0, 0, 7, 2, 5, 0, 6],

  [0, 7, 0, 1, 2, 3, 6, 5, 0],
  [8, 0, 0, 7, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 8, 0, 0, 0, 0],

  [0, 4, 3, 8, 1, 0, 0, 0, 2],
  [6, 0, 0, 0, 0, 4, 0, 1, 0],
  [1, 9, 0, 0, 0, 5, 0, 0, 7],
];

const initialIndexes = { x: 0, y: 0 } as Indexes;

const resolvedSudoku = resolvingSudoku(initialBoard);

const App = () => {
  const initialSudoku = getPlayableBoard(initialBoard, resolvedSudoku);
  const [board, setBoard] = useState<SudokuField[][]>(initialSudoku);
  const [activeSpot, setActiveSpot] = useState<Indexes>(initialIndexes);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      const { key } = e;

      if (ARROWS.includes(key as Arrow)) {
        const coords = calculateCoords(key as Arrow);
        if (!isCorrectCoords(activeSpot, coords)) {
          return;
        }

        setActiveSpot(prev => getNewSpot(prev, coords));
      } else if (NUMBERS.includes(key)) {
        if (!isValidField(board, activeSpot)) {
          return;
        }

        const value = parseInt(key, 10);

        setBoard(prev =>
          prev.map((row, x) =>
            row.map((cell, y) =>
              isThisSpot(activeSpot, x, y) ? { ...cell, value } : cell
            )
          )
        );
      }
    },
    [activeSpot, board]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => document.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  const handleClick = (x: Index, y: Index) => setActiveSpot({ x, y });

  return (
    <div>
      <div className='board'>
        {board.map((row, x) =>
          row.map((cell, y) => (
            <Cell
              key={`${x}${y}`}
              click={() => handleClick(x as Index, y as Index)}
              cell={cell}
              activeSpot={activeSpot}
              x={x}
              y={y}
            >
              {cell.value ? cell.value : ""}
            </Cell>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
