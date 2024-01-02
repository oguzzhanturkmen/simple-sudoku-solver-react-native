
export default class SudokuSolver {
    constructor(board) {
        this.board = board;
        this.SIZE = 9;
        this.BOX_SIZE = 3;
    }

    solve() {
        if (this.solveSudoku()) {
            return this.board;
        }
        return false;
    }

    findUnassignedLocation() {
        for (let row = 0; row < this.SIZE; row++) {
            for (let col = 0; col < this.SIZE; col++) {
                if (this.board[row][col] === 0) {
                    return [row, col];
                }
            }
        }
        return null;
    }

    usedInRow(row, num) {
        for (let col = 0; col < this.SIZE; col++) {
            if (this.board[row][col] === num) {
                return true;
            }
        }
        return false;
    }

    usedInCol(col, num) {
        for (let row = 0; row < this.SIZE; row++) {
            if (this.board[row][col] === num) {
                return true;
            }
        }
        return false;
    }

    usedInBox(boxStartRow, boxStartCol, num) {
        for (let row = 0; row < this.BOX_SIZE; row++) {
            for (let col = 0; col < this.BOX_SIZE; col++) {
                if (this.board[row + boxStartRow][col + boxStartCol] === num) {
                    return true;
                }
            }
        }
        return false;
    }

    isSafe(row, col, num) {
        return !this.usedInRow(row, num) &&
               !this.usedInCol(col, num) &&
               !this.usedInBox(row - row % this.BOX_SIZE, col - col % this.BOX_SIZE, num);
    }

    solveSudoku() {
        let unassignedLocation = this.findUnassignedLocation();
        if (unassignedLocation === null) {
            return true;
        }

        let row = unassignedLocation[0];
        let col = unassignedLocation[1];

        for (let num = 1; num <= this.SIZE; num++) {
            if (this.isSafe(row, col, num)) {
                this.board[row][col] = num;

                if (this.solveSudoku()) {
                    return true;
                }

                this.board[row][col] = 0;
            }
        }
        return false;
    }
}
