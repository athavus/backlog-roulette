import type { GameModalHeaderProps } from '../../types/game-modal';
import { X } from 'lucide-react';

export function GameModalHeader({ gameName, onClose }: GameModalHeaderProps) {
  return (
    <div className="
      sticky 
      top-0 
      bg-[#fdfdfd]/80
      backdrop-blur-md
      border-b-4 
      border-blue-600
      px-6 
      py-5
      flex 
      justify-between 
      items-center
      gap-4
      z-20
    ">
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-[0.3em] mb-1">
          Detalhes
        </span>
        <h2 className="
          text-xl sm:text-2xl lg:text-3xl 
          font-mono
          font-bold 
          text-blue-900 
          truncate
          tracking-tighter
          uppercase
        ">
          {gameName}
        </h2>
      </div>
      <button
        onClick={onClose}
        className="
          group
          relative
          w-10 h-10
          flex
          items-center 
          justify-center
          bg-blue-50
          hover:bg-red-50
          border-2
          border-blue-200
          hover:border-red-200
          rounded-xl
          transition-all
          active:scale-95
          flex-shrink-0
        "
        aria-label="Fechar modal"
      >
        <X size={24} className="text-blue-400 group-hover:text-red-500 transition-colors" />
      </button>
    </div>
  );
}
