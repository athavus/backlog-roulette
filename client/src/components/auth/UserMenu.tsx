import { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function UserMenu() {
    const { user, signOut, isAuthenticated } = useAuth();
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

    if (!isAuthenticated || !user) return null;

    const handleSignOut = async () => {
        await signOut();
        setIsOpen(false);
    };

    const userImage = user.user_metadata?.avatar_url || user.user_metadata?.picture;
    const userName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0];

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-bg-tertiary hover:bg-border transition-colors"
            >
                {userImage ? (
                    <img
                        src={userImage}
                        alt={userName}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                        <User size={16} className="text-white" />
                    </div>
                )}
                <span className="text-sm font-medium text-text-primary hidden sm:block max-w-[120px] truncate">
                    {userName}
                </span>
                <ChevronDown
                    size={16}
                    className={`text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-bg-secondary rounded-xl shadow-lg border border-border overflow-hidden z-50">
                    <div className="p-3 border-b border-border">
                        <p className="text-sm font-medium text-text-primary truncate">{userName}</p>
                        <p className="text-xs text-text-muted truncate">{user.email}</p>
                    </div>

                    <div className="p-1">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors"
                        >
                            <Settings size={16} className="text-text-secondary" />
                            Configurações
                        </button>

                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                            <LogOut size={16} />
                            Sair
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
