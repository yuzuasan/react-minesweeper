import type { Board } from "../types/game";
import { DIRECTIONS_8 } from "./directions";

/**
 * 指定したマスを開く
 * adjacentMines === 0 の場合は周囲を再帰的に開放する
 */
export function openCell(board: Board, x: number, y: number): Board {
  // Board を最初に clone
  const newBoard: Board = {
    ...board,
    cells: board.cells.map((row) => row.map((cell) => ({ ...cell }))),
  };

  openCellRecursive(newBoard, x, y);

  return newBoard;
}

function openCellRecursive(board: Board, x: number, y: number): void {
  // 範囲外チェック
  if (x < 0 || x >= board.width || y < 0 || y >= board.height) {
    return;
  }

  const cell = board.cells[y][x];

  // すでに開いている or 旗が立っている場合は何もしない
  if (cell.isOpen || cell.isFlagged) {
    return;
  }

  // マスを開く
  cell.isOpen = true;

  // 周囲地雷数が 0 の場合は再帰的に開放
  if (cell.adjacentMines === 0 && !cell.isMine) {
    for (const [dx, dy] of DIRECTIONS_8) {
      openCellRecursive(board, x + dx, y + dy);
    }
  }
}
