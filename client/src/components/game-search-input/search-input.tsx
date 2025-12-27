import { Search } from 'lucide-react';
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
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-muted-foreground" />
      </div>
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
          pl-12
          pr-4
          py-3
          sm:py-4
          text-sm 
          sm:text-base
          bg-background
          border 
          border-input
          rounded-sm
          text-foreground
          placeholder:text-muted-foreground
          outline-none 
          focus-visible:ring-2 
          focus-visible:ring-ring
          focus-visible:ring-offset-2
          transition-all
          shadow-sm
          hover:shadow-md
          ${className}
        `}
        aria-label="Buscar jogos"
        aria-expanded={showSuggestions}
        aria-autocomplete="list"
      />
    </div>
  );
}
