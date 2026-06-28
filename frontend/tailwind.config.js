export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        slate: {
          950: 'rgb(var(--slate-950-rgb) / <alpha-value>)',
          900: 'rgb(var(--slate-900-rgb) / <alpha-value>)',
          800: 'rgb(var(--slate-800-rgb) / <alpha-value>)',
          700: 'rgb(var(--slate-700-rgb) / <alpha-value>)',
          600: 'rgb(var(--slate-600-rgb) / <alpha-value>)',
          500: 'rgb(var(--slate-500-rgb) / <alpha-value>)',
          400: 'rgb(var(--slate-400-rgb) / <alpha-value>)',
          300: 'rgb(var(--slate-300-rgb) / <alpha-value>)',
          200: 'rgb(var(--slate-200-rgb) / <alpha-value>)',
          100: 'rgb(var(--slate-100-rgb) / <alpha-value>)',
          50: 'rgb(var(--slate-50-rgb) / <alpha-value>)'
        },
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        secondaryAccent: 'rgb(var(--secondary-accent-rgb) / <alpha-value>)',
        hoverAccent: 'rgb(var(--hover-accent-rgb) / <alpha-value>)',
        success: 'rgb(var(--success-rgb) / <alpha-value>)',
        warning: 'rgb(var(--warning-rgb) / <alpha-value>)',
        danger: 'rgb(var(--danger-rgb) / <alpha-value>)',
        electric: 'rgb(var(--electric-rgb) / <alpha-value>)',
        neon: 'rgb(var(--neon-rgb) / <alpha-value>)'
      },
      boxShadow: {
        soft: '0 12px 34px rgb(var(--shadow-rgb) / 0.28), inset 0 1px 0 rgb(255 255 255 / 0.03)'
      }
    }
  },
  plugins: []
};
