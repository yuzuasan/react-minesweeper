import { useState } from "react";
import { GameBoard } from "./components/GameBoard/GameBoard";
import { DIFFICULTY_SETTINGS } from "./constants/difficulties";
import { initializeGameState } from "./logic/gameInitializer";
import { openCell } from "./logic/openCell";
import type { GameState } from "./types/game";

const initialState = initializeGameState(DIFFICULTY_SETTINGS.easy);

function App() {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const handleOpenCell = (x: number, y: number) => {
    setGameState((prev) => {
      const newBoard = openCell(prev.board, x, y);

      return {
        ...prev,
        board: newBoard,
      };
    });
  };

  return (
    <div>
      <GameBoard board={gameState.board} onOpenCell={handleOpenCell} />
    </div>
  );
}

export default App;
