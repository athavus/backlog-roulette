import type { GameInfoProps } from '../../types/game-modal';
import { formatDate } from '../../utils/date';
import { Calendar, Award } from 'lucide-react';

export function GameInfo({ released, metacritic }: GameInfoProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {released && (
        <div className="bg-white border-2 border-blue-50 p-4 rounded-xl flex items-center gap-4 group hover:border-blue-200 transition-colors">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <Calendar size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Released</span>
            <span className="text-sm font-bold text-gray-700">{formatDate(released)}</span>
          </div>
        </div>
      )}

      {metacritic && (
        <div className="bg-white border-2 border-blue-50 p-4 rounded-xl flex items-center gap-4 group hover:border-green-200 transition-colors">
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-500 group-hover:bg-green-600 group-hover:text-white transition-all">
            <Award size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Score</span>
            <span className="text-sm font-bold text-gray-700">{metacritic}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
