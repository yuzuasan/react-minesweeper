import type { GameStatus } from "../../types/game";
import styles from "./GameResultOverlay.module.css";

type Props = {
  status: GameStatus;
  onRestart: () => void;
  isNewRecord?: boolean;
};

export const GameResultOverlay = ({
  status,
  onRestart,
  isNewRecord,
}: Props) => {
  if (status !== "clear" && status !== "gameover") return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <h2>{status === "clear" ? "🎉 クリア！" : "💥 ゲームオーバー"}</h2>

        {status === "clear" && isNewRecord && (
          <p className={styles.newRecord}>🏆 ハイスコア更新！</p>
        )}

        <button onClick={onRestart}>リスタート</button>
      </div>
    </div>
  );
};
