import type { SearchInputProps } from '../../types/game-input';

export function SearchInput({ 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  onKeyDown, 
  showSuggestions, 
  placeholder = "Digite o nome do jogo...", 
  className = ""
}: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      className={`
        w-full 
        py-2 
        sm:px-4 sm:py-3
        text-sm sm:text-base
        border border-gray-300 
        rounded-lg 
        outline-none 
        focus:ring-2 
        focus:ring-blue-500 
        focus:border-transparent
        transition-all
        ${className}
      `}
      aria-label="Buscar jogos"
      aria-expanded={showSuggestions}
      aria-autocomplete="list"
    />
  );
}
