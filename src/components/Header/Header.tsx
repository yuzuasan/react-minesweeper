import type { GameStatus } from "../../types/game";
import styles from "./Header.module.css";
import { MineCounter } from "./MineCounter";
import { RestartButton } from "./RestartButton";
import { Timer } from "./Timer";

type Props = {
  remainingMines: number;
  elapsedTime: number;
  gameStatus: GameStatus;
  debug: boolean;
  onRestart: () => void;
  onOpenDifficulty: () => void;
  onToggleDebug: () => void;
  showDebugButton: boolean;
};

export const Header = ({
  remainingMines,
  elapsedTime,
  gameStatus,
  debug,
  onRestart,
  onOpenDifficulty,
  onToggleDebug,
  showDebugButton,
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

        {showDebugButton && (
          <button
            className={`${styles.debugButton} ${
              debug ? styles.debugButtonActive : ""
            }`}
            onClick={onToggleDebug}
          >
            🐞
          </button>
        )}
      </div>
    </div>
  );
};
