import type { DifficultySetting } from "../types/game";

export const DIFFICULTY_SETTINGS: Record<
  "easy" | "normal" | "hard",
  DifficultySetting
> = {
  easy: {
    type: "easy",
    width: 9,
    height: 9,
    mineCount: 10,
  },
  normal: {
    type: "normal",
    width: 16,
    height: 16,
    mineCount: 40,
  },
  hard: {
    type: "hard",
    width: 30,
    height: 16,
    mineCount: 99,
  },
};
