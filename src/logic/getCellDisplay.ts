import type { Cell } from "../types/game";

export type CellDisplay =
  | { type: "empty" }
  | { type: "flag" }
  | { type: "mine" }
  | { type: "number"; value: number }
  | { type: "debug"; value: string };

export function getCellDisplay(cell: Cell, debug: boolean): CellDisplay {
  // 未開封 + 旗
  if (!cell.isOpen && cell.isFlagged) {
    return { type: "flag" };
  }

  // 開封済み
  if (cell.isOpen) {
    if (cell.isMine) {
      return { type: "mine" };
    }
    if (cell.adjacentMines > 0) {
      return { type: "number", value: cell.adjacentMines };
    }
    return { type: "empty" };
  }

  // デバッグ表示
  if (debug) {
    return cell.isMine
      ? { type: "debug", value: "💣" }
      : { type: "debug", value: String(cell.adjacentMines) };
  }

  return { type: "empty" };
}
