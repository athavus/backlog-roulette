import { useState } from 'react';
import { X, Calendar, Star, Gamepad2 } from 'lucide-react';
import { GameImage } from './image';
import { GamePlatforms } from './platforms';
import { GameGenres } from './genres';
import { GameStatusButton, type GameStatus } from './GameStatusButton';
import { RatingInput } from './RatingInput';
import { useAuth } from '../../contexts/AuthContext';
import type { GameModalProps } from '../../types/game-modal';
import { formatDate } from '../../utils/date';

export function GameModal({
  game,
  isOpen,
  onClose,
  onToggleRoulette,
  isInRoulette
}: GameModalProps) {
  const { isAuthenticated } = useAuth();
  const [gameStatus, setGameStatus] = useState<GameStatus>('BACKLOG');
  const [rating, setRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!isOpen || !game) {
    return null;
  }

  const handleToggleRoulette = () => {
    if (onToggleRoulette && game) {
      onToggleRoulette(game);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleStatusChange = (status: GameStatus) => {
    setGameStatus(status);
    // If adding to backlog, also add to roulette
    if (status === 'BACKLOG' && !isInRoulette) {
      handleToggleRoulette();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-bg-secondary rounded-2xl w-full max-w-sm sm:max-w-2xl lg:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl my-auto border border-border animate-slide-up">
        {/* Header with gradient */}
        <div className="relative h-48 sm:h-64 overflow-hidden">
          <GameImage
            backgroundImage={game.background_image}
            gameName={game.name}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors backdrop-blur-sm"
          >
            <X size={20} />
          </button>

          {/* Metacritic badge */}
          {game.metacritic && (
            <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg font-bold text-sm backdrop-blur-sm ${game.metacritic >= 75 ? 'bg-green-500/90 text-white' :
                game.metacritic >= 50 ? 'bg-yellow-500/90 text-black' :
                  'bg-red-500/90 text-white'
              }`}>
              {game.metacritic}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 -mt-12 relative z-10">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
            {game.name}
          </h2>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-4">
            {game.released && (
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                <span>{formatDate(game.released)}</span>
              </div>
            )}
            {game.rating > 0 && (
              <div className="flex items-center gap-1.5">
                <Star size={16} className="text-yellow-400" fill="currentColor" />
                <span>{game.rating.toFixed(1)}</span>
              </div>
            )}
          </div>

          {/* Platforms */}
          {game.platforms && game.platforms.length > 0 && (
            <div className="mb-4">
              <GamePlatforms platforms={game.platforms} />
            </div>
          )}

          {/* Genres */}
          {game.genres && game.genres.length > 0 && (
            <div className="mb-6">
              <GameGenres genres={game.genres} />
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-border my-6" />

          {/* Status and Rating Section */}
          {isAuthenticated ? (
            <div className="space-y-6">
              {/* Game Status */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Status do jogo
                </label>
                <GameStatusButton
                  status={gameStatus}
                  onChange={handleStatusChange}
                />
              </div>

              {/* Your Rating - only show if completed or in progress */}
              {(gameStatus === 'COMPLETED' || gameStatus === 'IN_PROGRESS') && (
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Sua avaliação
                  </label>
                  <div className="flex items-center gap-4">
                    <RatingInput
                      rating={rating}
                      onChange={setRating}
                      size="lg"
                    />
                    {rating > 0 && (
                      <span className="text-text-muted text-sm">
                        {rating}/5 estrelas
                      </span>
                    )}
                  </div>

                  {rating > 0 && !showReviewForm && (
                    <button
                      onClick={() => setShowReviewForm(true)}
                      className="mt-3 text-sm text-accent hover:text-accent-hover transition-colors"
                    >
                      + Adicionar comentário
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 bg-bg-tertiary rounded-xl text-center">
              <Gamepad2 className="w-10 h-10 text-text-muted mx-auto mb-2" />
              <p className="text-text-secondary text-sm">
                Faça login para marcar status e avaliar jogos
              </p>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-border my-6" />

          {/* Roulette Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleToggleRoulette}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${isInRoulette
                  ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/30'
                  : 'btn-primary'
                }`}
            >
              {isInRoulette ? (
                <>
                  <X size={18} />
                  Remover da Roleta
                </>
              ) : (
                <>
                  <Gamepad2 size={18} />
                  Adicionar à Roleta
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
