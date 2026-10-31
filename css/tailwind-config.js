/**
 * ==========================================================================
 * SEGMENT: KONFIGURASI TEMA TAILWIND CSS
 * File: css/tailwind-config.js
 * ==========================================================================
 * Mengatur custom warna, font pixel & mono, serta animasi untuk Bio Links Hub.
 * ==========================================================================
 */

tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                bgDark: '#081416',
                cardDark: 'rgba(8, 22, 24, 0.82)',
                cardHover: 'rgba(14, 36, 40, 0.92)',
                borderDark: 'rgba(110, 224, 192, 0.25)',
                borderHover: 'rgba(160, 245, 220, 0.6)',
                orientalRed: '#dc2626',
                orientalGold: '#f59e0b',
                tealGlow: '#4cdbbd',
            },
            fontFamily: {
                pixel: ['Pixelify Sans', 'monospace'],
                mono: ['Space Mono', 'Courier New', 'monospace'],
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'marquee': 'marquee 28s linear infinite',
                'float-soft': 'float 4s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-6px)' }
                },
                pulseGlow: {
                    '0%, 100%': { opacity: '0.8' },
                    '50%': { opacity: '0.3' }
                }
            }
        }
    }
};
