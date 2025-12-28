import type { RouletteGame } from '../types/roulette';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class GamesService {
  async getRouletteGames(): Promise<RouletteGame[]> {
    const response = await fetch(`${API_BASE_URL}/games/roulette`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar jogos');
    }

    return response.json();
  }

  async addRouletteGame(game: RouletteGame): Promise<RouletteGame> {
    const response = await fetch(`${API_BASE_URL}/games/roulette`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(game),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao adicionar jogo');
    }

    return response.json();
  }

  async removeRouletteGame(gameId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/games/roulette/${gameId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Erro ao remover jogo');
    }
  }

  async syncRouletteGames(games: RouletteGame[]): Promise<RouletteGame[]> {
    const response = await fetch(`${API_BASE_URL}/games/roulette/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ games }),
    });

    if (!response.ok) {
      throw new Error('Erro ao sincronizar jogos');
    }

    const result = await response.json();
    return result.games;
  }
}

export default new GamesService();

