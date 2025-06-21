import { IGameOfLifeStrategy } from "./gol";

class GoLTorusStrategy implements IGameOfLifeStrategy {
    getName(): string {
        return "Torus";
    }

    computeNextGeneration(grid: boolean[][]): boolean[][] {
        const rows = grid.length;
        const cols = grid[0].length;
        const nextGrid = Array.from({ length: rows }, () => Array(cols).fill(false));

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const aliveNeighbors = this.countAliveNeighbors(grid, row, col);
                nextGrid[row][col] = computeNextCellState(grid[row][col], aliveNeighbors);
            }
        }
        return nextGrid;
    }

    private countAliveNeighbors(grid: boolean[][], row: number, col: number): number {
        const rows = grid.length;
        const cols = grid[0].length;
        let aliveCount = 0;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue; // Skip the cell itself
                const neighborRow = (row + i + rows) % rows; // Wrap around vertically
                const neighborCol = (col + j + cols) % cols; // Wrap around horizontally

                if (grid[neighborRow][neighborCol]) {
                    aliveCount++;
                }
            }
        }

        return aliveCount;
    }
}

function computeNextCellState(
    currentState: boolean,
    aliveNeighbors: number
): boolean {
    if (currentState) {
        return aliveNeighbors === 2 || aliveNeighbors === 3;
    } else {
        return aliveNeighbors === 3;
    }
}

export { GoLTorusStrategy };
