import type { APIResponse } from '../types/game';
import { API_CONFIG } from '../config/api';

export class GameService {
  static async searchGames(query: string): Promise<APIResponse> {
    const { BASE_URL, API_KEY, DEFAULT_PAGE_SIZE } = API_CONFIG;
    
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&search=${encodeURIComponent(query)}&page_size=${DEFAULT_PAGE_SIZE}`
    );

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }
}