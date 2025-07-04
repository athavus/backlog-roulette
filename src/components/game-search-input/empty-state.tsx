import type { EmptyStateProps } from "../../types/game-input";

export const EmptyState: React.FC<EmptyStateProps> = ({
  searchTerm,
  visible,
}) => {
  if (!visible) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-6 text-center text-gray-600">
      Nenhum jogo encontrado para "{searchTerm}"
    </div>
  );
};