export type GameStatus = "ready" | "playing" | "clear" | "gameover";

export type Cell = {
  readonly x: number;
  readonly y: number;
  isMine: boolean;
  isOpen: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

export type Board = {
  readonly width: number;
  readonly height: number;
  readonly mineCount: number;
  cells: Cell[][];
};

export type DifficultyType = "easy" | "normal" | "hard" | "custom";

export type DifficultySetting = {
  readonly type: DifficultyType;
  readonly width: number;
  readonly height: number;
  readonly mineCount: number;
};

export type GameState = {
  board: Board;
  gameStatus: GameStatus;
  difficulty: DifficultyType;
  setting: DifficultySetting;
  remainingMines: number;
  elapsedTime: number;
  debug: boolean;
};
