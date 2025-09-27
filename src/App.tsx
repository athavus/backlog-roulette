import { useState } from 'react';
import { GameSearchInput } from './components/game-search-input';
import { GameModal } from './components/game-modal';
import { RouletteSidebar } from './components/roulette/sidebar';
import { BacklogTitle } from './components/title/index.tsx'
import { useRoulette } from './hooks/use-roulette';
import type { Game } from './types/game-input';

function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    games: rouletteGames,
    addGame,
    removeGame,
    isGameInRoulette,
    spinRoulette
  } = useRoulette();

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  const handleToggleRoulette = (game: { id: number; name: string }) => {
    if (isGameInRoulette(game.id)) {
      removeGame(game.id);
    } else {
      addGame(game);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex p-4">
      {/* Área principal centralizada */}
      <div className="flex-1 flex flex-col items-center justify-center pr-80">
        <BacklogTitle />

        {/* Input de busca */}
        <div className="w-full max-w-2xl mt-[1%] ml-[13%]">
          <GameSearchInput
            onGameSelect={handleGameSelect}
            placeholder="Digite o nome do jogo que você procura..."
            className="w-full outline-none"
          />
        </div>
      </div>

      {/* Modal do Jogo */}
      <GameModal
        game={selectedGame}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onToggleRoulette={handleToggleRoulette}
        isInRoulette={selectedGame ? isGameInRoulette(selectedGame.id) : false}
      />

      {/* Sidebar fixa da Roleta */}
      <RouletteSidebar
        games={rouletteGames}
        onSpin={spinRoulette}
        onRemoveGame={removeGame}
      />
    </div>
  );
}

export default App;
