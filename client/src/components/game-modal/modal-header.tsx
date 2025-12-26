import type { GameModalHeaderProps } from '../../types/game-modal';
import { X } from 'lucide-react';

export function GameModalHeader({ gameName, onClose }: GameModalHeaderProps) {
  return (
    <div className="
      sticky 
      top-0 
      bg-white 
      border-b 
      px-4 sm:px-6 
      py-3 sm:py-4 
      flex 
      justify-between 
      items-center
      gap-3
      z-10
    ">
      <h2 className="
        text-lg sm:text-xl lg:text-2xl 
        font-bold 
        text-gray-900 
        truncate
        flex-1
        min-w-0
      ">
        {gameName}
      </h2>
      <button
        onClick={onClose}
        className="
          p-2 
          hover:bg-gray-100 
          active:bg-gray-200
          rounded-full 
          transition-colors
          flex-shrink-0
        "
        aria-label="Fechar modal"
      >
        <X size={20} className="sm:w-6 sm:h-6" />
      </button>
    </div>
  );
}
