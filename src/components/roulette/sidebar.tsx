import { useEffect, useState, useRef } from 'react';
import { Shuffle, Play, X, Trash2 } from 'lucide-react';

const ITEM_HEIGHT = 80;
const VISIBLE_ITEMS = 5;

type Game = { id: string | number; name: string };

type Props = {
  games: Game[];
  onSpin?: (winner: Game) => void;
  onRemoveGame: (id: Game['id']) => void;
};

export function RouletteSidebar({ games, onSpin, onRemoveGame }: Props) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [spinDuration, setSpinDuration] = useState(4);
  const [removeAfterSpin, setRemoveAfterSpin] = useState(false);
  
  const [offset, setOffset] = useState(0);
  const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Cria lista com repetições para efeito infinito
  const repeatedGames = games.length > 0 ? [...games, ...games, ...games, ...games] : [];
  const centerPosition = games.length * ITEM_HEIGHT;

  // Posiciona no centro quando games mudam
  useEffect(() => {
    if (games.length > 0) {
      setOffset(-centerPosition + (VISIBLE_ITEMS * ITEM_HEIGHT) / 2 - ITEM_HEIGHT / 2);
    }
  }, [games.length, centerPosition]);

  useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current);
    };
  }, []);

  function handleSpin() {
    if (games.length === 0 || isSpinning) return;

    setIsSpinning(true);
    setShowResult(false);

    // Escolhe vencedor
    const winnerIndex = Math.floor(Math.random() * games.length);
    
    // Calcula posição final: 3 voltas + posição do vencedor centralizada
    const spins = 3;
    const totalSpinDistance = spins * games.length * ITEM_HEIGHT;
    const winnerOffset = winnerIndex * ITEM_HEIGHT;
    const centeringOffset = (VISIBLE_ITEMS * ITEM_HEIGHT) / 2 - ITEM_HEIGHT / 2;
    const finalOffset = -centerPosition - totalSpinDistance - winnerOffset + centeringOffset;

    setOffset(finalOffset);

    spinTimeoutRef.current = setTimeout(() => {
      const winner = games[winnerIndex];
      setSelectedGame(winner);
      onSpin?.(winner);
      setIsSpinning(false);
      setShowResult(true);
    }, spinDuration * 1000);
  }

  function handleCloseResult() {
    setShowResult(false);
    
    if (removeAfterSpin && selectedGame) {
      onRemoveGame(selectedGame.id);
    }
    
    // Volta para posição central
    setTimeout(() => {
      if (games.length > 0) {
        setOffset(-centerPosition + (VISIBLE_ITEMS * ITEM_HEIGHT) / 2 - ITEM_HEIGHT / 2);
      }
    }, 100);
  }

  function resetSpin() {
    setSelectedGame(null);
    setShowResult(false);
    if (games.length > 0) {
      setOffset(-centerPosition + (VISIBLE_ITEMS * ITEM_HEIGHT) / 2 - ITEM_HEIGHT / 2);
    }
  }

  return (
    <>
      {/* Tela de giro - minimalista */}
      {isSpinning && (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">
              Girando a Roleta
            </h2>

            <div className="relative w-full max-w-md mx-auto">
              {/* Indicador central */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-8 z-10">
                <div className="w-4 h-4 bg-red-500 rotate-45"></div>
              </div>
              
              <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-8 z-10">
                <div className="w-4 h-4 bg-red-500 rotate-45"></div>
              </div>

              {/* Container da roleta */}
              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg overflow-hidden">
                {/* Linha central */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t-2 border-red-500 z-10 pointer-events-none"></div>
                
                {/* Lista de itens */}
                <div className="h-80 overflow-hidden relative">
                  <div
                    className="absolute w-full"
                    style={{
                      transform: `translateY(${offset}px)`,
                      transition: isSpinning ? `transform ${spinDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)` : 'none'
                    }}
                  >
                    {repeatedGames.map((game, index) => (
                      <div
                        key={`${game.id}-${index}`}
                        className="h-20 flex items-center justify-center px-4 border-b border-gray-200 bg-white"
                      >
                        <span className="text-lg font-medium text-gray-800 truncate">
                          {game.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mt-6">
              {games.length} {games.length === 1 ? 'jogo' : 'jogos'}
            </p>
          </div>
        </div>
      )}

      {/* Modal de resultado */}
      {showResult && selectedGame && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={handleCloseResult}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Resultado
              </h3>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <Play className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <p className="text-xl font-semibold text-gray-800">
                  {selectedGame.name}
                </p>
              </div>

              {removeAfterSpin && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                  Este jogo será removido da lista
                </div>
              )}

              <button
                onClick={handleCloseResult}
                className="w-full py-2 bg-gray-800 text-white font-medium rounded hover:bg-gray-700 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg flex flex-col z-40">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Roleta de Jogos
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {games.length === 0 ? (
            <div className="text-center py-8">
              <Shuffle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">
                Nenhum jogo adicionado
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                {/* Configurações */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duração (segundos)
                    </label>
                    <input
                      type="number"
                      min={2}
                      max={8}
                      value={spinDuration}
                      onChange={(e) => setSpinDuration(Math.max(2, Math.min(8, parseInt(e.target.value) || 4)))}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={removeAfterSpin}
                      onChange={(e) => setRemoveAfterSpin(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">
                      Remover após sorteio
                    </span>
                  </label>
                </div>

                {/* Último resultado */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  {selectedGame ? (
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Último sorteado:</p>
                      <p className="font-medium text-gray-800">{selectedGame.name}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Pronto para girar</p>
                    </div>
                  )}
                </div>

                {/* Botão principal */}
                <button
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className="w-full py-3 bg-gray-800 text-white font-medium rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSpinning ? 'Girando...' : 'Girar Roleta'}
                </button>

                {selectedGame && !isSpinning && (
                  <button
                    onClick={resetSpin}
                    className="w-full mt-2 py-2 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Limpar resultado
                  </button>
                )}
              </div>

              {/* Lista de jogos */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Jogos ({games.length})
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {games.map((game) => (
                    <div
                      key={game.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded border hover:bg-gray-100 group"
                    >
                      <span className="text-sm text-gray-800 truncate flex-1">
                        {game.name}
                      </span>
                      <button
                        onClick={() => onRemoveGame(game.id)}
                        className="text-xs text-red-600 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                        aria-label="Remover jogo"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
