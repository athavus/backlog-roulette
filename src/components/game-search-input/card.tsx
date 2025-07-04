import { formatDate } from '../../utils/date';

import type { GameCardProps } from '../../types/game-input';

export const GameCard: React.FC<GameCardProps> = ({ game, onSelect }) => {
  const handleClick = () => onSelect(game);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(game);
    }
  };

  return (
    <div
      className="flex items-center p-4 cursor-pointer hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
      onClick={handleClick}
      role="option"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <img
        src={game.background_image}
        alt={game.name}
        className="w-16 h-16 rounded-lg object-cover shadow-md mr-4"
        onError={(e) => {
          e.currentTarget.src = 'https://via.placeholder.com/64x64/6366f1/ffffff?text=No+Image';
        }}
      />
      <div className="flex-1 text-left">
        <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-1">
          {game.name}
        </h3>
        <div className="flex items-center gap-4 mb-2 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            ⭐ {game.rating}/5
          </span>
          {game.released && (
            <span className="flex items-center gap-1">
              📅 {formatDate(game.released)}
            </span>
          )}
          {game.metacritic && (
            <span className="flex items-center gap-1 text-green-600 font-semibold">
              🏆 {game.metacritic}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {game.genres.slice(0, 3).map((genre, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-zinc-500 text-white text-xs rounded-full font-medium"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};