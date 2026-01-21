export type GameStatus = "ready" | "playing" | "clear" | "gameover";

export type Cell = {
  x: number;
  y: number;
  isMine: boolean;
  isOpen: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

export type Board = {
  width: number;
  height: number;
  mineCount: number;
  cells: Cell[][];
};

export type DifficultyType = "easy" | "normal" | "hard" | "custom";

export type DifficultySetting = {
  type: DifficultyType;
  width: number;
  height: number;
  mineCount: number;
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
