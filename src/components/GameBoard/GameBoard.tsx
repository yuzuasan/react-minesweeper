import type { Board } from "../../types/game";
import { Cell } from "./Cell";
import styles from "./GameBoard.module.css";

type Props = {
  board: Board;
  onOpenCell: (x: number, y: number) => void;
};

export const GameBoard = ({ board, onOpenCell }: Props) => {
  return (
    <div
      className={styles.board}
      style={{
        gridTemplateColumns: `repeat(${board.width}, 1fr)`,
      }}
    >
      {board.cells.map((row) =>
        row.map((cell) => (
          <Cell key={`${cell.x}-${cell.y}`} cell={cell} onOpen={onOpenCell} />
        ))
      )}
    </div>
  );
};
