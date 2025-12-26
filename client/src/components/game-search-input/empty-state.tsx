import { SearchX } from 'lucide-react';
import type { EmptyStateProps } from '../../types/game-input';

export function EmptyState({ searchTerm, visible }: EmptyStateProps) {
  if (!visible) {
    return null;
  }

  return (
    <div
      className="
        absolute 
        top-full 
        left-0 
        right-0 
        mt-2 sm:mt-3 
        bg-bg-secondary
        border
        border-border
        backdrop-blur-md 
        rounded-xl sm:rounded-2xl 
        shadow-xl 
        p-6 sm:p-8 
        text-center
        z-50
        animate-slide-down
      "
    >
      <div className="w-12 h-12 rounded-xl bg-bg-tertiary flex items-center justify-center mx-auto mb-3">
        <SearchX className="w-6 h-6 text-text-muted" />
      </div>
      <p className="text-text-primary font-medium mb-1">
        Nenhum jogo encontrado
      </p>
      <p className="text-text-muted text-sm">
        Não encontramos resultados para "{searchTerm}"
      </p>
    </div>
  );
}
