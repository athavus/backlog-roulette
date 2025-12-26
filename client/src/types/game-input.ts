import type { Key } from "react";

export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  genres: {
    [x: string]: Key | null | undefined; name: string 
}[];
  platforms: { platform: {
    id: any; name: string 
} }[];
  metacritic?: number;
}

export interface APIResponse {
  count: number;
  results: Game[];
}

export interface SuggestionsListProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
  visible: boolean;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  showSuggestions: boolean;
  placeholder?: string;
  className?: string;
}

export interface LoadingIndicatorProps {
  visible: boolean;
  message?: string;
}

export interface GameSearchInputProps {
  onGameSelect?: (game: Game) => void;
  placeholder?: string;
  className?: string;
}

export interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
}

export interface ErrorMessageProps {
  error: string | null;
  onDismiss?: () => void;
}

export interface EmptyStateProps {
  searchTerm: string;
  visible: boolean;
}
