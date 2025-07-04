// Importando Componente para o Card
import { GameCard } from './card';

// Importando Tipos
import type { SuggestionsListProps } from '../../types/game-input';

export const SuggestionsList: React.FC<SuggestionsListProps> = ({
  games,
  onSelectGame,
  visible,
}) => {
  if (!visible || games.length === 0) return null;

  return (
    <div
      className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl max-h-96 overflow-y-auto z-50"
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
};