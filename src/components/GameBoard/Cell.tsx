import type { Cell as CellType } from "../../types/game";
import styles from "./Cell.module.css";

type Props = {
  cell: CellType;
  onOpen: (x: number, y: number) => void;
};

export const Cell = ({ cell, onOpen }: Props) => {
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

  const handleClick = () => {
    if (cell.isOpen || cell.isFlagged) return;
    onOpen(cell.x, cell.y);
  };

  return (
    <div
      className={`${styles.cell} ${cell.isOpen ? styles.open : styles.closed}`}
      onClick={handleClick}
    >
      {content}
    </div>
  );
};
