import { GameModalHeader } from './modal-header';
import { GameDetails } from './details';
import { BacklogButtons } from './backlog-buttons';
import type { GameModalProps } from '../../types/game-modal';

export function GameModal({ 
  game, 
  isOpen, 
  onClose, 
  onToggleRoulette, 
  isInRoulette 
}: GameModalProps) {
  if (!isOpen || !game) {
    return null;
  }

  const handleToggleRoulette = () => {
    if (onToggleRoulette && game) {
      onToggleRoulette(game);
    }
  };

  // Previne scroll do body quando o modal está aberto
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="
        fixed 
        inset-0 
        bg-black/50 
        backdrop-blur-sm
        flex 
        items-center 
        justify-center 
        p-2 sm:p-4 
        z-50
        overflow-y-auto
      "
      onClick={handleBackdropClick}
    >
      <div className="
        bg-white 
        rounded-lg sm:rounded-xl 
        w-full 
        max-w-sm sm:max-w-2xl lg:max-w-4xl
        max-h-[95vh] sm:max-h-[90vh]
        overflow-y-auto
        shadow-2xl
        my-auto
      ">
        <GameModalHeader 
          gameName={game.name} 
          onClose={onClose} 
        />
        <GameDetails game={game} />
        <BacklogButtons 
          inRoleta={isInRoulette}
          onToggleRoleta={handleToggleRoulette}
        />
      </div>
    </div>
  );
}
