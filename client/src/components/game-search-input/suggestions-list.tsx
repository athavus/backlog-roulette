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
        mt-2 
        bg-card
        border
        rounded-sm 
        shadow-lg 
        max-h-[60vh] sm:max-h-96 
        overflow-y-auto 
        z-50
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
