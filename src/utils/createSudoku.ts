import _ from "lodash";
import { SudokuField } from "../types";

const POSIBILITIES = Object.freeze([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const SAFE_NUMBER = 100;

const hasEmptySpots = (board: number[][]) =>
    board.some(row => row.some(cell => cell === 0));

export const calculateSquareIdx = (x: number, y: number): number => {
    const heightIdx = Math.floor(x / 3) * 3;
    const widthIdx = Math.floor(y / 3);

    return heightIdx + widthIdx;
};

export const matrixArray = (board: number[][]): number[][] =>
    board[0].map((_, colIdx) => board.map(row => row[colIdx]));

export const squareBoard = (board: number[][]) => {
    const newBoard: number[][] = [];

    for (let c = 0; c < 3; c++) {
        for (let r = 0; r < 3; r++) {
            const row: number[] = [];

            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < 3; y++) {
                    row.push(board[(c % 3) * 3 + x][(r % 3) * 3 + y]);
                }
            }
            newBoard.push(row);
        }
    }
    return newBoard;
};

const getPosibilities = (board: number[][], x: number, y: number): number[] => {
    const resolvingBoard = _.cloneDeep(board);
    const z = calculateSquareIdx(x, y);

    const allHorizontals = resolvingBoard[x].filter(Boolean);
    const allVerticals = matrixArray(resolvingBoard)[y].filter(Boolean);
    const allSquares = squareBoard(resolvingBoard)[z].filter(Boolean);

    const uniq = _.uniq([...allHorizontals, ...allVerticals, ...allSquares]);

    return POSIBILITIES.filter(num => !uniq.includes(num));
};

const fillingBoard = (board: number[][]): number[][] => {
    const resolvingBoard = _.cloneDeep(board);

    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[0].length; y++) {
            if (board[x][y] !== 0) {
                continue;
            }

            const posibilities = getPosibilities(resolvingBoard, x, y);

            if (_.size(posibilities) === 1) {
                resolvingBoard[x][y] = _.head(posibilities)!;
            }
        }
    }
    return resolvingBoard;
};

export const resolvingSudoku = (board: number[][]): number[][] => {
    let resolved = fillingBoard(board);
    let fuse = 0;

    while (hasEmptySpots(resolved) && fuse < SAFE_NUMBER) {
        resolved = fillingBoard(resolved);
        // console.log(fuse);

        fuse++;
    }

    if (hasEmptySpots(resolved)) {
        throw Error("Too hard for me.");
    }

    return resolved;
};

export const getPlayableBoard = (
    board: number[][],
    resolvedBoard: number[][]
): SudokuField[][] => {
    const cloned = _.cloneDeep(board);

    const playableBoard = cloned.map((row, x) =>
        row.map((value, y) => ({
            value,
            x,
            y,
            readOnly: value !== 0,
            correct: value !== 0 ? value : resolvedBoard[x][y],
        }))
    );
    return playableBoard;
};