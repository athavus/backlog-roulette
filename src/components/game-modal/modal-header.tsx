//Tipos
import type { GameModalHeaderProps } from '../../types/game-modal';
//Bibliotecas
import { X } from 'lucide-react';


export const GameModalHeader: React.FC<GameModalHeaderProps> = ({ 
  gameName, 
  onClose 
}) => {
  return (
    <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-900 truncate">{gameName}</h2>
      <button
        onClick={onClose}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X size={24} />
      </button>
    </div>
  );
};
