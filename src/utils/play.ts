import _ from "lodash"
import { Arrow, Coords, Indexes, SudokuField } from "../types";
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
