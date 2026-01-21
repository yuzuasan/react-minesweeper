import type { Board } from "../../types/game";
import { Cell } from "./Cell";
import styles from "./GameBoard.module.css";

type Props = {
  board: Board;
  onOpenCell: (x: number, y: number) => void;
  onToggleFlag: (x: number, y: number) => void;
  disabled: boolean;
};

export const GameBoard = ({
  board,
  onOpenCell,
  onToggleFlag,
  disabled,
}: Props) => {
  return (
    <div
      className={styles.board}
      style={{
        gridTemplateColumns: `repeat(${board.width}, 1fr)`,
      }}
    >
      {board.cells.map((row) =>
        row.map((cell) => (
          <Cell
            key={`${cell.x}-${cell.y}`}
            cell={cell}
            onOpen={onOpenCell}
            onToggleFlag={onToggleFlag}
            disabled={disabled}
          />
        )),
      )}
    </div>
  );
};
