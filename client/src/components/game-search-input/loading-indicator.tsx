import { Loader2 } from 'lucide-react';
import type { LoadingIndicatorProps } from '../../types/game-input';

export function LoadingIndicator({ visible }: LoadingIndicatorProps) {
  if (!visible) {
    return null;
  }

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-accent">
      <Loader2 className="w-5 h-5 animate-spin" />
    </div>
  );
}
