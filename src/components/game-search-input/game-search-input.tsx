import { useState } from 'react';
import { useGameSearch } from '../../hooks/use-game-search';
import { SearchInput } from './search-input';
import { SuggestionsList } from './suggestions-list';
import { LoadingIndicator } from './loading-indicator';
import { ErrorMessage } from './error-message';
import { EmptyState } from './empty-state';
import { API_CONFIG } from '../../config/api';

import type { Game, GameSearchInputProps } from '../../types/game-input';

export const GameSearchInput: React.FC<GameSearchInputProps> = ({
  onGameSelect,
  placeholder,
  className = "",
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const {
    games,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectGame,
    clearError,
  } = useGameSearch(onGameSelect);

  const handleFocus = () => setShowSuggestions(true);
  
  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSelectGame = (game: Game) => {
    selectGame(game);
    setShowSuggestions(false);
  };

  const showEmptyState = showSuggestions && 
    !loading && 
    !error && 
    searchTerm.length >= API_CONFIG.MIN_SEARCH_LENGTH && 
    games.length === 0;

  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        showSuggestions={showSuggestions}
        placeholder={placeholder}
      />

      <LoadingIndicator visible={loading} />
      
      <ErrorMessage error={error} onDismiss={clearError} />
      
      <SuggestionsList
        games={games}
        onSelectGame={handleSelectGame}
        visible={showSuggestions}
      />

      <EmptyState
        searchTerm={searchTerm}
        visible={showEmptyState}
      />
    </div>
  );
};