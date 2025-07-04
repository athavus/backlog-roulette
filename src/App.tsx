import { useState } from 'react';
import { GameSearchInput } from './components/game-search-input';
import { GameModal } from './components/game-modal';
import type { Game } from './types/game-input';

function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <GameSearchInput
          onGameSelect={handleGameSelect}
          placeholder="Digite o nome do jogo que você procura..."
          className="mx-auto"
        />
      </div>
      
      <GameModal
        game={selectedGame}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;