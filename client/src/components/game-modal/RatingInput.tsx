import { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingInputProps {
    rating: number;
    onChange: (rating: number) => void;
    maxRating?: number;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
}

export function RatingInput({
    rating,
    onChange,
    maxRating = 5,
    size = 'md',
    disabled = false
}: RatingInputProps) {
    const [hoverRating, setHoverRating] = useState(0);

    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
    };

    const displayRating = hoverRating || rating;

    return (
        <div className="star-rating">
            {Array.from({ length: maxRating }, (_, i) => i + 1).map((star) => (
                <button
                    key={star}
                    type="button"
                    disabled={disabled}
                    onClick={() => onChange(star === rating ? 0 : star)}
                    onMouseEnter={() => !disabled && setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`
            star transition-all duration-150
            ${star <= displayRating ? 'filled text-yellow-400' : 'empty text-text-muted'}
            ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110'}
          `}
                >
                    <Star
                        className={sizeClasses[size]}
                        fill={star <= displayRating ? 'currentColor' : 'none'}
                    />
                </button>
            ))}
        </div>
    );
}

interface RatingDisplayProps {
    rating: number;
    maxRating?: number;
    size?: 'sm' | 'md' | 'lg';
    showValue?: boolean;
}

export function RatingDisplay({
    rating,
    maxRating = 5,
    size = 'sm',
    showValue = false
}: RatingDisplayProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };

    return (
        <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
                {Array.from({ length: maxRating }, (_, i) => i + 1).map((star) => (
                    <Star
                        key={star}
                        className={`${sizeClasses[size]} ${star <= rating ? 'text-yellow-400' : 'text-text-muted'}`}
                        fill={star <= rating ? 'currentColor' : 'none'}
                    />
                ))}
            </div>
            {showValue && (
                <span className="text-sm text-text-secondary ml-1">
                    ({rating}/{maxRating})
                </span>
            )}
        </div>
    );
}
