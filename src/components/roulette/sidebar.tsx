import { useState } from 'react';
import { Shuffle, Play, ChevronLeft, ChevronRight, X, Sparkles, Clock, Trash2 } from 'lucide-react';
import type { RouletteGame, RouletteSidebarProps } from '../../types/roulette';

export function RouletteSidebar({ games, onSpin, onRemoveGame }: RouletteSidebarProps) {
  const [selectedGame, setSelectedGame] = useState<RouletteGame | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [spinDuration, setSpinDuration] = useState(3);
  const [removeAfterSpin, setRemoveAfterSpin] = useState(false);

  // Gera as cores vibrantes do gradiente baseado na quantidade de jogos
  const generateGradient = (count: number) => {
    if (count === 0) return 'conic-gradient(from 0deg, #667eea 0deg, #764ba2 360deg)';
    
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const hue = (360 / count) * i;
      colors.push(`hsl(${hue}, 85%, 60%)`);
    }
    
    const step = 360 / count;
    const gradientStops = colors
      .map((color, i) => `${color} ${i * step}deg ${(i + 1) * step}deg`)
      .join(', ');
    
    return `conic-gradient(from 0deg, ${gradientStops})`;
  };

  const handleSpin = () => {
    if (games.length === 0) return;

    setIsSpinning(true);
    setSelectedGame(null);
    setShowResult(false);

    // Animação de rotação
    const spins = 5 + Math.random() * 3;
    const finalRotation = rotation + (360 * spins) + Math.random() * 360;
    setRotation(finalRotation);

    setTimeout(() => {
      const result = onSpin();
      setSelectedGame(result);
      setIsSpinning(false);
      setShowResult(true);
    }, spinDuration * 1000);
  };

  const handleCloseResult = () => {
    setShowResult(false);
    
    // Remove o jogo da lista se a opção estiver marcada
    if (removeAfterSpin && selectedGame) {
      onRemoveGame(selectedGame.id);
      setSelectedGame(null);
    }
  };

  return (
    <>
      {/* Modal de tela cheia durante o giro */}
      {isSpinning && (
        <div className="fixed inset-0 z-[60] bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
          <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8">
            {/* Título animado */}
            <h2 className="text-3xl md:text-6xl font-bold mb-8 md:mb-12 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
              🎲 Girando a Roleta! 🎲
            </h2>

            {/* Roleta grande */}
            <div className="relative w-[85vmin] h-[85vmin] max-w-[550px] max-h-[550px] mb-4 md:mb-8">
              {/* Indicador/Seta - FORA da roleta */}
              <div className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 z-20">
                <div className="flex flex-col items-center">
                  <div className="w-0 h-0 border-l-[20px] md:border-l-[25px] border-l-transparent border-r-[20px] md:border-r-[25px] border-r-transparent border-t-[35px] md:border-t-[40px] border-t-red-500 drop-shadow-2xl" 
                       style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }} />
                  <div className="w-1.5 md:w-2 h-3 md:h-4 bg-red-500 -mt-1" />
                </div>
              </div>

              {/* Disco da roleta */}
              <div
                className="absolute inset-0 rounded-full shadow-2xl"
                style={{
                  background: generateGradient(games.length),
                  transform: `rotate(${rotation}deg)`,
                  transition: `transform ${spinDuration}s cubic-bezier(0.17, 0.67, 0.12, 0.99)`,
                }}
              >
                {/* Brilho interno */}
                <div className="absolute inset-4 md:inset-8 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                
                {/* Marcadores de divisão - linhas brancas PRIMEIRO */}
                {games.length > 0 && games.map((_, i) => {
                  const angle = (360 / games.length) * i;
                  return (
                    <div
                      key={`line-${i}`}
                      className="absolute top-1/2 left-1/2 w-0.5 bg-white/70 origin-bottom"
                      style={{
                        height: '50%',
                        transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                      }}
                    />
                  );
                })}

                {/* Nomes dos jogos - posicionados ENTRE as linhas divisórias */}
                {games.map((game, i) => {
                  const segmentAngle = 360 / games.length;
                  // Posiciona no meio da fatia (entre duas linhas)
                  const middleAngle = (segmentAngle * i) + (segmentAngle / 2);
                  
                  // Calcula distância do centro baseado no tamanho da roleta
                  const radiusPercent = games.length > 20 ? 38 : games.length > 15 ? 40 : 42;
                  
                  return (
                    <div
                      key={game.id}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        transform: `rotate(${middleAngle}deg)`,
                        transformOrigin: '0 0',
                      }}
                    >
                      <div 
                        style={{
                          transform: `translateX(${radiusPercent}%) rotate(90deg)`,
                        }}
                      >
                        <div className="bg-white/95 backdrop-blur px-1.5 py-0.5 rounded shadow-md border border-gray-300">
                          <p 
                            className="font-bold text-gray-800 whitespace-nowrap text-center"
                            style={{ 
                              fontSize: games.length > 25 ? '6px' : games.length > 20 ? '7px' : games.length > 15 ? '8px' : games.length > 10 ? '9px' : '10px',
                              maxWidth: games.length > 25 ? '70px' : games.length > 20 ? '80px' : games.length > 15 ? '90px' : '110px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                            title={game.name}
                          >
                            {game.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Centro da roleta */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white border-3 md:border-4 border-gray-900 shadow-2xl flex items-center justify-center z-10">
                    <Shuffle className="w-8 h-8 md:w-12 md:h-12 text-purple-600 animate-spin" />
                  </div>
                </div>
              </div>

              {/* Efeito de brilho ao redor */}
              <div className="absolute -inset-4 rounded-full animate-pulse pointer-events-none">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-2xl" />
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

      {/* Popup de Resultado */}
      {showResult && selectedGame && (
        <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative animate-scale-in">
            {/* Botão de fechar */}
            <button
              onClick={handleCloseResult}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Conteúdo do popup */}
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

      {/* Botão flutuante para abrir sidebar no mobile */}
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
          fixed top-0 right-0 h-full bg-white shadow-2xl border-l border-gray-200 transition-all duration-300 flex flex-col z-50
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
            {/* Header */}
            <div className="flex justify-center items-center p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🎮 Roleta de Jogos
              </h2>
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
                  {/* Roleta Visual - Preview */}
                  <div className="text-center mb-6">
                    <div className="relative mb-6 flex justify-center items-center">
                      <div className="relative w-56 h-56">
                        {/* Disco da roleta */}
                        <div
                          className="absolute inset-0 rounded-full shadow-xl"
                          style={{
                            background: generateGradient(games.length),
                          }}
                        >
                          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                          
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white border-4 border-gray-800 shadow-lg flex items-center justify-center">
                              <Shuffle className="w-8 h-8 text-purple-600" />
                            </div>
                          </div>

                          {games.length > 0 && games.map((_, i) => (
                            <div
                              key={i}
                              className="absolute top-1/2 left-1/2 w-0.5 h-28 bg-white/40 origin-bottom"
                              style={{
                                transform: `translate(-50%, -100%) rotate(${(360 / games.length) * i}deg)`,
                              }}
                            />
                          ))}
                        </div>

                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-red-500 drop-shadow-lg" />
                        </div>
                      </div>
                    </div>

                    {/* Configurações da Roleta */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3 border border-gray-200">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          <Clock size={16} className="text-purple-600" />
                          Duração do giro (segundos)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={spinDuration}
                          onChange={(e) => setSpinDuration(Math.max(1, Math.min(10, parseInt(e.target.value) || 3)))}
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
                      {isSpinning ? 'Girando...' : '🎲 GIRAR ROLETA'}
                    </button>
                  </div>

                  {/* Lista de Jogos */}
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                    Jogos na Roleta ({games.length})
                  </h3>
                  <div className="space-y-2 max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar">
                    {games.map((game: RouletteGame, index: number) => (
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
