import type { Board } from "../../types/game";
import { Cell } from "./Cell";
import styles from "./GameBoard.module.css";

type Props = {
  board: Board;
};

export const GameBoard = ({ board }: Props) => {
  return (
    <div
      className={styles.board}
      style={{
        gridTemplateColumns: `repeat(${board.width}, 1fr)`,
      }}
    >
      {board.cells.flat().map((cell) => (
        <Cell key={`${cell.x}-${cell.y}`} cell={cell} />
      ))}
    </div>
  );
};
