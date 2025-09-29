import type { SearchInputProps } from '../../types/game-input';

export function SearchInput({ value, onChange, onFocus, onBlur, onKeyDown, showSuggestions, placeholder = "Digite o nome do jogo...", className = ""}:SearchInputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg outline-none ${className}`}
      aria-label="Buscar jogos"
      aria-expanded={showSuggestions}
      aria-autocomplete="list"
    />
  );
}

