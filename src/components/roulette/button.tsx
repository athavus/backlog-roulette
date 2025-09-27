import React from 'react';
import { Shuffle } from 'lucide-react';

interface RouletteButtonProps {
  gameCount: number;
  onClick: () => void;
}

export const RouletteButton: React.FC<RouletteButtonProps> = ({
  gameCount,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors z-40"
      title="Abrir Roleta"
    >
      <div className="relative">
        <Shuffle className="w-6 h-6" />
        {gameCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {gameCount > 9 ? '9+' : gameCount}
          </span>
        )}
      </div>
    </button>
  );
};
