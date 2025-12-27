import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';
type AccentColor = 'blue' | 'red' | 'green' | 'purple' | 'orange' | 'pink';

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: 'light' | 'dark';
    setTheme: (theme: Theme) => void;
    accentColor: AccentColor;
    setAccentColor: (color: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'backlog-roulette-theme';
const ACCENT_STORAGE_KEY = 'backlog-roulette-accent';

function getSystemTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(() => {
        if (typeof window === 'undefined') return 'system';
        const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
        return stored || 'system';
    });

    const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
        if (typeof window === 'undefined') return 'blue';
        const stored = localStorage.getItem(ACCENT_STORAGE_KEY) as AccentColor | null;
        return stored || 'blue';
    });

    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
        if (theme === 'system') return getSystemTheme();
        return theme;
    });

    useEffect(() => {
        const updateResolvedTheme = () => {
            if (theme === 'system') {
                setResolvedTheme(getSystemTheme());
            } else {
                setResolvedTheme(theme);
            }
        };

        updateResolvedTheme();

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === 'system') {
                setResolvedTheme(getSystemTheme());
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', resolvedTheme);
    }, [resolvedTheme]);

    useEffect(() => {
        document.documentElement.setAttribute('data-accent', accentColor);
    }, [accentColor]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    };

    const setAccentColor = (newAccentColor: AccentColor) => {
        setAccentColorState(newAccentColor);
        localStorage.setItem(ACCENT_STORAGE_KEY, newAccentColor);
    };

    return (
        <ThemeContext.Provider value={{
            theme,
            resolvedTheme,
            setTheme,
            accentColor,
            setAccentColor
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
