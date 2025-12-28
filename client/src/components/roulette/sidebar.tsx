import { useState } from "react";
import { Shuffle, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { RouletteGame, RouletteSidebarProps } from "../../types/roulette";

export function RouletteSidebar({
  games,
  onSpin,
  onRemoveGame,
  collapsed,
  onToggleCollapse,
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
        className="lg:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-700 transition-all active:scale-95 z-40"
      >
        <Shuffle className="w-6 h-6" />
        {games.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-6 h-6 rounded-md flex items-center justify-center font-bold border-2 border-white shadow-md">
            {games.length}
          </span>
        )}
      </button>

      {/* Overlay mobile */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 right-0 h-full bg-[#fdfdfd] shadow-2xl border-l border-blue-100 transition-all duration-300 flex flex-col z-50
          ${collapsed ? "w-14" : "w-80 sm:w-96"}
          ${mobileOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Botão de fechar no mobile */}
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-2"
        >
          <X size={24} />
        </button>

        {/* Botão de collapse (apenas desktop) */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex absolute left-[-16px] top-1/2 -translate-y-1/2 w-8 h-12 bg-white border border-blue-100 rounded-l-lg shadow-md items-center justify-center text-blue-400 hover:text-blue-600 transition-colors z-10"
        >
          {collapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>

        {!collapsed && (
          <>
            {/* Header */}
            <div className="pt-8 pb-4 px-6">
              <h2 className="text-xl font-mono font-bold text-blue-900 tracking-tighter uppercase border-b-2 border-blue-600 pb-2 inline-block">
                ROULETTE
              </h2>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col">
              {games.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                  <div className="w-16 h-16 border-2 border-dashed border-gray-400 rounded-2xl flex items-center justify-center mb-4">
                    <Shuffle className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="font-mono text-sm uppercase tracking-widest text-gray-500">
                    Empty Backlog
                  </p>
                </div>
              ) : (
                <>
                  {/* Spin Section */}
                  <div className="mb-8">
                    <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 mb-4 relative overflow-hidden group">
                      <div className="relative z-10">
                        {isSpinning ? (
                          <div className="flex flex-col items-center py-4">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
                            <p className="font-mono text-xs uppercase tracking-tighter text-blue-600 font-bold">
                              Escolhendo seu Destino...
                            </p>
                          </div>
                        ) : selectedGame ? (
                          <div className="flex flex-col items-center py-2 animate-in fade-in zoom-in duration-300">
                            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-3">
                              Vencedor!
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 text-center leading-tight mb-1">
                              {selectedGame.name}
                            </h3>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center py-4 opacity-60">
                            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-400">
                              Roleta Pronta!
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={handleSpin}
                      disabled={isSpinning || games.length === 0}
                      className="w-full flex justify-center items-center gap-2 px-6 py-4 bg-blue-600 text-white font-mono text-sm font-bold rounded-xl hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_4px_0_rgb(29,78,216)] active:shadow-none active:translate-y-[4px]"
                    >
                      {isSpinning ? "GIRANDO..." : "GIRE A ROLETA!"}
                    </button>
                  </div>

                  {/* Lista de Jogos */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">
                      Backlog Atual: ({games.length})
                    </h3>
                  </div>

                  <div className="space-y-2 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-100">
                    {games.map((game: RouletteGame) => (
                      <div
                        key={game.id}
                        className="group flex justify-between items-center p-3 bg-white border border-gray-100 hover:border-blue-200 rounded-xl transition-all hover:shadow-sm"
                      >
                        <span className="text-sm font-medium text-gray-700 truncate flex-1">
                          {game.name}
                        </span>
                        <button
                          onClick={() => onRemoveGame(game.id)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 transition-all rounded-md hover:bg-red-50"
                        >
                          <X size={14} />
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
