import type { APIResponse } from '../types/game-input';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export class GameService {
  static async searchGames(query: string): Promise<APIResponse> {
    const response = await fetch(
      `${API_BASE_URL}/search/games?query=${encodeURIComponent(query)}`,
      {
        credentials: 'include'
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }
}