//Tipos
import type { GameImageProps } from '../../types/game-modal';
//Bibliotecas
import { Gamepad2 } from 'lucide-react';


export const GameImage: React.FC<GameImageProps> = ({ 
  backgroundImage, 
  gameName 
}) => {
  return (
    <div className="lg:order-last">
      {backgroundImage ? (
        <img
          src={backgroundImage}
          alt={gameName}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
          <Gamepad2 className="text-gray-400" size={48} />
          <span className="text-gray-500 ml-2">Sem imagem disponível</span>
        </div>
      )}
    </div>
  );
};
