const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

function kebabCase(str) {
  return str.replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, function (match) {
    return '-' + match.toLowerCase();
  });
}

const kebabCaseColors = {};
for (const key in colors) {
  kebabCaseColors[kebabCase(key)] = colors[key];
}

module.exports = {
  mode: 'jit',
  purge: {
    content: [
      `components/**/*.{vue,js}`,
      `layouts/**/*.vue`,
      `pages/**/*.vue`,
      `plugins/**/*.{js,ts}`,
      `nuxt.config.{js,ts}`,
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      // Build your palette here
      ...kebabCaseColors,
      transparent: 'transparent',
      current: 'currentColor',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.size-xs': {
          height: '0.75rem',
          width: '0.75rem',
        },
        '.size-sm': {
          height: '0.875rem',
          width: '0.875rem',
        },
        '.size-base': {
          height: '1rem',
          width: '1rem',
        },
        '.size-lg': {
          height: '1.125rem',
          width: '1.125rem',
        },
        '.size-xl': {
          height: '1.25rem',
          width: '1.25rem',
        },
        '.size-2xl': {
          height: '1.5rem',
          width: '1.5rem',
        },
        '.size-3xl': {
          height: '1.875rem',
          width: '1.875rem',
        },
        '.size-4xl': {
          height: '2.25rem',
          width: '2.25rem',
        },
        '.size-5xl': {
          height: '3rem',
          width: '3rem',
        },
        '.size-6xl': {
          height: '3.75rem',
          width: '3.75rem',
        },
        '.size-7xl': {
          height: '4.5rem',
          width: '4.5rem',
        },
        '.size-8xl': {
          height: '6rem',
          width: '6rem',
        },
        '.size-9xl': {
          height: '8rem',
          width: '8rem',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
};
