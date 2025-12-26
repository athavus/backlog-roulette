import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { RatingInput } from './RatingInput';

interface ReviewFormProps {
    initialRating?: number;
    initialContent?: string;
    initialIsPublic?: boolean;
    onSave: (data: { rating: number; content: string; isPublic: boolean }) => Promise<void>;
    onCancel?: () => void;
    disabled?: boolean;
}

export function ReviewForm({
    initialRating = 0,
    initialContent = '',
    initialIsPublic = false,
    onSave,
    onCancel,
    disabled = false,
}: ReviewFormProps) {
    const [rating, setRating] = useState(initialRating);
    const [content, setContent] = useState(initialContent);
    const [isPublic, setIsPublic] = useState(initialIsPublic);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 0) {
            setError('Por favor, dê uma nota para o jogo');
            return;
        }

        setIsSaving(true);
        setError(null);

        try {
            await onSave({ rating, content, isPublic });
        } catch {
            setError('Erro ao salvar avaliação');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                    {error}
                </div>
            )}

            {/* Rating */}
            <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                    Sua avaliação
                </label>
                <RatingInput
                    rating={rating}
                    onChange={setRating}
                    size="lg"
                    disabled={disabled || isSaving}
                />
            </div>

            {/* Review Content */}
            <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                    Comentário (opcional)
                </label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={disabled || isSaving}
                    placeholder="O que você achou do jogo?"
                    rows={4}
                    className="input resize-none"
                />
            </div>

            {/* Public Toggle */}
            <div className="flex items-center justify-between p-3 bg-bg-tertiary rounded-lg">
                <div className="flex items-center gap-3">
                    {isPublic ? (
                        <Eye size={20} className="text-accent" />
                    ) : (
                        <EyeOff size={20} className="text-text-muted" />
                    )}
                    <div>
                        <p className="text-sm font-medium text-text-primary">
                            {isPublic ? 'Avaliação pública' : 'Avaliação privada'}
                        </p>
                        <p className="text-xs text-text-muted">
                            {isPublic
                                ? 'Outros usuários podem ver sua avaliação'
                                : 'Apenas você pode ver sua avaliação'
                            }
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => setIsPublic(!isPublic)}
                    disabled={disabled || isSaving}
                    className={`
            relative w-12 h-6 rounded-full transition-colors
            ${isPublic ? 'bg-accent' : 'bg-bg-tertiary border border-border'}
            ${disabled || isSaving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
                >
                    <span
                        className={`
              absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform
              ${isPublic ? 'left-7' : 'left-1'}
            `}
                    />
                </button>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSaving}
                        className="btn-secondary flex-1"
                    >
                        Cancelar
                    </button>
                )}
                <button
                    type="submit"
                    disabled={disabled || isSaving}
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                    {isSaving ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Salvando...
                        </>
                    ) : (
                        'Salvar avaliação'
                    )}
                </button>
            </div>
        </form>
    );
}
