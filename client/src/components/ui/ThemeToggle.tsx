import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const options = [
        { value: 'light' as const, icon: Sun, label: 'Claro' },
        { value: 'dark' as const, icon: Moon, label: 'Escuro' },
        { value: 'system' as const, icon: Monitor, label: 'Sistema' },
    ];

    return (
        <div className="flex items-center gap-1 p-1 bg-bg-tertiary rounded-xl">
            {options.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => setTheme(value)}
                    className={`
            p-2 rounded-lg transition-all duration-200
            ${theme === value
                            ? 'bg-accent text-white shadow-sm'
                            : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                        }
          `}
                    title={label}
                >
                    <Icon size={18} />
                </button>
            ))}
        </div>
    );
}
