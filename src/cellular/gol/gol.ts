interface IGameOfLifeStrategy {
  getName(): string;
  computeNextGeneration(grid: boolean[][]): boolean[][];
}

class GameOfLife {
  private grid: boolean[][];
  private strategy: IGameOfLifeStrategy;
  private rows: number;
  private cols: number;

  constructor(rows: number, cols: number, strategy: IGameOfLifeStrategy) {
    this.grid = Array.from({ length: rows }, () => Array(cols).fill(false));
    this.strategy = strategy;
    this.rows = rows;
    this.cols = cols;
  }

  setCell(row: number, col: number, alive: boolean): void {
    if (this.isValidCell(row, col)) {
      this.grid[row][col] = alive;
    }
  }

  getCell(row: number, col: number): boolean {
    return this.isValidCell(row, col) ? this.grid[row][col] : false;
  }

  getState(): boolean[][] {
    return this.grid.map(row => [...row]);
  }

  nextGeneration(): void {
    this.grid = this.strategy.computeNextGeneration(this.grid);
  }

  reset(): void {
    this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));
  }

  insert(
    startRow: number,
    startCol: number,
    content: boolean[][]): void {
    for (let i = 0; i < content.length; i++) {
      for (let j = 0; j < content[i].length; j++) {
        const row = startRow + i;
        const col = startCol + j;
        if (this.isValidCell(row, col)) {
          this.grid[row][col] = content[i][j];
        }
      }
    }
  }

  printGrid(): void {
    console.clear();
    this.grid.forEach(row => {
      console.log(row.map(cell => (cell ? '█' : ' ')).join(''));
    });
  }

  private isValidCell(row: number, col: number): boolean {
    return row >= 0 && row < this.grid.length && col >= 0 && col < this.grid[0].length;
  }
}

export { GameOfLife, IGameOfLifeStrategy };