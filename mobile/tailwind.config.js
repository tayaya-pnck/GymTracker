/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './App.tsx',
    './index.js',
  ],
  theme: {
    extend: {
      colors: {
        // Obsidian Forge Theme
        background: {
          primary: '#0D0D0F',
          secondary: '#1A1A1E',
          tertiary: '#252529',
        },
        surface: {
          elevated: '#2D2D33',
        },
        text: {
          primary: '#FAFAFA',
          secondary: '#A1A1A6',
          muted: '#6B6B70',
        },
        accent: {
          primary: '#FF6B35',
          glow: '#FF8C5A',
        },
        success: '#34D399',
        warning: '#FBBF24',
        error: '#F87171',
        border: '#3A3A40',
        // Muscle group colors
        muscle: {
          chest: '#FF6B35',
          back: '#34D399',
          legs: '#60A5FA',
          shoulder: '#A78BFA',
          arms: '#F472B6',
          core: '#FBBF24',
          cardio: '#F87171',
        },
      },
      fontSize: {
        display: ['34px', { lineHeight: '41px', fontWeight: '700' }],
        h1: ['28px', { lineHeight: '34px', fontWeight: '700' }],
        h2: ['22px', { lineHeight: '28px', fontWeight: '600' }],
        h3: ['18px', { lineHeight: '24px', fontWeight: '600' }],
        body: ['16px', { lineHeight: '22px', fontWeight: '400' }],
        'body-small': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        caption: ['12px', { lineHeight: '16px', fontWeight: '500' }],
        button: ['16px', { lineHeight: '20px', fontWeight: '600' }],
      },
      borderRadius: {
        card: '16px',
        button: '12px',
        input: '12px',
      },
      spacing: {
        4.5: '18px',
        13: '52px',
      },
    },
  },
  plugins: [],
};