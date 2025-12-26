import type { Game } from './game-input';

export interface GameModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleRoulette: (game: Game) => void;
  isInRoulette: boolean;
}

interface Platform {
  platform: {
    id: number;
    name: string;
  };
}

export interface GamePlatformsProps {
  platforms: Platform[];
}

export interface GameModalHeaderProps {
  gameName: string;
  onClose: () => void;
}

export interface GameInfoProps {
  released?: string;
  metacritic?: number;
}

export interface GameImageProps {
  backgroundImage?: string;
  gameName: string;
}

interface Genre {
  id: number;
  name: string;
}

export interface GameGenresProps {
  genres: Genre[];
}

export interface GameDetailsProps {
  game: GameModalProps['game'];
}
