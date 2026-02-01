import type { Cell } from "../types/game";

/**
 * 指定したマスの旗をトグルする
 */
export function toggleFlag(
  cells: Cell[][],
  remainingMines: number,
  x: number,
  y: number,
) {
  if (y < 0 || y >= cells.length || x < 0 || x >= cells[0].length) {
    return { cells, remainingMines };
  }

  const target = cells[y][x];

  if (target.isOpen) {
    return { cells, remainingMines };
  }

  if (!target.isFlagged && remainingMines === 0) {
    return { cells, remainingMines };
  }

  const newCells = cells.map((row, rowIndex) =>
    row.map((cell, colIndex) =>
      rowIndex === y && colIndex === x
        ? { ...cell, isFlagged: !cell.isFlagged }
        : cell,
    ),
  );

  return {
    cells: newCells,
    remainingMines: target.isFlagged ? remainingMines + 1 : remainingMines - 1,
  };
}
