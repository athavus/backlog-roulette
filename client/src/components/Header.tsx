import { useState } from 'react';
import { LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggle } from './ui/ThemeToggle';
import { UserMenu } from './auth/UserMenu';
import { LoginModal } from './auth/LoginModal';

export function Header() {
    const { isAuthenticated, loading } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-40 glass">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                                <span className="text-xl font-bold text-white">🎮</span>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-lg font-bold gradient-text">
                                    Backlog Roulette
                                </h1>
                                <p className="text-xs text-text-muted -mt-0.5">
                                    Decida o que jogar
                                </p>
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-3">
                            <ThemeToggle />

                            {loading ? (
                                <div className="w-8 h-8 rounded-full skeleton" />
                            ) : isAuthenticated ? (
                                <UserMenu />
                            ) : (
                                <button
                                    onClick={() => setShowLoginModal(true)}
                                    className="flex items-center gap-2 px-4 py-2 btn-primary text-sm"
                                >
                                    <LogIn size={18} />
                                    <span className="hidden sm:inline">Entrar</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </>
    );
}
