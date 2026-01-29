import { useState } from "react";
import styles from "./App.module.css";
import { DifficultySelector } from "./components/DifficultySelector/DifficultySelector";
import { GameBoard } from "./components/GameBoard/GameBoard";
import { GameResultOverlay } from "./components/GameResultOverlay/GameResultOverlay";
import { Header } from "./components/Header/Header";
import { HighScoreDialog } from "./components/HighScoreDialog/HighScoreDialog";
import { DEBUG_MODE } from "./constants/debug";
import { useGame } from "./hooks/useGame";

function App() {
  const {
    gameState,
    isNewRecord,
    isGameFinished,
    openCell,
    toggleFlag,
    restart,
    setDifficulty,
    toggleDebug,
  } = useGame();

  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);
  const [isHighScoreOpen, setIsHighScoreOpen] = useState(false);

  return (
    <div
      className={gameState.debug ? "debug-mode" : ""}
      style={{ display: "inline-block" }}
    >
      <Header
        remainingMines={gameState.remainingMines}
        elapsedTime={gameState.elapsedTime}
        gameStatus={gameState.gameStatus}
        onRestart={restart}
        onOpenDifficulty={() => setIsDifficultyOpen(true)}
        onOpenHighScore={() => setIsHighScoreOpen(true)}
        debug={gameState.debug}
        onToggleDebug={toggleDebug}
        showDebugButton={DEBUG_MODE}
      />

      <GameBoard
        board={gameState.board}
        onOpenCell={openCell}
        onToggleFlag={toggleFlag}
        disabled={isGameFinished}
        debug={gameState.debug}
      />

      {isHighScoreOpen && (
        <HighScoreDialog onClose={() => setIsHighScoreOpen(false)} />
      )}

      {isDifficultyOpen && (
        <DifficultySelector
          key={gameState.setting.type}
          current={gameState.setting}
          onSelect={(setting) => {
            setDifficulty(setting);
            setIsDifficultyOpen(false);
          }}
          onClose={() => setIsDifficultyOpen(false)}
        />
      )}

      <GameResultOverlay
        status={gameState.gameStatus}
        isNewRecord={isNewRecord}
        onRestart={restart}
      />

      {gameState.debug && (
        <div className={styles.panel}>
          status: {gameState.gameStatus}
          <br />
          mines: {gameState.remainingMines}
          <br />
          time: {gameState.elapsedTime}s
        </div>
      )}
    </div>
  );
}

export default App;
