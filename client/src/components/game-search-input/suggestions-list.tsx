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
        bg-bg-secondary
        border
        border-border
        backdrop-blur-md 
        rounded-xl sm:rounded-2xl 
        shadow-xl 
        max-h-[60vh] sm:max-h-96 
        overflow-y-auto 
        z-50
        animate-slide-down
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
