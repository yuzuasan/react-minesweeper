import type {
  Board,
  Cell,
  DifficultySetting,
  GameState,
  GameStatus,
} from "../types/game";
import { calculateAdjacentMines, placeMines } from "./mineGenerator";

/**
 * 空の盤面を生成する（地雷なし）
 */
export function createEmptyBoard(setting: DifficultySetting): Board {
  const cells: Cell[][] = [];

  for (let y = 0; y < setting.height; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < setting.width; x++) {
      row.push({
        x,
        y,
        isMine: false,
        isOpen: false,
        isFlagged: false,
        adjacentMines: 0,
      });
    }
    cells.push(row);
  }

  return {
    width: setting.width,
    height: setting.height,
    mineCount: setting.mineCount,
    cells,
  };
}

/**
 * ゲーム状態を初期化する
 * ・ゲーム起動時
 * ・難易度変更時
 * ・リスタート時
 * に使用される想定
 */
export function initializeGameState(setting: DifficultySetting): GameState {
  // ① 空の盤面
  const emptyBoard = createEmptyBoard(setting);

  // ② 地雷配置
  const boardWithMines = placeMines(emptyBoard);

  // ③ 周囲地雷数計算
  const completedBoard = calculateAdjacentMines(boardWithMines);

  const gameStatus: GameStatus = "ready";

  return {
    board: completedBoard,
    gameStatus,
    difficulty: setting.type,
    setting,
    remainingMines: setting.mineCount,
    elapsedTime: 0,
    debug: false,
  };
}
