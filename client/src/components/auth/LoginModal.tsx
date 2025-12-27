import { useState } from 'react';
import { X, Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { isSupabaseConfigured } from '../../lib/supabase';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const { signInWithGoogle, signInWithGitHub, signInWithEmail, signUpWithEmail } = useAuth();
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Email Auth State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    if (!isOpen) return null;

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSupabaseConfigured()) {
            setError('Supabase não está configurado. Configure as variáveis de ambiente.');
            return;
        }

        if (!email || !password) {
            setError('Preencha todos os campos');
            return;
        }

        setIsLoading('email');
        setError(null);

        try {
            if (isSignUp) {
                await signUpWithEmail(email, password);
                // Usually Supabase requires email confirmation, so we might want to show a message
                setError('Verifique seu email para confirmar o cadastro!');
                // Don't close modal immediately on signup so user sees the message
                // Or if auto-confirm is on, we are good. Assuming verify needed for now or just success.
                // If successful login/signup typically redirects or updates auth state which closes modal
            } else {
                await signInWithEmail(email, password);
            }
            // Success usually triggers auth state change which might close modal if controlled by parent
            // But if we need to close manually:
            onClose();
        } catch (err: any) {
            setError(err.message || 'Erro ao realizar autenticação');
        } finally {
            setIsLoading(null);
        }
    };

    const handleGoogleLogin = async () => {
        if (!isSupabaseConfigured()) {
            setError('Supabase não está configurado. Configure as variáveis de ambiente.');
            return;
        }

        setIsLoading('google');
        setError(null);
        try {
            await signInWithGoogle();
        } catch {
            setError('Erro ao fazer login com Google');
        } finally {
            setIsLoading(null);
        }
    };

    const handleGitHubLogin = async () => {
        if (!isSupabaseConfigured()) {
            setError('Supabase não está configurado. Configure as variáveis de ambiente.');
            return;
        }

        setIsLoading('github');
        setError(null);
        try {
            await signInWithGitHub();
        } catch {
            setError('Erro ao fazer login com GitHub');
        } finally {
            setIsLoading(null);
        }
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div
                    className="bg-bg-secondary rounded-2xl shadow-2xl w-full max-w-md border border-border overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="relative p-6 pb-4 border-b border-border">
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 p-2 rounded-full hover:bg-bg-tertiary transition-colors text-text-secondary hover:text-text-primary"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-bold text-text-primary text-center">
                            {isSignUp ? 'Crie sua conta' : 'Bem-vindo de volta!'}
                        </h2>
                        <p className="text-text-secondary text-center mt-2">
                            {isSignUp
                                ? 'Comece a organizar sua coleção de jogos'
                                : 'Entre para salvar seu progresso e acessar sua coleção'}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                        {error && (
                            <div className={`p-3 rounded-lg border text-sm text-center ${error.includes('Verifique')
                                    ? 'bg-green-500/10 border-green-500/30 text-green-500'
                                    : 'bg-red-500/10 border-red-500/30 text-red-500'
                                }`}>
                                {error}
                            </div>
                        )}

                        {!isSupabaseConfigured() && (
                            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 dark:text-yellow-400 text-sm text-center">
                                Modo offline - Configure o Supabase para fazer login
                            </div>
                        )}

                        {/* Email Form */}
                        <form onSubmit={handleEmailAuth} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-secondary">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-bg-tertiary border border-border rounded-xl py-2.5 pl-10 pr-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                                        placeholder="seu@email.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-secondary">Senha</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-bg-tertiary border border-border rounded-xl py-2.5 pl-10 pr-12 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                                        placeholder="••••••••"
                                        required
                                        minLength={6}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-primary transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading !== null}
                                className="w-full flex items-center justify-center gap-2 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading === 'email' ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    isSignUp ? 'Criar conta' : 'Entrar'
                                )}
                            </button>
                        </form>

                        <div className="relative flex items-center justify-center py-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border"></div>
                            </div>
                            <span className="relative bg-bg-secondary px-4 text-xs text-text-muted uppercase">
                                Ou continue com
                            </span>
                        </div>

                        {/* Social Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={handleGoogleLogin}
                                disabled={isLoading !== null}
                                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-border rounded-xl font-medium text-text-primary hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading === 'google' ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                )}
                                <span className="hidden sm:inline">Google</span>
                            </button>

                            <button
                                onClick={handleGitHubLogin}
                                disabled={isLoading !== null}
                                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#24292F] text-white border border-[#24292F] rounded-xl font-medium hover:bg-[#24292F]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading === 'github' ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                                        />
                                    </svg>
                                )}
                                <span className="hidden sm:inline">GitHub</span>
                            </button>
                        </div>

                        {/* Footer Toggle */}
                        <div className="pt-2 text-center text-sm">
                            <span className="text-text-secondary">
                                {isSignUp ? 'Já tem uma conta?' : 'Não tem uma conta?'}
                            </span>{' '}
                            <button
                                onClick={() => {
                                    setIsSignUp(!isSignUp);
                                    setError(null);
                                    setEmail('');
                                    setPassword('');
                                }}
                                className="font-medium text-accent hover:underline focus:outline-none"
                            >
                                {isSignUp ? 'Fazer login' : 'Inscreva-se'}
                            </button>
                        </div>

                        <div className="px-6 pb-2">
                            <p className="text-xs text-text-muted text-center leading-relaxed">
                                Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
