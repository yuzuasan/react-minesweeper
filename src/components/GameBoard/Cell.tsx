import { useRef } from "react";
import type { Cell as CellType } from "../../types/game";
import styles from "./Cell.module.css";

type Props = {
  cell: CellType;
  onOpen: (x: number, y: number) => void;
  onToggleFlag: (x: number, y: number) => void;
};

export const Cell = ({ cell, onOpen, onToggleFlag }: Props) => {
  const touchTimerRef = useRef<number | null>(null);
  const longPressFiredRef = useRef(false);

  let content = "";

  if (cell.isOpen) {
    if (cell.isMine) {
      content = "💣";
    } else if (cell.adjacentMines > 0) {
      content = String(cell.adjacentMines);
    }
  } else if (cell.isFlagged) {
    content = "🚩";
  }

  // ------------------------
  // マウス（PC）
  // ------------------------
  const handleClick = () => {
    // タッチ長押し後の click を無効化
    if (longPressFiredRef.current) {
      longPressFiredRef.current = false;
      return;
    }

    if (cell.isOpen || cell.isFlagged) return;
    onOpen(cell.x, cell.y);
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault(); // ブラウザのコンテキストメニューを抑制
    if (cell.isOpen) return;
    onToggleFlag(cell.x, cell.y);
  };

  // ------------------------
  // タッチ（スマホ）
  // ------------------------
  const handleTouchStart = () => {
    if (cell.isOpen) return;

    longPressFiredRef.current = false;

    touchTimerRef.current = window.setTimeout(() => {
      onToggleFlag(cell.x, cell.y);
      longPressFiredRef.current = true;
      touchTimerRef.current = null;
    }, 500);
  };

  const handleTouchEnd = () => {
    if (touchTimerRef.current !== null) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = null;
    }
  };

  return (
    <div
      className={`${styles.cell} ${cell.isOpen ? styles.open : styles.closed}`}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {content}
    </div>
  );
};
