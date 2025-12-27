import { Palette } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from './button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './popover';
import { Separator } from './separator';

const accentColors = [
  { name: 'blue', label: 'Azul', color: 'hsl(221.2 83.2% 53.3%)' },
  { name: 'red', label: 'Vermelho', color: 'hsl(0 84.2% 60.2%)' },
  { name: 'green', label: 'Verde', color: 'hsl(142.1 76.2% 36.3%)' },
  { name: 'purple', label: 'Roxo', color: 'hsl(262.1 83.3% 57.8%)' },
  { name: 'orange', label: 'Laranja', color: 'hsl(25.7 100% 51%)' },
  { name: 'pink', label: 'Rosa', color: 'hsl(322.2 84% 60.4%)' },
] as const;

export function ColorPicker() {
  const { accentColor, setAccentColor } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="w-9 px-0">
          <Palette className="h-4 w-4" />
          <span className="sr-only">Selecionar cor</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="space-y-1">
          <h4 className="font-medium leading-none">Cor de destaque</h4>
          <p className="text-sm text-muted-foreground">
            Escolha a cor principal da interface
          </p>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-3 gap-2">
          {accentColors.map((color) => (
            <button
              key={color.name}
              onClick={() => setAccentColor(color.name as any)}
              className={`
                relative h-8 w-full rounded-sm border-2 transition-all
                ${accentColor === color.name
                  ? 'border-primary shadow-sm scale-110'
                  : 'border-muted hover:border-muted-foreground/50'
                }
              `}
              style={{ backgroundColor: color.color }}
              title={color.label}
            >
              {accentColor === color.name && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-white shadow-sm" />
                </div>
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
