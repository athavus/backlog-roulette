import { useState } from 'react';
import { Shuffle, Play, ChevronLeft, ChevronRight, X, Gamepad2, Sparkles } from 'lucide-react';
import type { RouletteGame, RouletteSidebarProps } from '../../types/roulette';

export function RouletteSidebar({ games, onSpin, onRemoveGame }: RouletteSidebarProps) {
  const [selectedGame, setSelectedGame] = useState<RouletteGame | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
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
      {/* Floating button for mobile */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 gradient-primary text-white p-4 rounded-2xl shadow-xl hover:scale-105 transition-transform z-40"
      >
        <Shuffle className="w-6 h-6" />
        {games.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg">
            {games.length}
          </span>
        )}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 right-0 h-full bg-bg-secondary shadow-2xl border-l border-border transition-all duration-300 flex flex-col z-50
          ${collapsed ? 'w-16' : 'w-80 sm:w-96'}
          ${mobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden absolute right-4 top-4 p-2 rounded-full bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors"
        >
          <X size={20} />
        </button>

        {/* Collapse toggle (desktop only) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -left-3 top-24 w-6 h-12 bg-bg-secondary border border-border rounded-l-lg items-center justify-center text-text-muted hover:text-text-primary transition-colors"
        >
          {collapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {collapsed ? (
          /* Collapsed state */
          <div className="flex flex-col items-center py-6 gap-4">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Shuffle className="w-5 h-5 text-white" />
            </div>
            <div className="w-8 h-px bg-border" />
            <span className="text-lg font-bold text-text-primary">{games.length}</span>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-center gap-3 p-6 border-b border-border">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Shuffle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary">Roleta</h2>
                <p className="text-xs text-text-muted">
                  {games.length} {games.length === 1 ? 'jogo' : 'jogos'}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {games.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-bg-tertiary flex items-center justify-center mx-auto mb-4">
                    <Gamepad2 className="w-8 h-8 text-text-muted" />
                  </div>
                  <p className="text-text-secondary font-medium mb-1">
                    Nenhum jogo ainda
                  </p>
                  <p className="text-text-muted text-sm">
                    Adicione jogos ao backlog para girar a roleta
                  </p>
                </div>
              ) : (
                <>
                  {/* Spin Section */}
                  <div className="mb-6">
                    <div className="bg-bg-tertiary rounded-2xl p-5 mb-4">
                      {isSpinning ? (
                        <div className="flex flex-col items-center py-4">
                          <div className="relative">
                            <Shuffle className="w-12 h-12 text-accent animate-spin" />
                            <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                          </div>
                          <p className="text-text-secondary text-sm mt-3 font-medium">
                            Girando a roleta...
                          </p>
                        </div>
                      ) : selectedGame ? (
                        <div className="flex flex-col items-center py-2">
                          <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center mb-3">
                            <Play className="w-7 h-7 text-green-500" />
                          </div>
                          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">
                            Você vai jogar
                          </p>
                          <p className="text-lg font-bold text-text-primary text-center break-words max-w-full">
                            {selectedGame.name}
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center py-4">
                          <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mb-3">
                            <Shuffle className="w-7 h-7 text-accent" />
                          </div>
                          <p className="text-text-secondary text-sm font-medium">
                            Pronto para girar!
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleSpin}
                      disabled={isSpinning || games.length === 0}
                      className="w-full btn-primary flex items-center justify-center gap-2 py-3"
                    >
                      <Shuffle className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
                      {isSpinning ? 'Girando...' : 'Girar Roleta'}
                    </button>
                  </div>

                  {/* Games List */}
                  <div>
                    <h3 className="text-sm font-semibold text-text-secondary mb-3 px-1">
                      Jogos no Backlog
                    </h3>
                    <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                      {games.map((game: RouletteGame) => (
                        <div
                          key={game.id}
                          className={`
                            group flex justify-between items-center p-3 rounded-xl transition-all
                            ${selectedGame?.id === game.id
                              ? 'bg-accent/20 border border-accent/30'
                              : 'bg-bg-tertiary hover:bg-border'
                            }
                          `}
                        >
                          <span className={`text-sm font-medium break-words flex-1 pr-2 ${selectedGame?.id === game.id ? 'text-accent' : 'text-text-primary'
                            }`}>
                            {game.name}
                          </span>
                          <button
                            onClick={() => onRemoveGame(game.id)}
                            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-all"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
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
