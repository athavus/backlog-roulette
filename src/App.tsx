import { GameSearchInput } from './components/game-search-input';
import type { Game } from './types/game';

function App() {
  const handleGameSelect = (game: Game) => {
    console.log('Jogo selecionado:', game);
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
    </div>
  );
}

export default App;