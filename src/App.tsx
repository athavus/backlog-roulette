import { useState } from 'react';
import { GameSearchInput } from './components/game-search-input';
import { GameModal } from './components/game-modal';
import { RouletteModal } from './components/roulette/modal';
import { RouletteButton } from './components/roulette/button';
import { useRoulette } from './hooks/use-roulette';
import type { Game } from './types/game-input';

function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRouletteModalOpen, setIsRouletteModalOpen] = useState(false);
  
  const {
    games: rouletteGames,
    addGame,
    removeGame,
    isGameInRoulette,
    spinRoulette,
    totalGames
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

  const handleOpenRouletteModal = () => {
    setIsRouletteModalOpen(true);
  };

  const handleCloseRouletteModal = () => {
    setIsRouletteModalOpen(false);
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
      
      {/* Modal do Jogo */}
      <GameModal
        game={selectedGame}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onToggleRoulette={handleToggleRoulette}
        isInRoulette={selectedGame ? isGameInRoulette(selectedGame.id) : false}
      />

      {/* Botão da Roleta - Só aparece se tiver jogos */}
      {totalGames > 0 && (
        <RouletteButton 
          gameCount={totalGames}
          onClick={handleOpenRouletteModal}
        />
      )}

      {/* Modal da Roleta */}
      <RouletteModal
        isOpen={isRouletteModalOpen}
        onClose={handleCloseRouletteModal}
        games={rouletteGames}
        onSpin={spinRoulette}
        onRemoveGame={removeGame}
      />
    </div>
  );
}

export default App;
