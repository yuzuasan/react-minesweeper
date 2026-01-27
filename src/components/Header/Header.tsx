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
  onOpenHighScore: () => void;
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
  onOpenHighScore,
  onToggleDebug,
  showDebugButton,
}: Props) => {
  return (
    <div className={styles.header}>
      {/* 上段：ゲーム情報 */}
      <div className={styles.top}>
        <button
          className={styles.highScore}
          onClick={onOpenHighScore}
          aria-label="ハイスコア表示"
        >
          🏆
        </button>

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

      <div className={styles.bottom}>
        <MineCounter remainingMines={remainingMines} />
        <RestartButton gameStatus={gameStatus} onRestart={onRestart} />
        <Timer elapsedTime={elapsedTime} />
      </div>
    </div>
  );
};
