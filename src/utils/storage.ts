import type { HighScoreData } from "../types/score";

const HIGH_SCORE_KEY = "minesweeper_high_scores";

export const createInitialHighScores = (): HighScoreData => ({
  easy: null,
  normal: null,
  hard: null,
});

export const loadHighScores = (): HighScoreData => {
  try {
    const raw = localStorage.getItem(HIGH_SCORE_KEY);
    if (!raw) return createInitialHighScores();

    const parsed = JSON.parse(raw);

    if (
      typeof parsed.easy !== "undefined" &&
      typeof parsed.normal !== "undefined" &&
      typeof parsed.hard !== "undefined"
    ) {
      return parsed as HighScoreData;
    }
  } catch {
    // 何もしない
  }

  return createInitialHighScores();
};

export const saveHighScores = (scores: HighScoreData): void => {
  try {
    localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(scores));
  } catch {
    // 失敗時は無視
  }
};
