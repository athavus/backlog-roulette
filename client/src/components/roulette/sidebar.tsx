import { useState } from 'react';
import { Shuffle, Play, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { RouletteGame, RouletteSidebarProps } from '../../types/roulette';

export function RouletteSidebar({
  games,
  onSpin,
  onRemoveGame,
  collapsed,
  onToggleCollapse
}: RouletteSidebarProps) {
  const [selectedGame, setSelectedGame] = useState<RouletteGame | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSpin = () => {
    if (games.length === 0) return;

    setIsSpinning(true);
    setSelectedGame(null);

    setTimeout(() => {
      const result = onSpin();
      setSelectedGame(result);
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <>
      {/* Botão flutuante para abrir sidebar no mobile */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
      >
        <Shuffle className="w-6 h-6" />
        {games.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
            {games.length}
          </span>
        )}
      </button>

      {/* Overlay mobile */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 right-0 h-full bg-white shadow-lg border-l border-gray-200 transition-all duration-300 flex flex-col z-50
          ${collapsed ? 'w-12' : 'w-80 sm:w-96'}
          ${mobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Botão de fechar no mobile */}
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {/* Botão de collapse (apenas desktop) */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:block absolute left-[6px] top-[22px] bg-none opacity-60 hover:opacity-100 transition-opacity"
        >
          {collapsed
            ? <div className="flex -space-x-1"><ChevronLeft size={16} /><ChevronLeft size={16} /></div>
            : <div className="flex -space-x-1"><ChevronRight size={16} /><ChevronRight size={16} /></div>
          }
        </button>

        {!collapsed && (
          <>
            {/* Header */}
            <div className="flex justify-center items-center p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Roleta</h2>
            </div>

            {/* Conteúdo */}
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
                  {/* Spin */}
                  <div className="text-center mb-6">
                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                      {isSpinning ? (
                        <div className="flex flex-col items-center">
                          <Shuffle className="w-10 h-10 text-blue-500 animate-spin mb-2" />
                          <p className="text-sm text-gray-700">
                            Girando a roleta...
                          </p>
                        </div>
                      ) : selectedGame ? (
                        <div className="flex flex-col items-center">
                          <Play className="w-10 h-10 text-green-500 mb-2" />
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            Jogo Selecionado
                          </h3>
                          <p className="text-blue-600 font-medium break-words max-w-full px-2">
                            {selectedGame.name}
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Shuffle className="w-10 h-10 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">
                            Pronto para girar!
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleSpin}
                      disabled={isSpinning || games.length === 0}
                      className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Shuffle className="w-4 h-4" />
                      {isSpinning ? 'Girando...' : 'Girar'}
                    </button>
                  </div>

                  {/* Lista de Jogos */}
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Jogos na Roleta ({games.length})
                  </h3>
                  <div className="space-y-2 max-h-[66vh] lg:h-[75%] overflow-y-auto">
                    {games.map((game: RouletteGame) => (
                      <div
                        key={game.id}
                        className="flex justify-between items-center p-2 bg-gray-50 rounded gap-2"
                      >
                        <span className="text-sm font-medium text-gray-900 break-words flex-1">
                          {game.name}
                        </span>
                        <button
                          onClick={() => onRemoveGame(game.id)}
                          className="text-xs text-red-600 hover:text-red-800 font-medium whitespace-nowrap"
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
    </>
  );
}
