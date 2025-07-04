import { Calendar, Award } from 'lucide-react';
import { formatDate } from '../../utils/date';

import type { GameInfoProps } from '../../types/game-modal';

export const GameInfo: React.FC<GameInfoProps> = ({ released, metacritic }) => {
  return (
    <div className="space-y-4">
      {released && (
        <div className="flex items-center gap-2">
          <Calendar className="text-gray-500" size={20} />
          <span className="text-gray-700">
            <strong>Data de lançamento:</strong> {formatDate(released)}
          </span>
        </div>
      )}
      
      {metacritic && (
        <div className="flex items-center gap-2">
          <Award className="text-green-500" size={20} />
          <span className="text-gray-700">
            <strong>Metacritic:</strong> {metacritic}
          </span>
        </div>
      )}
    </div>
  );
};
