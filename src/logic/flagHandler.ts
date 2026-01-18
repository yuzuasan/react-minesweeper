import type { Board } from "../types/game";

/**
 * 指定したマスの旗をトグルする
 */
export function toggleFlag(
  board: Board,
  remainingMines: number,
  x: number,
  y: number,
): {
  board: Board;
  remainingMines: number;
} {
  // 範囲外チェック
  if (x < 0 || x >= board.width || y < 0 || y >= board.height) {
    return { board, remainingMines };
  }

  const cell = board.cells[y][x];

  // すでに開いているマスは何もしない
  if (cell.isOpen) {
    return { board, remainingMines };
  }

  // ★ board をコピー
  const newCells = board.cells.map((row) => row.map((c) => ({ ...c })));

  const target = newCells[y][x];

  // 旗が立っている場合は解除
  if (target.isFlagged) {
    target.isFlagged = false;
    return {
      board: { ...board, cells: newCells },
      remainingMines: remainingMines + 1,
    };
  }

  // 旗が立っていない場合は設置（上限チェック）
  if (remainingMines <= 0) {
    return { board, remainingMines };
  }

  target.isFlagged = true;

  return {
    board: { ...board, cells: newCells },
    remainingMines: remainingMines - 1,
  };
}
