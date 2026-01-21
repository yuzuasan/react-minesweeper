import { useEffect, useState } from "react";
import { DifficultySelector } from "./components/DifficultySelector/DifficultySelector";
import { GameBoard } from "./components/GameBoard/GameBoard";
import { GameResultOverlay } from "./components/GameResultOverlay/GameResultOverlay";
import { Header } from "./components/Header/Header";
import { DIFFICULTY_SETTINGS } from "./constants/difficulties";
import { toggleFlag } from "./logic/flagHandler";
import { initializeGameState } from "./logic/gameInitializer";
import { judgeGameStatus } from "./logic/gameJudge";
import { openCell } from "./logic/openCell";
import type { GameState } from "./types/game";

const initialState = initializeGameState(DIFFICULTY_SETTINGS.easy);

function App() {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);
  const isGameFinished =
    gameState.gameStatus === "clear" || gameState.gameStatus === "gameover";

  const handleOpenCell = (x: number, y: number) => {
    setGameState((prev) => {
      // 終了後は操作不可
      if (prev.gameStatus === "clear" || prev.gameStatus === "gameover") {
        return prev;
      }

      const board = openCell(prev.board, x, y);
      const status = judgeGameStatus(board);

      return {
        ...prev,
        board,
        gameStatus:
          prev.gameStatus === "ready" && status === "playing"
            ? "playing"
            : status,
      };
    });
  };

  const handleToggleFlag = (x: number, y: number) => {
    setGameState((prev) => {
      if (prev.gameStatus === "clear" || prev.gameStatus === "gameover") {
        return prev;
      }

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

  const handleRestart = () => {
    setGameState(initializeGameState(gameState.setting));
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

    return () => {
      clearInterval(timerId);
    };
  }, [gameState.gameStatus]);

  return (
    <div style={{ display: "inline-block" }}>
      <Header
        remainingMines={gameState.remainingMines}
        elapsedTime={gameState.elapsedTime}
        gameStatus={gameState.gameStatus}
        onRestart={handleRestart}
        onOpenDifficulty={() => setIsDifficultyOpen(true)}
      />

      <GameBoard
        board={gameState.board}
        onOpenCell={handleOpenCell}
        onToggleFlag={handleToggleFlag}
        disabled={isGameFinished}
      />

      {isDifficultyOpen && (
        <DifficultySelector
          key={gameState.setting.type}
          current={gameState.setting}
          onSelect={(setting) => {
            setGameState(initializeGameState(setting));
            setIsDifficultyOpen(false);
          }}
          onClose={() => setIsDifficultyOpen(false)}
        />
      )}

      <GameResultOverlay
        status={gameState.gameStatus}
        onRestart={handleRestart}
      />
    </div>
  );
}

export default App;
