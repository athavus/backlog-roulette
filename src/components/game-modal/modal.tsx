import { GameModalHeader } from './modal-header';
import { GameDetails } from './details';
import { BacklogButtons } from './backlog-buttons';
import type { GameModalProps } from '../../types/game-modal';

export const GameModal: React.FC<GameModalProps> = ({ 
  game, 
  isOpen, 
  onClose,
  onToggleRoulette,
  isInRoulette = false
}) => {
  if (!isOpen || !game) return null;

  const handleToggleRoulette = () => {
    if (onToggleRoulette && game) {
      onToggleRoulette({ id: game.id, name: game.name });
    }
  };

  const handleReview = () => {
    // Implementar funcionalidade de review
    console.log('Review do jogo:', game.name);
  };

  const handleAddToList = () => {
    // Implementar funcionalidade de adicionar à lista
    console.log('Adicionar à lista:', game.name);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <GameModalHeader 
          gameName={game.name} 
          onClose={onClose} 
        />
        <GameDetails game={game} />
        <BacklogButtons 
          inRoleta={isInRoulette}
          onToggleRoleta={handleToggleRoulette}
          onReview={handleReview}
          onAddToList={handleAddToList}
        />
      </div>
    </div>
  );
};
