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
};

export const Header = ({
  remainingMines,
  elapsedTime,
  gameStatus,
  onRestart,
}: Props) => {
  return (
    <div className={styles.header}>
      <MineCounter remainingMines={remainingMines} />
      <RestartButton gameStatus={gameStatus} onRestart={onRestart} />
      <Timer elapsedTime={elapsedTime} />
    </div>
  );
};
