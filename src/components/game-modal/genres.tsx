//Tipos
import type { GameGenresProps } from '../../types/game-modal';

export function GameGenres({ genres }:GameGenresProps) {
  if (!genres || genres.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-2">Gêneros</h3>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <span
            key={genre.id}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  );
}

