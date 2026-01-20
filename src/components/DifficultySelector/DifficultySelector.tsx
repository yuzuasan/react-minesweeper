import { useState } from "react";
import { DIFFICULTY_SETTINGS } from "../../constants/difficulties";
import type { DifficultySetting } from "../../types/game";
import styles from "./DifficultySelector.module.css";

type Props = {
  current: DifficultySetting;
  onSelect: (setting: DifficultySetting) => void;
  onClose: () => void;
};

const WIDTH_MIN = 9;
const WIDTH_MAX = 30;
const HEIGHT_MIN = 9;
const HEIGHT_MAX = 24;
const MINES_MIN = 10;
const MINES_MAX = 668;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const DifficultySelector = ({ current, onSelect, onClose }: Props) => {
  const [customWidth, setCustomWidth] = useState(
    current.type === "custom" ? current.width : 9,
  );
  const [customHeight, setCustomHeight] = useState(
    current.type === "custom" ? current.height : 9,
  );
  const [customMines, setCustomMines] = useState(
    current.type === "custom" ? current.mineCount : 10,
  );

  const handleCustomApply = () => {
    const width = clamp(customWidth, WIDTH_MIN, WIDTH_MAX);
    const height = clamp(customHeight, HEIGHT_MIN, HEIGHT_MAX);

    const boardMaxMines = width * height - 1;
    const maxMines = Math.min(MINES_MAX, boardMaxMines);
    const mineCount = clamp(customMines, MINES_MIN, maxMines);

    onSelect({
      type: "custom",
      width,
      height,
      mineCount,
    });
  };

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

        <div className={styles.custom}>
          <h3>CUSTOM</h3>

          <label>
            幅
            <input
              type="number"
              value={customWidth}
              onChange={(e) => setCustomWidth(Number(e.target.value))}
            />
          </label>

          <label>
            高さ
            <input
              type="number"
              value={customHeight}
              onChange={(e) => setCustomHeight(Number(e.target.value))}
            />
          </label>

          <label>
            地雷
            <input
              type="number"
              value={customMines}
              onChange={(e) => setCustomMines(Number(e.target.value))}
            />
          </label>

          <button className={styles.apply} onClick={handleCustomApply}>
            適用
          </button>
        </div>

        <button className={styles.close} onClick={onClose}>
          閉じる
        </button>
      </div>
    </div>
  );
};
