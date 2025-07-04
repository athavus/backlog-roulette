import React from 'react';
import { X, Calendar, Gamepad2, Globe, Award } from 'lucide-react';
import type { Game } from '../types/game';

interface GameModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
}

export const GameModal: React.FC<GameModalProps> = ({ game, isOpen, onClose }) => {
  if (!isOpen || !game) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  console.log(game);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 truncate">{game.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {game.released && (
                <div className="flex items-center gap-2">
                  <Calendar className="text-gray-500" size={20} />
                  <span className="text-gray-700">
                    <strong>Data de lançamento:</strong> {formatDate(game.released)}
                  </span>
                </div>
              )}

              {game.metacritic && (
                <div className="flex items-center gap-2">
                  <Award className="text-green-500" size={20} />
                  <span className="text-gray-700">
                    <strong>Metacritic:</strong> {game.metacritic}
                  </span>
                </div>
              )}

              {game.platforms && game.platforms.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Globe className="text-gray-500" size={20} />
                    Plataformas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {game.platforms.map((platform) => {
                      return (
                        <span
                          key={platform.platform.id}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {platform.platform.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {game.genres && game.genres.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Gêneros</h3>
                  <div className="flex flex-wrap gap-2">
                    {game.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Imagem do jogo - Lado direito */}
            <div className="lg:order-last">
              {game.background_image ? (
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Gamepad2 className="text-gray-400" size={48} />
                  <span className="text-gray-500 ml-2">Sem imagem disponível</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};