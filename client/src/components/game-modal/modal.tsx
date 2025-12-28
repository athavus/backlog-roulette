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
        bg-blue-900/40 
        backdrop-blur-md
        flex 
        items-center 
        justify-center 
        p-2 sm:p-4 
        z-50
        overflow-y-auto
        animate-in fade-in duration-300
      "
      onClick={handleBackdropClick}
    >
      <div className="
        bg-[#fdfdfd] 
        rounded-2xl sm:rounded-3xl 
        w-full 
        max-w-sm sm:max-w-2xl lg:max-w-5xl
        max-h-[95vh] sm:max-h-[90vh]
        overflow-hidden
        shadow-[0_20px_50px_rgba(0,0,0,0.3)]
        border-2 border-blue-100
        my-auto
        flex flex-col
        animate-in zoom-in-95 duration-300
      ">
        <GameModalHeader
          gameName={game.name}
          onClose={onClose}
        />
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <GameDetails game={game} />
        </div>
        <div className="p-6 bg-blue-50/50 border-t border-blue-100">
          <BacklogButtons
            inRoleta={isInRoulette}
            onToggleRoleta={handleToggleRoulette}
          />
        </div>
      </div>
    </div>
  );
}
