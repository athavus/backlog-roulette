import { GameCard } from './card';
import type { SuggestionsListProps } from '../../types/game-input';

export function SuggestionsList({ games, onSelectGame, visible }: SuggestionsListProps) {
  if (!visible || games.length === 0) {
    return null;
  }

  return (
    <div
      className="
        absolute 
        top-full 
        left-0 
        right-0 
        mt-2 sm:mt-3 
        bg-white/95 
        backdrop-blur-md 
        rounded-lg sm:rounded-xl 
        shadow-2xl 
        max-h-[60vh] sm:max-h-96 
        overflow-y-auto 
        z-50
        mx-0 sm:mx-0
      "
      role="listbox"
      aria-label="Sugestões de jogos"
    >
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          onSelect={onSelectGame}
        />
      ))}
    </div>
  );
}
