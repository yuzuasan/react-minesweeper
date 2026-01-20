import type { GameStatus } from "../../types/game";
import styles from "./RestartButton.module.css";

type Props = {
  gameStatus: GameStatus;
  onRestart: () => void;
};

export const RestartButton = ({ gameStatus, onRestart }: Props) => {
  let label = "🙂";

  if (gameStatus === "clear") label = "😎";
  if (gameStatus === "gameover") label = "💀";

  return (
    <button className={styles.button} onClick={onRestart}>
      {label}
    </button>
  );
};
