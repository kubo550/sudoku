import { useCallback, useEffect, useState } from "react";
import { Arrow, Indexes, SudokuField, Value } from "./types";
import { Articles, Cell, Controlers, Stats } from "./components";

import { resolvingSudoku, getPlayableBoard } from "./utils/createSudoku";
import {
  ARROWS,
  NUMBERS,
  calculateCoords,
  isThisSpot,
  isValidField,
  getNewSpot,
  isCorrectCoords,
  removeValue,
  getHint,
} from "./utils/play";
import useTimmer from "./components/hooks/useTimmer";

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

const initialIndexes: Indexes = { x: 0, y: 0, z: 0 };

const resolvedSudoku = resolvingSudoku(initialBoard);

const App = () => {
  const initialSudoku = getPlayableBoard(initialBoard, resolvedSudoku);
  const [board, setBoard] = useState<SudokuField[][]>(initialSudoku);
  const [activeSpot, setActiveSpot] = useState<Indexes>(initialIndexes);
  const [highlightedNum, setHighlightedNum] = useState<null | Value>(null);
  const [completedNums, setCompletedNums] = useState<Value[]>([]);
  const { timeToDisplay, isCounting, restartCount, startCount, stopCount } =
    useTimmer();

  const hint = useCallback(() => {
    setBoard(prev => getHint(prev, activeSpot));
    setHighlightedNum(board[activeSpot.x][activeSpot.y].correct);
  }, [activeSpot, board]);

  const erase = useCallback(() => {
    setBoard(prev => removeValue(prev, activeSpot));
    setHighlightedNum(null);
  }, [activeSpot]);

  const typeNumber = useCallback(
    (value: Value) => {
      if (!isValidField(board, activeSpot)) {
        return;
      }
      setHighlightedNum(value);

      const newBoard = board.map((row, x) =>
        row.map((cell, y) =>
          isThisSpot(activeSpot, x, y) ? { ...cell, value } : cell
        )
      );
      setBoard(newBoard);

      const isAllOfNumber = (num: Value, board: SudokuField[][]) => {
        let counter = 0;

        [...board].forEach(row =>
          row.forEach(cell => {
            if (cell.value === num && cell.value === cell.correct) {
              counter += 1;
            }
          })
        );

        return counter === 9;
      };
      const calculateCompletedNums = (board: SudokuField[][]): Value[] => {
        const completedNumbers = [];

        for (let i = 1; i < 10; i++) {
          if (isAllOfNumber(i, board)) {
            completedNumbers.push(i);
          }
        }

        return completedNumbers;
      };

      const completedNumbers = calculateCompletedNums(newBoard);
      setCompletedNums(completedNumbers);
    },
    [activeSpot, board]
  );

  const newGame = () => {
    // todo randomize new boards
    const initialSudoku = getPlayableBoard(initialBoard, resolvedSudoku);
    setBoard(initialSudoku);
    setActiveSpot(initialIndexes);
    setHighlightedNum(null);
    restartCount();
  };

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      const { key } = e;

      if (ARROWS.includes(key as Arrow)) {
        const coords = calculateCoords(key as Arrow);
        if (!isCorrectCoords(activeSpot, coords)) {
          return;
        }

        const newSpot = getNewSpot(activeSpot, coords);
        const { value } = board[newSpot.x][newSpot.y];

        setHighlightedNum(value ? value : null);
        setActiveSpot(newSpot);
      } else if (NUMBERS.includes(key)) {
        const value = parseInt(key, 10);

        typeNumber(value);
      } else if (e.key === "Backspace") {
        erase();
      } else if (e.key === "h") {
        hint();
      }
    },
    [activeSpot, board, erase, hint, typeNumber]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => document.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  const handleClick = (cell: SudokuField) => {
    setActiveSpot(cell.pos);
    setHighlightedNum(cell.value ? cell.value : null);
  };

  return (
    <div className='content'>
      <h2>Sudoku Game</h2>
      <Stats
        isCounting={isCounting}
        startCount={startCount}
        stopCount={stopCount}
        time={timeToDisplay}
      />
      <div className='game'>
        <div className='board'>
          {board.map((row, x) =>
            row.map((cell, y) => (
              <Cell
                key={`${x}${y}`}
                click={() => handleClick(cell)}
                cell={cell}
                activeSpot={activeSpot}
                highlightedNum={highlightedNum}
                board={board}
              >
                {cell.value ? cell.value : ""}
              </Cell>
            ))
          )}
        </div>
        <Controlers
          erase={erase}
          hint={hint}
          typeNumber={typeNumber}
          newGame={newGame}
          completedNums={completedNums}
        />
      </div>
      <Articles />
      <div className='footer'>footer here</div>
    </div>
  );
};

export default App;
