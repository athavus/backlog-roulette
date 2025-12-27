import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from './button';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const options = [
        { value: 'light' as const, icon: Sun, label: 'Claro' },
        { value: 'dark' as const, icon: Moon, label: 'Escuro' },
        { value: 'system' as const, icon: Monitor, label: 'Sistema' },
    ];

    return (
        <div className="flex items-center gap-1 rounded-sm border bg-card p-1">
            {options.map(({ value, icon: Icon, label }) => (
                <Button
                    key={value}
                    variant={theme === value ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setTheme(value)}
                    className="h-8 w-8 p-0"
                    title={label}
                >
                    <Icon size={16} />
                </Button>
            ))}
        </div>
    );
}
