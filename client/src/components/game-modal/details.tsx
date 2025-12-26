import { GameInfo } from './info';
import { GamePlatforms } from './platforms';
import { GameGenres } from './genres';
import { GameImage } from './image';
import type { GameDetailsProps } from '../../types/game-modal';

export function GameDetails({ game }: GameDetailsProps) {
  if (!game) {
    return null;
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Informações do jogo - aparece primeiro no mobile */}
        <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
          <GameInfo 
            released={game.released} 
            metacritic={game.metacritic} 
          />
          <GamePlatforms platforms={game.platforms || []} />
          <GameGenres 
            genres={(game.genres || []).filter(
              (genre): genre is { id: number; name: string } => 
                genre && typeof genre.id === 'number' && typeof genre.name === 'string'
            )} 
          />
        </div>
        
        {/* Imagem do jogo - aparece primeiro no mobile */}
        <div className="order-1 lg:order-2">
          <GameImage
            backgroundImage={game.background_image} 
            gameName={game.name} 
          />
        </div>
      </div>
    </div>
  );
}
