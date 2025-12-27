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
      className="flex items-center p-3 sm:p-4 cursor-pointer hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
      onClick={handleClick}
      role="option"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Imagem do jogo - responsiva */}
      <img
        src={game.background_image}
        alt={game.name}
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover shadow-md mr-3 sm:mr-4 flex-shrink-0"
        onError={(e) => {
          e.currentTarget.src = 'https://via.placeholder.com/64x64/6366f1/ffffff?text=No+Image';
        }}
      />
      
      {/* Informações do jogo */}
      <div className="flex-1 text-left min-w-0">
        <h3 className="font-semibold text-gray-800 text-base sm:text-lg mb-1 line-clamp-1">
          {game.name}
        </h3>
        
        {/* Ratings e data - layout responsivo */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2 text-xs sm:text-sm text-gray-600">
          <span className="flex items-center gap-1 whitespace-nowrap">
            ⭐ {game.rating}/5
          </span>
          {game.released && (
            <span className="flex items-center gap-1 whitespace-nowrap">
              📅 {formatDate(game.released)}
            </span>
          )}
          {game.metacritic && (
            <span className="flex items-center gap-1 text-green-600 font-semibold whitespace-nowrap">
              🏆 {game.metacritic}
            </span>
          )}
        </div>
        
        {/* Gêneros - responsivo */}
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {game.genres.slice(0, 3).map((genre, index) => (
            <span
              key={index}
              className="px-2 py-0.5 sm:py-1 bg-zinc-500 text-white text-[10px] sm:text-xs rounded-full font-medium"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
