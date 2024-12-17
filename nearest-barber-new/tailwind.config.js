/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#5D6043',
        accent: '#925B42',
        'brand-light': '#AAAB96',
        'accent-light': '#CBBCA7',
        'yellow-star': '#EAC612',
        base: '#EDE9E3',
        primary: '#272930',
        secondary: '#646872',
        tertiary: '#81848F',
      },
    },
  },
  plugins: [],
}
