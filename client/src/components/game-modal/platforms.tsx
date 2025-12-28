import type { GamePlatformsProps } from '../../types/game-modal';

export function GamePlatforms({ platforms }: GamePlatformsProps) {
  if (!platforms || platforms.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border-2 border-blue-50 p-6 rounded-2xl">
      <h3 className="
        font-mono 
        font-bold
        text-gray-400 
        text-[10px]
        uppercase
        tracking-[0.3em]
        mb-4 
        flex 
        items-center 
        gap-2
      ">
        Plataformas
      </h3>
      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => (
          <span
            key={platform.platform.id}
            className="
              px-3 py-1 
              bg-white
              border border-gray-100
              text-gray-600 
              rounded-lg
              text-xs
              font-bold
              whitespace-nowrap
              hover:border-blue-200 hover:text-blue-500 transition-colors
            "
          >
            {platform.platform.name}
          </span>
        ))}
      </div>
    </div>
  );
}
