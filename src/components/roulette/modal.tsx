import React, { useState } from 'react';
import { X, Shuffle, Play } from 'lucide-react';

interface RouletteGame {
  id: number;
  name: string;
}

interface RouletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  games: RouletteGame[];
  onSpin: () => RouletteGame | null;
  onRemoveGame: (gameId: number) => void;
}

export const RouletteModal: React.FC<RouletteModalProps> = ({
  isOpen,
  onClose,
  games,
  onSpin,
  onRemoveGame
}) => {
  const [selectedGame, setSelectedGame] = useState<RouletteGame | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  if (!isOpen) return null;

  const handleSpin = () => {
    if (games.length === 0) return;
    
    setIsSpinning(true);
    setSelectedGame(null);

    // Simula o tempo da roleta girando
    setTimeout(() => {
      const result = onSpin();
      setSelectedGame(result);
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Roleta de Jogos</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {games.length === 0 ? (
            <div className="text-center py-8">
              <Shuffle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum jogo adicionado à roleta ainda.</p>
            </div>
          ) : (
            <>
              {/* Spin Section */}
              <div className="text-center mb-8">
                <div className="bg-gray-50 rounded-xl p-8 mb-4">
                  {isSpinning ? (
                    <div className="flex flex-col items-center">
                      <Shuffle className="w-16 h-16 text-blue-500 animate-spin mb-4" />
                      <p className="text-lg font-medium text-gray-700">
                        Girando a roleta...
                      </p>
                    </div>
                  ) : selectedGame ? (
                    <div className="flex flex-col items-center">
                      <Play className="w-16 h-16 text-green-500 mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Jogo Selecionado:
                      </h3>
                      <p className="text-xl text-blue-600 font-medium">
                        {selectedGame.name}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Shuffle className="w-16 h-16 text-gray-400 mb-4" />
                      <p className="text-lg text-gray-600">
                        Pronto para girar a roleta!
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSpin}
                  disabled={isSpinning || games.length === 0}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Shuffle className="w-5 h-5" />
                  {isSpinning ? 'Girando...' : 'Girar Roleta'}
                </button>
              </div>

              {/* Games List */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Jogos na Roleta ({games.length})
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {games.map((game) => (
                    <div
                      key={game.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium text-gray-900">{game.name}</span>
                      <button
                        onClick={() => onRemoveGame(game.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
