export const API_CONFIG = {
  BASE_URL: "https://api.rawg.io/api/games",
  API_KEY: import.meta.env.VITE_RAWG_API_KEY,
  DEFAULT_PAGE_SIZE: 5,
  DEBOUNCE_DELAY: 300,
  MIN_SEARCH_LENGTH: 2,
} as const;
