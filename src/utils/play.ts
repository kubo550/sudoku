import _ from "lodash"
import { Arrow, Coords, Indexes, SudokuField, Value } from "../types";
import { calculateSquareIdx } from "./createSudoku";

export const ARROWS: Arrow[] = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];
export const NUMBERS = [...'123456789']


export const calculateCoords = (arrow: Arrow) => {
    if (arrow === "ArrowRight") return { x: 0, y: 1 }
    else if (arrow === "ArrowLeft") return { x: 0, y: -1 }
    else if (arrow === "ArrowUp") return { x: -1, y: 0 }
    else if (arrow === "ArrowDown") return { x: 1, y: 0 }
    else return { x: 0, y: 0 }
}

export const isValidField = (board: SudokuField[][], activeIndexes: Indexes): boolean => {
    const { x, y } = activeIndexes;

    return !board[x][y].readOnly;
};

// todo refactor
export const getNewSpot = (activeSpots: Indexes, coords: Coords) => ({
    x: activeSpots.x + coords.x,
    y: activeSpots.y + coords.y,
    z: calculateSquareIdx(activeSpots.x + coords.x, activeSpots.y + coords.y)
}) as Indexes

export const isCorrectCoords = (activeSpots: Indexes, coords: Coords) => {
    const newSpot = getNewSpot(activeSpots, coords);
    return _.inRange(newSpot.x, 0, 9) && _.inRange(newSpot.y, 0, 9)
}

export const isThisSpot = (spot: Indexes, x: number, y: number): boolean =>
    spot.x === x && spot.y === y;

export const removeValue = (board: SudokuField[][], activeSpot: Indexes): SudokuField[][] => {
    const newBoard = _.cloneDeep(board);
    const { x, y } = activeSpot;
    if (newBoard[x][y].readOnly) { return board }
    newBoard[x][y].value = 0;
    return newBoard
}

export const getHint = (board: SudokuField[][], activeSpot: Indexes): SudokuField[][] => {
    const newBoard = _.cloneDeep(board);
    const { x, y } = activeSpot;

    if (newBoard[x][y].value !== 0) { return board }

    newBoard[x][y].value = newBoard[x][y].correct;
    newBoard[x][y].readOnly = true;

    return newBoard
}

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
export const calculateCompletedNums = (board: SudokuField[][]): Value[] => {
    const completedNumbers = [];

    for (let i = 1; i < 10; i++) {
        if (isAllOfNumber(i, board)) {
            completedNumbers.push(i);
        }
    }

    return completedNumbers;
};

export const isWin = (board: SudokuField[][]) => board.every(row => row.every(cell => cell.value === cell.correct))