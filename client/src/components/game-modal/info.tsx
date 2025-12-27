import type { GameInfoProps } from '../../types/game-modal';
import { formatDate } from '../../utils/date';
import { Calendar, Award } from 'lucide-react';

export function GameInfo({ released, metacritic }: GameInfoProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {released && (
        <div className="flex items-start sm:items-center gap-2">
          <Calendar className="text-gray-500 flex-shrink-0 mt-0.5 sm:mt-0" size={18} />
          <span className="text-sm sm:text-base text-gray-700">
            <strong className="block sm:inline">Data de lançamento:</strong>
            <span className="block sm:inline sm:ml-1">{formatDate(released)}</span>
          </span>
        </div>
      )}
      
      {metacritic && (
        <div className="flex items-start sm:items-center gap-2">
          <Award className="text-green-500 flex-shrink-0 mt-0.5 sm:mt-0" size={18} />
          <span className="text-sm sm:text-base text-gray-700">
            <strong className="block sm:inline">Metacritic:</strong>
            <span className="block sm:inline sm:ml-1">{metacritic}</span>
          </span>
        </div>
      )}
    </div>
  );
}
