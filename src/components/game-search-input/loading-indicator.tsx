import type { LoadingIndicatorProps } from '../../types/game-input';

export function LoadingIndicator({ visible, message = "Buscando..."}:LoadingIndicatorProps) {
  if (!visible) return null;

  return (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm">
      {message}
    </div>
  );
}
