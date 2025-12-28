import type { GameGenresProps } from '../../types/game-modal';

export function GameGenres({ genres }: GameGenresProps) {
  if (!genres || genres.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border-2 border-blue-50 p-6 rounded-2xl">
      <h3 className="
        font-mono 
        font-bold
        text-gray-400 
        text-[10px]
        uppercase
        tracking-[0.3em]
        mb-4
      ">
        Gêneros
      </h3>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <span
            key={genre.id}
            className="
              px-3 py-1 
              bg-blue-50/50 
              border border-blue-100
              text-blue-600 
              rounded-lg
              text-xs
              font-bold
              whitespace-nowrap
              hover:bg-blue-600 hover:text-white transition-all
            "
          >
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  );
}
