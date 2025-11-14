import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans]
      },
      colors: {
        brand: {
          DEFAULT: '#0F172A',
          accent: '#6366F1',
          subtle: '#E0E7FF'
        }
      }
    }
  },
  plugins: []
};

export default config;
