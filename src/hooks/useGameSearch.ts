import { useState, useEffect, useCallback } from 'react';
import type { Game } from '../types/game';
import { GameService } from '../services/gameService';
import { API_CONFIG } from '../config/api';
import { useDebounce } from './useDebounce';

interface UseGameSearchReturn {
  games: Game[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectGame: (game: Game) => void;
  clearError: () => void;
}

export const useGameSearch = (
  onGameSelect?: (game: Game) => void
): UseGameSearchReturn => {
  const [searchTerm, setSearchTerm] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, API_CONFIG.DEBOUNCE_DELAY);

  const searchGames = useCallback(async (query: string) => {
    if (!query.trim() || query.length < API_CONFIG.MIN_SEARCH_LENGTH) {
      setGames([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await GameService.searchGames(query);
      setGames(data.results);
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
      setError('Erro ao buscar jogos. Tente novamente.');
      setGames([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    searchGames(debouncedSearchTerm);
  }, [debouncedSearchTerm, searchGames]);

  const selectGame = useCallback((game: Game) => {
    setSearchTerm(game.name);
    setError(null);
    onGameSelect?.(game);
  }, [onGameSelect]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    games,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectGame,
    clearError,
  };
};