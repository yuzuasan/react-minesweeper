import type { Board } from "../types/game";
import { DIRECTIONS_8 } from "./directions";

/**
 * 地雷をランダムに配置する
 */
export function placeMines(board: Board): Board {
  const { width, height, mineCount, cells } = board;
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
  const mineSet = new Set<number>(indices.slice(0, mineCount));

  const newCells = cells.map((row, y) =>
    row.map((cell, x) => {
      const index = y * width + x;
      return {
        ...cell,
        isMine: mineSet.has(index),
      };
    }),
  );

  return {
    ...board,
    cells: newCells,
  };
}

/**
 * 各マスの周囲地雷数を計算する
 */
export function calculateAdjacentMines(board: Board): Board {
  const { width, height, cells } = board;

  const newCells = cells.map((row, y) =>
    row.map((cell, x) => {
      if (cell.isMine) {
        return {
          ...cell,
          adjacentMines: 0,
        };
      }

      let count = 0;

      for (const [dx, dy] of DIRECTIONS_8) {
        const nx = x + dx;
        const ny = y + dy;

        if (
          nx >= 0 &&
          nx < width &&
          ny >= 0 &&
          ny < height &&
          cells[ny][nx].isMine
        ) {
          count++;
        }
      }

      return {
        ...cell,
        adjacentMines: count,
      };
    }),
  );

  return {
    ...board,
    cells: newCells,
  };
}
