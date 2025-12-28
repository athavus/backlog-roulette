import { Search } from "lucide-react";
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
      mt-4
      bg-white/95 
      backdrop-blur-md 
      rounded-2xl
      shadow-2xl 
      p-8
      text-center 
      border-2 border-blue-50
      animate-in fade-in slide-in-from-top-4 duration-300
    ">
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-400">
        <Search size={32} />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 font-bold">
        Results // 0
      </p>
      <p className="text-gray-700 font-medium">
        No games found for <span className="text-blue-600">"{searchTerm}"</span>
      </p>
    </div>
  );
}
