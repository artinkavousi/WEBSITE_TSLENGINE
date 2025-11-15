/**
 * Style Tokens System
 * Provides consistent theming across templates and pages
 */

export interface StyleToken {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
  };
  typography: {
    fontFamily: {
      sans: string;
      mono: string;
      heading: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
    };
    lineHeight: {
      tight: string;
      normal: string;
      relaxed: string;
    };
  };
  motion: {
    duration: {
      fast: number;
      normal: number;
      slow: number;
    };
    easing: {
      easeIn: string;
      easeOut: string;
      easeInOut: string;
      elastic: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    glow: string;
  };
}

/**
 * Neon - Cyberpunk style with vibrant colors
 */
export const neonStyle: StyleToken = {
  colors: {
    primary: '#00ffcc',
    secondary: '#ff00ff',
    accent: '#ffcc00',
    background: '#0a0a0a',
    foreground: '#ffffff',
    muted: '#666666',
    border: '#00ffcc33',
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
      mono: '"JetBrains Mono", monospace',
      heading: '"Space Grotesk", sans-serif',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  motion: {
    duration: {
      fast: 0.15,
      normal: 0.3,
      slow: 0.5,
    },
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.2)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.3)',
    glow: '0 0 20px rgba(0, 255, 204, 0.5)',
  },
};

/**
 * Cinematic - Dark and moody with dramatic contrasts
 */
