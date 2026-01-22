import { useState } from "react";
import type { HighScoreData } from "../../types/score";
import { loadHighScores } from "../../utils/storage";
import styles from "./HighScoreDialog.module.css";

type Props = {
  onClose: () => void;
};

export const HighScoreDialog = ({ onClose }: Props) => {
  const [highScores] = useState<HighScoreData>(() => loadHighScores());

  if (!highScores) {
    return null;
  }

  const formatScore = (score: number | null) =>
    score === null ? "--" : `${score}s`;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h2 className={styles.title}>ハイスコア</h2>

        <table className={styles.table}>
          <tbody>
            <tr>
              <th>Easy</th>
              <td>{formatScore(highScores.easy)}</td>
            </tr>
            <tr>
              <th>Normal</th>
              <td>{formatScore(highScores.normal)}</td>
            </tr>
            <tr>
              <th>Hard</th>
              <td>{formatScore(highScores.hard)}</td>
            </tr>
          </tbody>
        </table>

        <button className={styles.closeButton} onClick={onClose}>
          閉じる
        </button>
      </div>
    </div>
  );
};
