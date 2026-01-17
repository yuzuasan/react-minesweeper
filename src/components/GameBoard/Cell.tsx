import type { Cell as CellType } from "../../types/game";
import styles from "./Cell.module.css";

type Props = {
  cell: CellType;
};

export const Cell = ({ cell }: Props) => {
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

  return (
    <div
      className={`${styles.cell} ${cell.isOpen ? styles.open : styles.closed}`}
    >
      {content}
    </div>
  );
};
