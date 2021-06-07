export type Index = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type Indexes = {
    x: Index;
    y: Index;
    z: Index
};

export type Coords = {
    x: number;
    y: number;
}

export type Arrow = "ArrowRight" | "ArrowLeft" | "ArrowUp" | "ArrowDown"

export interface SudokuField {
    value: number;
    pos: Indexes;
    readOnly: boolean;
    correct: number;
}
