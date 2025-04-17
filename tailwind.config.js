/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 1s ease forwards',
        float: 'float 8s ease-in-out infinite',
        'float-delayed': 'float 10s ease-in-out 1s infinite',
        'float-slow': 'float 12s ease-in-out 2s infinite',
        backgroundZoom: 'backgroundZoom 20s ease-in-out infinite',
        spinOnce: 'spinOnce 0.8s ease-in-out',
        wave: 'wave 25s infinite linear',
        gradientShift: 'gradientShift 15s infinite ease',
        gradientShiftAlt: 'gradientShiftAlt 12s infinite ease',
        pulse: 'pulseRadial 8s infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
