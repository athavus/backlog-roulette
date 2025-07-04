import { Globe } from 'lucide-react';

import type { GamePlatformsProps } from '../../types/game-modal';

export const GamePlatforms: React.FC<GamePlatformsProps> = ({ platforms }) => {
  if (!platforms || platforms.length === 0) return null;

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
        <Globe className="text-gray-500" size={20} />
        Plataformas
      </h3>
      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => (
          <span
            key={platform.platform.id}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            {platform.platform.name}
          </span>
        ))}
      </div>
    </div>
  );
};