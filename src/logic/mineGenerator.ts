import type { Board } from "../types/game";
import { DIRECTIONS_8 } from "./directions";

/**
 * 地雷をランダムに配置する
 */
export function placeMines(board: Board): Board {
  const { width, height, mineCount } = board;
  const totalCells = width * height;

  if (mineCount >= totalCells) {
    throw new Error("mineCount must be less than total number of cells");
  }

  // 0 ～ totalCells-1 のインデックス配列を作成
  const indices = Array.from({ length: totalCells }, (_, i) => i);

  // シャッフル（Fisher–Yates）
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // 先頭 mineCount 個を地雷として使用
  for (let i = 0; i < mineCount; i++) {
    const index = indices[i];
    const x = index % width;
    const y = Math.floor(index / width);

    board.cells[y][x].isMine = true;
  }

  return board;
}

/**
 * 各マスの周囲地雷数を計算する
 */
export function calculateAdjacentMines(board: Board): Board {
  for (let y = 0; y < board.height; y++) {
    for (let x = 0; x < board.width; x++) {
      const cell = board.cells[y][x];

      if (cell.isMine) {
        cell.adjacentMines = 0;
        continue;
      }

      let count = 0;

      for (const [dx, dy] of DIRECTIONS_8) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx >= 0 && nx < board.width && ny >= 0 && ny < board.height) {
          if (board.cells[ny][nx].isMine) {
            count++;
          }
        }
      }

      cell.adjacentMines = count;
    }
  }

  return board;
}
