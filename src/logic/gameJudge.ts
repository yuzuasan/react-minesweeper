import type { Cell, GameStatus } from "../types/game";

/**
 * ゲーム状態を判定する
 */
export function judgeGameStatus(cells: Cell[][]): GameStatus {
  let hasOpenedMine = false;
  let unopenedSafeCellExists = false;

  for (let y = 0; y < cells.length; y++) {
    for (let x = 0; x < cells[0].length; x++) {
      const cell = cells[y][x];

      // 地雷を開いていたらゲームオーバー
      if (cell.isMine && cell.isOpen) {
        hasOpenedMine = true;
      }

      // 地雷以外で、まだ開いていないマスがあるか
      if (!cell.isMine && !cell.isOpen) {
        unopenedSafeCellExists = true;
      }
    }
  }

  // ゲームオーバー処理
  if (hasOpenedMine) {
    // すべての地雷を表示する
    for (let y = 0; y < cells.length; y++) {
      for (let x = 0; x < cells[0].length; x++) {
        const cell = cells[y][x];
        if (cell.isMine) {
          cell.isOpen = true;
        }
      }
    }
    return "gameover";
  }

  // クリア判定
  if (!unopenedSafeCellExists) {
    return "clear";
  }

  return "playing";
}
