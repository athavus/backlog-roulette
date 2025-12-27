import { Globe } from 'lucide-react';
import type { GamePlatformsProps } from '../../types/game-modal';

export function GamePlatforms({ platforms }: GamePlatformsProps) {
  if (!platforms || platforms.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="
        font-semibold 
        text-gray-900 
        mb-2 
        flex 
        items-center 
        gap-2
        text-sm sm:text-base
      ">
        <Globe className="text-gray-500 flex-shrink-0" size={18} />
        Plataformas
      </h3>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {platforms.map((platform) => (
          <span
            key={platform.platform.id}
            className="
              px-2.5 py-1 
              sm:px-3 sm:py-1 
              bg-gray-100 
              text-gray-700 
              rounded-full 
              text-xs sm:text-sm
              whitespace-nowrap
            "
          >
            {platform.platform.name}
          </span>
        ))}
      </div>
    </div>
  );
}
