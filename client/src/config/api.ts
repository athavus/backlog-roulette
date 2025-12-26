// API Configuration - uses environment variables for sensitive data
// In Vite, environment variables need the VITE_ prefix to be exposed to the client

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_RAWG_API_URL || 'https://api.rawg.io/api/games',
  API_KEY: import.meta.env.VITE_RAWG_API_KEY || '',
  DEFAULT_PAGE_SIZE: 5,
  DEBOUNCE_DELAY: 300,
  MIN_SEARCH_LENGTH: 2,
} as const;

// Validate required environment variables
if (!API_CONFIG.API_KEY) {
  console.warn(
    '⚠️ VITE_RAWG_API_KEY not configured. Game search will not work. ' +
    'Add VITE_RAWG_API_KEY to your .env file.'
  );
}