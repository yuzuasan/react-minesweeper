import { DIFFICULTY_SETTINGS } from "../../constants/difficulties";
import type { DifficultySetting } from "../../types/game";
import styles from "./DifficultySelector.module.css";

type Props = {
  current: DifficultySetting;
  onSelect: (setting: DifficultySetting) => void;
  onClose: () => void;
};

export const DifficultySelector = ({ current, onSelect, onClose }: Props) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <h2>難易度選択</h2>

        <ul className={styles.list}>
          {Object.values(DIFFICULTY_SETTINGS).map((setting) => (
            <li key={setting.type}>
              <button
                className={setting.type === current.type ? styles.active : ""}
                onClick={() => onSelect(setting)}
              >
                {setting.type.toUpperCase()}
                <span className={styles.detail}>
                  {setting.width}×{setting.height} / 💣{setting.mineCount}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <button className={styles.close} onClick={onClose}>
          閉じる
        </button>
      </div>
    </div>
  );
};
