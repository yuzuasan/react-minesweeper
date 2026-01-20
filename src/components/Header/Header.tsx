import type { GameStatus } from "../../types/game";
import styles from "./Header.module.css";
import { MineCounter } from "./MineCounter";
import { RestartButton } from "./RestartButton";
import { Timer } from "./Timer";

type Props = {
  remainingMines: number;
  elapsedTime: number;
  gameStatus: GameStatus;
  onRestart: () => void;
  onOpenDifficulty: () => void;
};

export const Header = ({
  remainingMines,
  elapsedTime,
  gameStatus,
  onRestart,
  onOpenDifficulty,
}: Props) => {
  return (
    <div className={styles.header}>
      <MineCounter remainingMines={remainingMines} />
      <RestartButton gameStatus={gameStatus} onRestart={onRestart} />
      <div className={styles.right}>
        <Timer elapsedTime={elapsedTime} />
        <button
          className={styles.settings}
          onClick={onOpenDifficulty}
          aria-label="難易度設定"
        >
          ⚙
        </button>
      </div>
    </div>
  );
};
