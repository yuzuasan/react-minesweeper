import type { Cell } from "../types/game";
import { DIRECTIONS_8 } from "./directions";

/**
 * 指定したマスを開く
 * adjacentMines === 0 の場合は周囲を再帰的に開放する
 */
export function openCell(cells: Cell[][], x: number, y: number): Cell[][] {
  if (y < 0 || y >= cells.length || x < 0 || x >= cells[0].length) {
    return cells;
  }

  const target = cells[y][x];
  if (target.isOpen || target.isFlagged) {
    return cells;
  }

  let newCells = openSingleCell(cells, x, y);

  if (target.isMine || target.adjacentMines !== 0) {
    return newCells;
  }

  for (const [dx, dy] of DIRECTIONS_8) {
    newCells = openCell(newCells, x + dx, y + dy);
  }

  return newCells;
}

function openSingleCell(cells: Cell[][], x: number, y: number): Cell[][] {
  return cells.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      if (rowIndex !== y || colIndex !== x) {
        return cell;
      }

      if (cell.isOpen || cell.isFlagged) {
        return cell;
      }

      return {
        ...cell,
        isOpen: true,
      };
    }),
  );
}
