import { useState } from 'react';
import { GameSearchInput } from './components/game-search-input';
import { GameModal } from './components/game-modal';
import { RouletteSidebar } from './components/roulette/sidebar';
import { Header } from './components/Header';
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
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row pt-16">
        {/* Área principal centralizada */}
        <div className="flex-1 flex flex-col items-center justify-center lg:pr-80 px-4 sm:px-6 min-h-[calc(100vh-4rem)]">
          {/* Hero Section */}
          <div className="text-center max-w-2xl mx-auto mb-8 animate-fade-in">
            {/* ASCII Art Title with Glow */}
            <div className="mb-6 overflow-x-auto">
              <pre className="text-[5px] sm:text-[7px] md:text-[9px] lg:text-xs xl:text-sm font-mono leading-none select-none text-accent ascii-title whitespace-pre">
                {`██████╗  █████╗  ██████╗██╗  ██╗██╗      ██████╗  ██████╗ 
██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██║     ██╔═══██╗██╔════╝ 
██████╔╝███████║██║     █████╔╝ ██║     ██║   ██║██║  ███╗
██╔══██╗██╔══██║██║     ██╔═██╗ ██║     ██║   ██║██║   ██║
██████╔╝██║  ██║╚██████╗██║  ██╗███████╗╚██████╔╝╚██████╔╝
╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝ ╚═════╝  ╚═════╝ 
██████╗  ██████╗ ██╗   ██╗██╗     ███████╗████████╗████████╗███████╗
██╔══██╗██╔═══██╗██║   ██║██║     ██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝
██████╔╝██║   ██║██║   ██║██║     █████╗     ██║      ██║   █████╗  
██╔══██╗██║   ██║██║   ██║██║     ██╔══╝     ██║      ██║   ██╔══╝  
██║  ██║╚██████╔╝╚██████╔╝███████╗███████╗   ██║      ██║   ███████╗
╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝   ╚═╝      ╚═╝   ╚══════╝`}
              </pre>
            </div>

            <p className="text-text-secondary text-lg mb-2">
              Não sabe o que jogar? A roleta decide por você!
            </p>
            <p className="text-text-muted text-sm">
              Busque jogos, adicione ao backlog e deixe a sorte escolher
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full max-w-2xl px-2 sm:px-0 animate-slide-up">
            <GameSearchInput
              onGameSelect={handleGameSelect}
              placeholder="🎮 Digite o nome do jogo que você procura..."
              className="w-full"
            />
          </div>

          {/* Features hint */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>Marque como zerado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <span>Avalie seus jogos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>Gire a roleta</span>
            </div>
          </div>
        </div>
      </main>

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
