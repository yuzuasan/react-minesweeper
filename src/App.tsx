import { useState } from "react";
import { GameBoard } from "./components/GameBoard/GameBoard";
import { DIFFICULTY_SETTINGS } from "./constants/difficulties";
import { toggleFlag } from "./logic/flagHandler";
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

  const handleToggleFlag = (x: number, y: number) => {
    setGameState((prev) => {
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

  return (
    <div>
      <GameBoard
        board={gameState.board}
        onOpenCell={handleOpenCell}
        onToggleFlag={handleToggleFlag}
      />
    </div>
  );
}

export default App;
