import type { DifficultyType } from "./game";

// ハイスコア対象難易度（custom は除外）
export type HighScoreDifficulty = Exclude<DifficultyType, "custom">;

export type HighScoreData = {
  easy: number | null;
  normal: number | null;
  hard: number | null;
};
