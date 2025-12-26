import type { GameImageProps } from '../../types/game-modal';
import { Gamepad2 } from 'lucide-react';

export function GameImage({ backgroundImage, gameName }: GameImageProps) {
  return (
    <div className="lg:order-last">
      {backgroundImage ? (
        <img
          src={backgroundImage}
          alt={gameName}
          className="
            w-full 
            h-auto 
            max-h-[300px] sm:max-h-[400px] lg:max-h-none
            object-cover lg:object-contain
            rounded-lg 
            shadow-lg
          "
        />
      ) : (
        <div className="
          w-full 
          h-48 sm:h-64 
          bg-gray-200 
          rounded-lg 
          flex 
          flex-col
          items-center 
          justify-center
          gap-2
        ">
          <Gamepad2 className="text-gray-400" size={40} />
          <span className="text-gray-500 text-sm sm:text-base text-center px-4">
            Sem imagem disponível
          </span>
        </div>
      )}
    </div>
  );
}
