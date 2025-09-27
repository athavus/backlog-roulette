import type { SearchInputProps } from '../../types/game-input';

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  showSuggestions,
  placeholder = "Digite o nome do jogo...",
  className = "",
}) => {
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
};
