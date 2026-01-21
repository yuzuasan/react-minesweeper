import type { GameStatus } from "../../types/game";
import styles from "./GameResultOverlay.module.css";

type Props = {
  status: GameStatus;
  onRestart: () => void;
};

export const GameResultOverlay = ({ status, onRestart }: Props) => {
  if (status !== "clear" && status !== "gameover") return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <h2>{status === "clear" ? "🎉 クリア！" : "💥 ゲームオーバー"}</h2>
        <button onClick={onRestart}>リスタート</button>
      </div>
    </div>
  );
};
