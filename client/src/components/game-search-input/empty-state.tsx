import type { EmptyStateProps } from "../../types/game-input";

export function EmptyState({ searchTerm, visible }: EmptyStateProps) {
  if (!visible) {
    return null;
  }

  return (
    <div className="
      absolute 
      top-full 
      left-0 
      right-0 
      mt-2 sm:mt-3 
      bg-white/95 
      backdrop-blur-md 
      rounded-lg sm:rounded-xl 
      shadow-2xl 
      p-4 sm:p-6 
      text-center 
      text-gray-600
      text-sm sm:text-base
    ">
      <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">🎮</div>
      <p className="break-words px-2">
        Nenhum jogo encontrado para <span className="font-semibold">"{searchTerm}"</span>
      </p>
    </div>
  );
}
