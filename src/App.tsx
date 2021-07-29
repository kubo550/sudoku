import { useCallback, useEffect, useState } from "react";
import { Arrow, Indexes, SudokuField, Value } from "./types";
import { Articles, Cell, Controlers, Footer, Stats } from "./components";

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
  calculateCompletedNums,
  isWin,
} from "./utils/play";
import useTimmer from "./hooks/useTimmer";

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
  const [isGameOver, setisGameOver] = useState(false);
  const { timeToDisplay, isCounting, restartCount, startCount, stopCount } =
    useTimmer();

  const hint = useCallback(() => {
    const newBoard = getHint(board, activeSpot);
    setBoard(newBoard);
    const win = isWin(newBoard);
    win && stopCount();
    setisGameOver(win);
    setHighlightedNum(board[activeSpot.x][activeSpot.y].correct);
  }, [activeSpot, board, stopCount]);

  const erase = useCallback(() => {
    setBoard(prev => removeValue(prev, activeSpot));
    setHighlightedNum(null);
  }, [activeSpot]);

  const enterNumber = useCallback(
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

      const completedNumbers = calculateCompletedNums(newBoard);
      setCompletedNums(completedNumbers);

      const win = isWin(newBoard);
      setisGameOver(win);
      win && stopCount();
    },

    [activeSpot, board, stopCount]
  );

  const newGame = () => {
    // todo randomize new boards
    const initialSudoku = getPlayableBoard(initialBoard, resolvedSudoku);
    setBoard(initialSudoku);
    setActiveSpot(initialIndexes);
    setHighlightedNum(null);
    restartCount();
    setisGameOver(false);
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
        enterNumber(+key);
      } else if (e.key === "Backspace") {
        erase();
      } else if (e.key === "h") {
        hint();
      }
    },
    [activeSpot, board, erase, hint, enterNumber]
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
    <div>
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
                  isWin={isGameOver}
                >
                  {cell.value ? cell.value : ""}
                </Cell>
              ))
            )}
          </div>
          <Controlers
            erase={erase}
            hint={hint}
            typeNumber={enterNumber}
            newGame={newGame}
            completedNums={completedNums}
            isWin={isGameOver}
          />
        </div>
        <Articles />
      </div>
      <Footer />
    </div>
  );
};

export default App;