export const cinematicStyle: StyleToken = {
  colors: {
    primary: '#1a1a1a',
    secondary: '#f5f5f5',
    accent: '#ff4444',
    background: '#0a0a0a',
    foreground: '#e5e5e5',
    muted: '#888888',
    border: '#333333',
  },
  typography: {
    fontFamily: {
      sans: '"Inter", system-ui, sans-serif',
      mono: '"Roboto Mono", monospace',
      heading: '"Playfair Display", serif',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    lineHeight: {
      tight: '1.2',
      normal: '1.5',
      relaxed: '1.8',
    },
  },
  motion: {
    duration: {
      fast: 0.2,
      normal: 0.5,
      slow: 0.8,
    },
    easing: {
      easeIn: 'cubic-bezier(0.5, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.5, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '2rem',
    lg: '3rem',
    xl: '4rem',
    '2xl': '6rem',
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.3)',
    md: '0 4px 12px rgba(0, 0, 0, 0.5)',
    lg: '0 12px 24px rgba(0, 0, 0, 0.7)',
    glow: '0 0 30px rgba(255, 68, 68, 0.3)',
  },
};

/**
 * Minimal - Clean and elegant with subtle colors
 */
export const minimalStyle: StyleToken = {
  colors: {
    primary: '#2563eb',
    secondary: '#64748b',
    accent: '#f59e0b',
    background: '#ffffff',
    foreground: '#0f172a',
    muted: '#94a3b8',
    border: '#e2e8f0',
  },
  typography: {
    fontFamily: {
      sans: '"Inter", system-ui, sans-serif',
      mono: '"Source Code Pro", monospace',
      heading: '"Inter", system-ui, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  motion: {
    duration: {
      fast: 0.1,
      normal: 0.2,
      slow: 0.4,
    },
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.15)',
    glow: '0 0 10px rgba(37, 99, 235, 0.3)',
  },
};

/**
 * Retro - Nostalgic 80s/90s aesthetic
 */
export const retroStyle: StyleToken = {
  colors: {
    primary: '#ff6b9d',
    secondary: '#c971ff',
    accent: '#feca57',
    background: '#2d132c',
    foreground: '#f8f8f8',
    muted: '#aa7baa',
    border: '#ff6b9d33',
  },
  typography: {
    fontFamily: {
      sans: '"Press Start 2P", system-ui, sans-serif',
      mono: '"VT323", monospace',
      heading: '"Press Start 2P", cursive',
    },
    fontSize: {
      xs: '0.625rem',
      sm: '0.75rem',
      base: '0.875rem',
      lg: '1rem',
      xl: '1.125rem',
      '2xl': '1.25rem',
      '3xl': '1.5rem',
      '4xl': '2rem',
    },
    lineHeight: {
      tight: '1.5',
      normal: '1.75',
      relaxed: '2',
    },
  },
  motion: {
    duration: {
      fast: 0.1,
      normal: 0.25,
      slow: 0.5,
    },
    easing: {
      easeIn: 'steps(4)',
      easeOut: 'steps(4)',
      easeInOut: 'steps(4)',
      elastic: 'steps(8)',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
  },
  borderRadius: {
    sm: '0',
    md: '0',
    lg: '0',
    full: '0',
  },
  shadows: {
    sm: '4px 4px 0 rgba(0, 0, 0, 0.3)',
    md: '8px 8px 0 rgba(0, 0, 0, 0.3)',
    lg: '12px 12px 0 rgba(0, 0, 0, 0.3)',
    glow: '0 0 20px rgba(255, 107, 157, 0.6)',
  },
};

/**
 * Nature - Organic and earthy tones
 */
export const natureStyle: StyleToken = {
  colors: {
    primary: '#10b981',
    secondary: '#3b82f6',
    accent: '#fbbf24',
    background: '#f9fafb',
    foreground: '#1f2937',
    muted: '#6b7280',
    border: '#d1d5db',
  },
  typography: {
    fontFamily: {
      sans: '"Outfit", system-ui, sans-serif',
      mono: '"IBM Plex Mono", monospace',
      heading: '"Merriweather", serif',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.6',
      relaxed: '1.8',
    },
  },
  motion: {
    duration: {
      fast: 0.15,
      normal: 0.35,
      slow: 0.6,
    },
    easing: {
      easeIn: 'cubic-bezier(0.32, 0, 0.67, 0)',
      easeOut: 'cubic-bezier(0.33, 1, 0.68, 1)',
      easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
      elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
  },
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.08)',
    md: '0 4px 8px rgba(0, 0, 0, 0.12)',
    lg: '0 10px 20px rgba(0, 0, 0, 0.15)',
    glow: '0 0 15px rgba(16, 185, 129, 0.4)',
  },
};

/**
 * Registry of all style tokens
 */
export const styleTokens: Record<string, StyleToken> = {
  neon: neonStyle,
  cinematic: cinematicStyle,
  minimal: minimalStyle,
  retro: retroStyle,
  nature: natureStyle,
};

/**
 * Get style tokens by ID
 * @param styleId - The style ID to retrieve
 * @returns The style tokens, or neon as default
 */
export function getStyleTokens(styleId: string): StyleToken {
  return styleTokens[styleId] || styleTokens.neon;
}

/**
 * List all available style IDs
 * @returns Array of style IDs
 */
export function listStyles(): string[] {
  return Object.keys(styleTokens);
}

/**
 * Convert style tokens to CSS custom properties
 * @param style - Style tokens to convert
 * @returns CSS string with custom properties
 */
export function styleToCSSVariables(style: StyleToken): string {
  return `
    :root {
      --color-primary: ${style.colors.primary};
      --color-secondary: ${style.colors.secondary};
      --color-accent: ${style.colors.accent};
      --color-background: ${style.colors.background};
      --color-foreground: ${style.colors.foreground};
      --color-muted: ${style.colors.muted};
      --color-border: ${style.colors.border};
      
      --font-sans: ${style.typography.fontFamily.sans};
      --font-mono: ${style.typography.fontFamily.mono};
      --font-heading: ${style.typography.fontFamily.heading};
      
      --duration-fast: ${style.motion.duration.fast}s;
      --duration-normal: ${style.motion.duration.normal}s;
      --duration-slow: ${style.motion.duration.slow}s;
      
      --shadow-sm: ${style.shadows.sm};
      --shadow-md: ${style.shadows.md};
      --shadow-lg: ${style.shadows.lg};
      --shadow-glow: ${style.shadows.glow};
    }
  `;
}

