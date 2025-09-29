//Componentes
import { GameInfo } from './info';
import { GamePlatforms } from './platforms';
import { GameGenres } from './genres';
import { GameImage } from './image';
//Tipos
import type { GameDetailsProps } from '../../types/game-modal';

export function GameDetails({ game }:GameDetailsProps) {
  if (!game) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <GameInfo 
            released={game.released} 
            metacritic={game.metacritic} 
          />
          <GamePlatforms platforms={game.platforms || []} />
          <GameGenres genres={(game.genres || []).filter((genre): genre is { id: number; name: string } => genre && typeof genre.id === 'number' && typeof genre.name === 'string')} />
        </div>
        
        <GameImage
          backgroundImage={game.background_image} 
          gameName={game.name} 
        />
      </div>
    </div>
  );
}

