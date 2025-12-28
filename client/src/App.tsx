import { useState, useEffect } from "react";
import { GameSearchInput } from "./components/game-search-input";
import { GameModal } from "./components/game-modal";
import { RouletteSidebar } from "./components/roulette/sidebar";
import { BacklogTitle } from "./components/title/index.tsx";
import { UserMenu } from "./components/auth/UserMenu";
import { AuthModal } from "./components/auth/AuthModal";
import { useRoulette } from "./hooks/use-roulette";
import { useAuth } from "./contexts/AuthContext";
import type { Game } from "./types/game-input";

function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, loading: authLoading, refreshUser } = useAuth();
  const {
    games: rouletteGames,
    addGame,
    removeGame,
    isGameInRoulette,
    spinRoulette,
  } = useRoulette();

  // Verificar callback do Google OAuth
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get("success");

    if (success === "true") {
      // Limpar a URL
      window.history.replaceState({}, document.title, window.location.pathname);
      // Atualizar o usuário
      refreshUser();
    }
  }, [refreshUser]);

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  const handleToggleRoulette = async (game: { id: number; name: string }) => {
    if (isGameInRoulette(game.id)) {
      await removeGame(game.id);
    } else {
      await addGame(game);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row p-2 sm:p-4">
      {/* Header com menu do usuário */}
      <div className="absolute top-4 left-4 z-10">
        {user ? (
          <UserMenu />
        ) : (
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Entrar
          </button>
        )}
      </div>

      {/* Área principal centralizada */}
      <div className="flex-1 flex flex-col items-center justify-center lg:pr-80 px-2 sm:px-4">
        <BacklogTitle />

        {/* Input de busca */}
        <div className="w-full max-w-2xl mt-4 sm:mt-6 lg:mt-[1%] px-2 sm:px-0">
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

      {/* Modal de Autenticação */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
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
