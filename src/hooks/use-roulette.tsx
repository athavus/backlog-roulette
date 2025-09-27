import { useState, useEffect } from 'react';


interface RouletteGame {
  id: number;
  name: string;
}

export const useRoulette = () => {
  const [games, setGames] = useState<RouletteGame[]>([]);

  // Carrega os jogos do localStorage (simulando o arquivo roll.json)
  useEffect(() => {
    const savedGames = localStorage.getItem('rouletteGames');
    if (savedGames) {
      try {
        setGames(JSON.parse(savedGames));
      } catch (error) {
        console.error('Erro ao carregar jogos da roleta:', error);
      }
    }
  }, []);

  // Salva os jogos no localStorage
  const saveGames = (updatedGames: RouletteGame[]) => {
    setGames(updatedGames);
    localStorage.setItem('rouletteGames', JSON.stringify(updatedGames));
  };

  const addGame = (game: RouletteGame) => {
    const updatedGames = [...games, game];
    saveGames(updatedGames);
  };

  const removeGame = (gameId: number) => {
    const updatedGames = games.filter(game => game.id !== gameId);
    saveGames(updatedGames);
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
    totalGames: games.length
  };
};
