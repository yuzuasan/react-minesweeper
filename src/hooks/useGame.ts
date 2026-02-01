import { useEffect, useState } from "react";
import { DIFFICULTY_SETTINGS } from "../constants/difficulties";
import { toggleFlag } from "../logic/flagHandler";
import { initializeGameState } from "../logic/gameInitializer";
import { judgeGameStatus } from "../logic/gameJudge";
import { openCell } from "../logic/openCell";
import type { GameState } from "../types/game";
import type { HighScoreDifficulty } from "../types/score";
import { loadHighScores, saveHighScores } from "../utils/storage";

const initialState = initializeGameState(DIFFICULTY_SETTINGS.easy);

export function useGame() {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [isNewRecord, setIsNewRecord] = useState(false);

  const isGameFinished =
    gameState.gameStatus === "clear" || gameState.gameStatus === "gameover";

  const open = (x: number, y: number) => {
    setGameState((prev) => {
      if (isGameFinished) return prev;

      const newCells = openCell(prev.board.cells, x, y);
      const status = judgeGameStatus(newCells);

      return {
        ...prev,
        board: {
          ...prev.board,
          cells: newCells,
        },
        gameStatus:
          prev.gameStatus === "ready" && status === "playing"
            ? "playing"
            : status,
      };
    });
  };

  const toggle = (x: number, y: number) => {
    setGameState((prev) => {
      if (isGameFinished) return prev;

      const { board, remainingMines } = toggleFlag(
        prev.board,
        prev.remainingMines,
        x,
        y,
      );

      return {
        ...prev,
        board,
        remainingMines,
      };
    });
  };

  const restart = () => {
    setGameState(initializeGameState(gameState.setting));
    setIsNewRecord(false);
  };

  const setDifficulty = (setting: GameState["setting"]) => {
    setGameState(initializeGameState(setting));
    setIsNewRecord(false);
  };

  const toggleDebug = () => {
    setGameState((prev) => ({
      ...prev,
      debug: !prev.debug,
    }));
  };

  // タイマー制御
  useEffect(() => {
    if (gameState.gameStatus !== "playing") return;

    const timerId = window.setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        elapsedTime: prev.elapsedTime + 1,
      }));
    }, 1000);

    return () => clearInterval(timerId);
  }, [gameState.gameStatus]);

  // ハイスコア判定
  useEffect(() => {
    if (gameState.gameStatus !== "clear") return;
    if (gameState.difficulty === "custom") return;

    const scores = loadHighScores();
    const difficulty = gameState.difficulty as HighScoreDifficulty;
    const current = scores[difficulty];

    if (current !== null && gameState.elapsedTime >= current) {
      setIsNewRecord(false);
      return;
    }

    saveHighScores({
      ...scores,
      [difficulty]: gameState.elapsedTime,
    });

    setIsNewRecord(true);
  }, [gameState.gameStatus, gameState.difficulty, gameState.elapsedTime]);

  return {
    gameState,
    isNewRecord,
    isGameFinished,
    openCell: open,
    toggleFlag: toggle,
    restart,
    setDifficulty,
    toggleDebug,
  };
}
