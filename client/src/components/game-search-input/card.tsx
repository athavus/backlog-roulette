import { Star, Calendar } from 'lucide-react';
import { formatDate } from '../../utils/date';
import type { GameCardProps } from '../../types/game-input';

export function GameCard({ game, onSelect }: GameCardProps) {
  const handleClick = () => onSelect(game);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(game);
    }
  };

  return (
    <div
      className="flex items-center p-3 cursor-pointer hover:bg-muted transition-colors border-b last:border-b-0 group"
      onClick={handleClick}
      role="option"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Game Image */}
      <div className="relative flex-shrink-0 mr-3">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-sm object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/64x64/6366f1/ffffff?text=🎮';
          }}
        />
        {game.metacritic && (
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-sm flex items-center justify-center text-[10px] font-bold ${game.metacritic >= 75 ? 'bg-green-500 text-white' :
            game.metacritic >= 50 ? 'bg-yellow-500 text-black' :
              'bg-red-500 text-white'
            }`}>
            {game.metacritic}
          </div>
        )}
      </div>

      {/* Game Info */}
      <div className="flex-1 text-left min-w-0">
        <h3 className="font-semibold text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors">
          {game.name}
        </h3>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 mb-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 whitespace-nowrap">
            <Star size={12} className="text-yellow-400" fill="currentColor" />
            {game.rating.toFixed(1)}
          </span>
          {game.released && (
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Calendar size={12} />
              {formatDate(game.released)}
            </span>
          )}
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1.5">
          {game.genres.slice(0, 3).map((genre, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] rounded-sm font-medium"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
