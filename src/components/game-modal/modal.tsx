//Componentes
import { GameModalHeader } from './modal-header';
import { GameDetails } from './details';
import { BacklogButtons } from './backlog-buttons';
//Tipos
import type { GameModalProps } from '../../types/game-modal';


export const GameModal: React.FC<GameModalProps> = ({ 
  game, 
  isOpen, 
  onClose 
}) => {
  if (!isOpen || !game) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <GameModalHeader 
          gameName={game.name} 
          onClose={onClose} 
        />
        <GameDetails game={game} />
        <BacklogButtons game={game}/>
      </div>
    </div>
  );
};
