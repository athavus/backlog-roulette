export interface RouletteGame {
  id: number;
  name: string;
}

export interface RouletteSidebarProps {
  games: RouletteGame[];
  onSpin: () => RouletteGame | null;
  onRemoveGame: (gameId: number) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}
