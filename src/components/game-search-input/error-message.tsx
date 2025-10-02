import type { ErrorMessageProps } from "../../types/game-input";

export function ErrorMessage({ error, onDismiss }: ErrorMessageProps) {
  if (!error) {
    return null;
  }

  return (
    <div className="
      absolute 
      top-full 
      left-0 
      right-0 
      mt-2 sm:mt-3 
      bg-red-50 
      border border-red-200 
      rounded-lg sm:rounded-xl 
      p-3 sm:p-4 
      text-center 
      text-red-600
      text-sm sm:text-base
      shadow-lg
    ">
      <span className="block sm:inline">{error}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="
            ml-2 
            mt-2 sm:mt-0
            text-red-400 
            hover:text-red-600
            text-lg
            transition-colors
          "
          aria-label="Fechar erro"
        >
          ✕
        </button>
      )}
    </div>
  );
}
