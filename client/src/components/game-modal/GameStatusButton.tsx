import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Gamepad2, Play, Trophy, XCircle } from 'lucide-react';

export type GameStatus = 'BACKLOG' | 'IN_PROGRESS' | 'COMPLETED' | 'DROPPED';

interface GameStatusButtonProps {
    status: GameStatus;
    onChange: (status: GameStatus) => void;
    disabled?: boolean;
}

const statusConfig = {
    BACKLOG: {
        label: 'No Backlog',
        icon: Gamepad2,
        className: 'status-backlog',
    },
    IN_PROGRESS: {
        label: 'Jogando',
        icon: Play,
        className: 'status-in-progress',
    },
    COMPLETED: {
        label: 'Zerado',
        icon: Trophy,
        className: 'status-completed',
    },
    DROPPED: {
        label: 'Abandonado',
        icon: XCircle,
        className: 'status-dropped',
    },
};

export function GameStatusButton({ status, onChange, disabled }: GameStatusButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const currentStatus = statusConfig[status];
    const Icon = currentStatus.icon;

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`
          flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all
          ${currentStatus.className}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}
        `}
            >
                <Icon size={16} />
                {currentStatus.label}
                <ChevronDown
                    size={14}
                    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute left-0 top-full mt-2 w-48 bg-bg-secondary rounded-xl shadow-lg border border-border overflow-hidden z-50 animate-slide-down">
                    {(Object.entries(statusConfig) as [GameStatus, typeof statusConfig.BACKLOG][]).map(
                        ([value, config]) => {
                            const ItemIcon = config.icon;
                            return (
                                <button
                                    key={value}
                                    onClick={() => {
                                        onChange(value);
                                        setIsOpen(false);
                                    }}
                                    className={`
                    w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors
                    ${status === value
                                            ? 'bg-bg-tertiary text-text-primary'
                                            : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
                                        }
                  `}
                                >
                                    <ItemIcon size={16} className={status === value ? '' : 'opacity-60'} />
                                    {config.label}
                                </button>
                            );
                        }
                    )}
                </div>
            )}
        </div>
    );
}
