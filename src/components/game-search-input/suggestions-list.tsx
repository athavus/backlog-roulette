import React from 'react';
import type { Game } from '../../types/game';
import { GameCard } from './game-card';

interface SuggestionsListProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
  visible: boolean;
}

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