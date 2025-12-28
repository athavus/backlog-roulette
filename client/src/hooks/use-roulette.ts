import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import gamesService from '../services/games-service';
import type { RouletteGame } from '../types/roulette';

export const useRoulette = () => {
  const { user } = useAuth();
  const [games, setGames] = useState<RouletteGame[]>([]);
  const [loading, setLoading] = useState(true);

  // Carrega os jogos do backend (se logado) ou do localStorage (se deslogado)
  const loadGames = useCallback(async () => {
    setLoading(true);
    try {
      if (user) {
        // Usuário logado: carregar do backend
        const backendGames = await gamesService.getRouletteGames();
        setGames(backendGames);
        // Também salvar no localStorage como backup
        localStorage.setItem('rouletteGames', JSON.stringify(backendGames));
      } else {
        // Usuário deslogado: carregar do localStorage
        const savedGames = localStorage.getItem('rouletteGames');
        if (savedGames) {
          try {
            setGames(JSON.parse(savedGames));
          } catch (error) {
            console.error('Erro ao carregar jogos da roleta:', error);
            setGames([]);
          }
        } else {
          setGames([]);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar jogos:', error);
      // Em caso de erro, tentar carregar do localStorage
      const savedGames = localStorage.getItem('rouletteGames');
      if (savedGames) {
        try {
          setGames(JSON.parse(savedGames));
        } catch (e) {
          setGames([]);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Sincroniza jogos do localStorage com o backend quando o usuário faz login
  const syncLocalStorageToBackend = useCallback(async () => {
    if (!user) return;

    try {
      const localGames = localStorage.getItem('rouletteGames');
      if (localGames) {
        try {
          const parsedGames = JSON.parse(localGames);
          if (Array.isArray(parsedGames) && parsedGames.length > 0) {
            // Sincronizar com o backend
            const syncedGames = await gamesService.syncRouletteGames(parsedGames);
            setGames(syncedGames);
            // Atualizar localStorage com os dados sincronizados
            localStorage.setItem('rouletteGames', JSON.stringify(syncedGames));
          }
        } catch (error) {
          console.error('Erro ao sincronizar jogos:', error);
        }
      }
    } catch (error) {
      console.error('Erro na sincronização:', error);
    }
  }, [user]);

  // Carregar jogos quando o componente monta ou quando o usuário muda
  useEffect(() => {
    loadGames();
  }, [loadGames]);

  // Sincronizar quando o usuário fizer login
  useEffect(() => {
    if (user) {
      syncLocalStorageToBackend();
    }
  }, [user, syncLocalStorageToBackend]);

  // Salva os jogos no backend (se logado) ou no localStorage (se deslogado)
  const saveGames = async (updatedGames: RouletteGame[]) => {
    setGames(updatedGames);
    
    if (user) {
      // Usuário logado: salvar no backend
      try {
        // Primeiro, obter os jogos atuais do backend
        const currentBackendGames = await gamesService.getRouletteGames();
        const currentBackendIds = new Set(currentBackendGames.map(g => g.id));
        const updatedIds = new Set(updatedGames.map(g => g.id));

        // Adicionar novos jogos
        const gamesToAdd = updatedGames.filter(g => !currentBackendIds.has(g.id));
        for (const game of gamesToAdd) {
          try {
            await gamesService.addRouletteGame(game);
          } catch (error) {
            console.error('Erro ao adicionar jogo:', error);
          }
        }

        // Remover jogos que foram deletados
        const gamesToRemove = currentBackendGames.filter(g => !updatedIds.has(g.id));
        for (const game of gamesToRemove) {
          try {
            await gamesService.removeRouletteGame(game.id);
          } catch (error) {
            console.error('Erro ao remover jogo:', error);
          }
        }

        // Recarregar do backend para garantir sincronização
        const refreshedGames = await gamesService.getRouletteGames();
        setGames(refreshedGames);
        localStorage.setItem('rouletteGames', JSON.stringify(refreshedGames));
      } catch (error) {
        console.error('Erro ao salvar no backend:', error);
        // Em caso de erro, salvar apenas no localStorage
        localStorage.setItem('rouletteGames', JSON.stringify(updatedGames));
      }
    } else {
      // Usuário deslogado: salvar apenas no localStorage
      localStorage.setItem('rouletteGames', JSON.stringify(updatedGames));
    }
  };

  const addGame = async (game: RouletteGame) => {
    // Verificar se o jogo já existe
    if (isGameInRoulette(game.id)) {
      return;
    }

    const updatedGames = [...games, game];
    
    if (user) {
      // Se logado, adicionar diretamente no backend
      try {
        await gamesService.addRouletteGame(game);
        setGames(updatedGames);
        localStorage.setItem('rouletteGames', JSON.stringify(updatedGames));
      } catch (error) {
        console.error('Erro ao adicionar jogo:', error);
        // Em caso de erro, salvar apenas no localStorage
        setGames(updatedGames);
        localStorage.setItem('rouletteGames', JSON.stringify(updatedGames));
      }
    } else {
      // Se deslogado, salvar apenas no localStorage
      setGames(updatedGames);
      localStorage.setItem('rouletteGames', JSON.stringify(updatedGames));
    }
  };

  const removeGame = async (gameId: number) => {
    const updatedGames = games.filter(game => game.id !== gameId);
    
    if (user) {
      // Se logado, remover do backend
      try {
        await gamesService.removeRouletteGame(gameId);
        setGames(updatedGames);
        localStorage.setItem('rouletteGames', JSON.stringify(updatedGames));
      } catch (error) {
        console.error('Erro ao remover jogo:', error);
        // Em caso de erro, salvar apenas no localStorage
        setGames(updatedGames);
        localStorage.setItem('rouletteGames', JSON.stringify(updatedGames));
      }
    } else {
      // Se deslogado, salvar apenas no localStorage
      setGames(updatedGames);
      localStorage.setItem('rouletteGames', JSON.stringify(updatedGames));
    }
  };

  const isGameInRoulette = (gameId: number) => {
    return games.some(game => game.id === gameId);
  };

  const spinRoulette = () => {
    if (games.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * games.length);
    return games[randomIndex];
  };

  return {
    games,
    addGame,
    removeGame,
    isGameInRoulette,
    spinRoulette,
    totalGames: games.length,
    loading,
    refreshGames: loadGames
  };
};
