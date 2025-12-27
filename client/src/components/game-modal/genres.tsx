import type { GameGenresProps } from '../../types/game-modal';

export function GameGenres({ genres }: GameGenresProps) {
  if (!genres || genres.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="
        font-semibold 
        text-gray-900 
        mb-2
        text-sm sm:text-base
      ">
        Gêneros
      </h3>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {genres.map((genre) => (
          <span
            key={genre.id}
            className="
              px-2.5 py-1 
              sm:px-3 sm:py-1 
              bg-blue-100 
              text-blue-800 
              rounded-full 
              text-xs sm:text-sm
              whitespace-nowrap
            "
          >
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  );
}
