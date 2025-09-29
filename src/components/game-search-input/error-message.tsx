import type { ErrorMessageProps } from "../../types/game-input";

export function ErrorMessage({ error, onDismiss }:ErrorMessageProps) {
  if (!error) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-3 bg-red-50 border border-red-200 rounded-xl p-4 text-center text-red-600">
      {error}
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-2 text-red-400 hover:text-red-600"
          aria-label="Fechar erro"
        >
          ✕
        </button>
      )}
    </div>
  );
}

