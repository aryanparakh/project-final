export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2874F0',
          light: '#3B82F6',
          dark: '#1E40AF',
        },
        secondary: {
          DEFAULT: '#FB641B',
          light: '#FF9F43',
          dark: '#E67E22',
        },
        accent: {
          DEFAULT: '#FFE500',
          light: '#FEF9C3',
          dark: '#CA8A04',
        },
        success: {
          DEFAULT: '#388E3C',
          light: '#4ADE80',
          dark: '#166534',
        },
        warning: {
          DEFAULT: '#FF9F00',
          light: '#FBBF24',
          dark: '#B45309',
        },
        error: {
          DEFAULT: '#D32F2F',
          light: '#F87171',
          dark: '#B91C1C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'nav': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-in',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      spacing: {
        '18': '4.5rem',
        '68': '17rem',
        '92': '23rem',
      },
    },
  },
  plugins: [],
}