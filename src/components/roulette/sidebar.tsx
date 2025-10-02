import { useState, useRef } from 'react';
import { Shuffle, Play, ChevronLeft, ChevronRight, X, Sparkles, Clock, Trash2 } from 'lucide-react';

const ITEM_HEIGHT = 80; // altura em pixels de cada item
const VISIBLE_ITEMS = 5; // quantos itens são visíveis na área da roleta

export function RouletteSidebar({ games, onSpin, onRemoveGame }) {
  const [selectedGame, setSelectedGame] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [spinDuration, setSpinDuration] = useState(5);
  const [removeAfterSpin, setRemoveAfterSpin] = useState(false);

  const spinTimeout = useRef();

  function getInitialOffset() {
    // Posiciona o spinOffset para começo centralizado e visível no item zero
    return -((games.length * ITEM_HEIGHT) * 2) + Math.floor(VISIBLE_ITEMS / 2) * ITEM_HEIGHT;
  }

  const [spinOffset, setSpinOffset] = useState(getInitialOffset());

  function handleSpin() {
    if (games.length === 0 || isSpinning) return;

    setIsSpinning(true);
    setShowResult(false);

    // Seleciona um índice aleatório
    const winnerIndex = Math.floor(Math.random() * games.length);

    const spins = 5; // número de voltas completas
    const totalItems = games.length;
    const initialOffset = getInitialOffset();
    const finalOffset = initialOffset - (spins * totalItems * ITEM_HEIGHT + winnerIndex * ITEM_HEIGHT);

    setSpinOffset(initialOffset);

    // Executa a mudança de offset com requestAnimationFrame para garantir atualização ASAP
    window.requestAnimationFrame(() => {
      setSpinOffset(finalOffset);
    });

    spinTimeout.current = setTimeout(() => {
      setSelectedGame(games[winnerIndex]);
      setIsSpinning(false);
      setShowResult(true);
    }, spinDuration * 1000);
  }

  function handleCloseResult() {
    setShowResult(false);

    if (removeAfterSpin && selectedGame) {
      onRemoveGame(selectedGame.id);
      setSelectedGame(null);

      setSpinOffset(getInitialOffset());
    }
  }

  function resetSpin() {
    setSpinOffset(getInitialOffset());
    setSelectedGame(null);
  }

  const transitionStyle = isSpinning
    ? `transform ${spinDuration}s cubic-bezier(0.22, 0.61, 0.36, 1)`
    : `transform 0.6s cubic-bezier(0.45, 0, 0.55, 1)`;

  // Repete o array de games 5 vezes para o efeito contínuo sem muitos elementos
  const repeatedGames = Array(5).fill(games).flat();

  return (
    <>
      {isSpinning && (
        <div className="fixed inset-0 z-[60] bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
          <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8">
            <h2 className="text-3xl md:text-6xl font-bold mb-8 md:mb-12 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
              🎲 Girando a Roleta! 🎲
            </h2>

            <div className="relative w-full max-w-2xl mb-8">
              {/* Setas indicadoras laterais */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full z-20">
                <div className="flex items-center gap-2">
                  <div className="bg-red-600 text-white px-4 py-2 rounded-l-full font-bold text-sm md:text-base shadow-lg">
                    VENCEDOR
                  </div>
                  <div 
                    className="w-0 h-0"
                    style={{
                      borderTop: '25px solid transparent',
                      borderBottom: '25px solid transparent',
                      borderLeft: '40px solid #dc2626',
                      filter: 'drop-shadow(4px 0 12px rgba(220, 38, 38, 0.6))',
                    }}
                  />
                </div>
              </div>

              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full z-20">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-0 h-0"
                    style={{
                      borderTop: '25px solid transparent',
                      borderBottom: '25px solid transparent',
                      borderRight: '40px solid #dc2626',
                      filter: 'drop-shadow(-4px 0 12px rgba(220, 38, 38, 0.6))',
                    }}
                  />
                  <div className="bg-red-600 text-white px-4 py-2 rounded-r-full font-bold text-sm md:text-base shadow-lg">
                    VENCEDOR
                  </div>
                </div>
              </div>

              {/* Container com máscara */}
              <div className="relative bg-white/80 backdrop-blur rounded-2xl shadow-2xl overflow-hidden border-4 border-purple-300">
                {/* Linhas de destaque para o item central */}
                <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none z-10">
                  <div className="border-t-4 border-b-4 border-red-500 h-20" style={{ boxShadow: 'inset 0 0 20px rgba(220, 38, 38, 0.3)' }} />
                </div>

                {/* Gradientes de fade superior e inferior */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

                {/* Lista de jogos rolando */}
                <div className="h-[400px] md:h-[500px] overflow-hidden relative">
                  <div
                    className="absolute w-full"
                    style={{
                      transform: `translateY(calc(50% - 40px + ${spinOffset}px))`,
                      transition: transitionStyle,
                    }}
                  >
                    {repeatedGames.map((game, index) => {
                      const colorIndex = index % games.length;
                      const hue = (360 / games.length) * colorIndex;

                      return (
                        <div
                          key={`${game.id}-${index}`}
                          className="h-20 flex items-center justify-center px-6 border-b-2 border-white/50"
                          style={{
                            background: `linear-gradient(135deg, hsl(${hue}, 85%, 96%), hsl(${hue}, 85%, 88%))`,
                          }}
                        >
                          <div className="flex items-center gap-4 w-full max-w-xl">
                            <div 
                              className="w-4 h-4 rounded-full flex-shrink-0 shadow-lg"
                              style={{ background: `hsl(${hue}, 85%, 60%)` }}
                            />
                            <p className="text-xl md:text-2xl font-bold text-gray-800 truncate">
                              {game.name}
                            </p>
                            <Play className="w-6 h-6 text-purple-600 ml-auto flex-shrink-0" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Efeito de brilho ao redor */}
              <div className="absolute -inset-2 rounded-2xl animate-pulse pointer-events-none -z-10">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 blur-xl" />
              </div>
            </div>

            {/* Lista de jogos participantes */}
            <div className="bg-white/80 backdrop-blur rounded-xl p-3 md:p-4 shadow-xl max-w-2xl w-full">
              <p className="text-center text-gray-700 font-semibold mb-2 text-sm md:text-base">
                🎮 {games.length} {games.length === 1 ? 'jogo participante' : 'jogos participantes'}
              </p>
              <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center max-h-24 md:max-h-32 overflow-y-auto">
                {games.map((game, index) => (
                  <span
                    key={game.id}
                    className="px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium text-white shadow-md"
                    style={{
                      background: `hsl(${(360 / games.length) * index}, 85%, 60%)`
                    }}
                  >
                    {game.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showResult && selectedGame && (
        <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative animate-scale-in">
            <button
              onClick={handleCloseResult}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center">
              <div className="mb-6">
                <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-yellow-500 mx-auto mb-4 animate-bounce" />
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  🎉 Resultado! 🎉
                </h3>
                <p className="text-gray-600 text-sm md:text-base">O jogo sorteado foi:</p>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 md:p-6 mb-6 border-2 border-purple-300">
                <Play className="w-10 h-10 md:w-12 md:h-12 text-purple-600 mx-auto mb-3" />
                <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent break-words">
                  {selectedGame.name}
                </p>
              </div>

              {removeAfterSpin && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800 flex items-center justify-center gap-2">
                    <Trash2 size={16} />
                    Este jogo será removido da lista
                  </p>
                </div>
              )}

              <button
                onClick={handleCloseResult}
                className="w-full py-2.5 md:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg text-sm md:text-base"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-40"
      >
        <Shuffle className="w-6 h-6" />
        {games.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
            {games.length}
          </span>
        )}
      </button>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-0 right-0 h-full bg-white shadow-2xl border-l border-gray-200 transition-all duration-300 flex flex-col z-50
          ${collapsed ? 'w-12' : 'w-80 sm:w-96'}
          ${mobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:block absolute left-[6px] top-[22px] bg-none opacity-60 hover:opacity-100 transition-opacity"
        >
          {collapsed 
            ? <div className="flex -space-x-1"><ChevronLeft size={16} /><ChevronLeft size={16} /></div> 
            : <div className="flex -space-x-1"><ChevronRight size={16} /><ChevronRight size={16} /></div>
          }
        </button>

        {!collapsed && (
          <>
            <div className="flex justify-center items-center p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🎰 Roleta de Jogos
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {games.length === 0 ? (
                <div className="text-center py-8">
                  <Shuffle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">
                    Nenhum jogo adicionado ainda.
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    {/* Configurações */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3 border border-gray-200">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          <Clock size={16} className="text-purple-600" />
                          Duração do giro (segundos)
                        </label>
                        <input
                          type="number"
                          min="3"
                          max="10"
                          value={spinDuration}
                          onChange={(e) => setSpinDuration(Math.max(3, Math.min(10, parseInt(e.target.value) || 5)))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={removeAfterSpin}
                          onChange={(e) => setRemoveAfterSpin(e.target.checked)}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700 flex items-center gap-1.5">
                          <Trash2 size={14} className="text-red-500" />
                          Remover jogo após sorteio
                        </span>
                      </label>
                    </div>

                    {/* Resultado */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 mb-4 border border-purple-200">
                      {selectedGame ? (
                        <div className="flex flex-col items-center">
                          <Play className="w-10 h-10 text-green-500 mb-2" />
                          <h3 className="text-sm font-bold text-gray-700 mb-1">
                            🎮 Último Sorteado:
                          </h3>
                          <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-base break-words max-w-full px-2">
                            {selectedGame.name}
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Shuffle className="w-10 h-10 text-purple-400 mb-2" />
                          <p className="text-sm text-gray-600">
                            Pronto para girar!
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleSpin}
                      disabled={isSpinning || games.length === 0}
                      className="w-full inline-flex justify-center items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-base font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                    >
                      <Shuffle className="w-5 h-5" />
                      {isSpinning ? 'Girando...' : '🎰 GIRAR ROLETA'}
                    </button>

                    {selectedGame && !isSpinning && (
                      <button
                        onClick={resetSpin}
                        className="w-full mt-2 px-4 py-2 text-sm text-purple-600 hover:text-purple-700 font-medium"
                      >
                        Resetar Roleta
                      </button>
                    )}
                  </div>

                  {/* Lista de Jogos */}
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                    Jogos na Roleta ({games.length})
                  </h3>
                  <div className="space-y-2 max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar">
                    {games.map((game, index) => (
                      <div
                        key={game.id}
                        className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:border-purple-400 transition-all gap-2 group"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span 
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{
                              background: `hsl(${(360 / games.length) * index}, 85%, 60%)`
                            }}
                          />
                          <span className="text-sm font-medium text-gray-800 break-words">
                            {game.name}
                          </span>
                        </div>
                        <button
                          onClick={() => onRemoveGame(game.id)}
                          className="text-xs text-red-600 hover:text-red-700 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-red-50 px-2 py-1 rounded"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(243, 244, 246, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #9333ea, #ec4899);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #a855f7, #f472b6);
        }
        
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
