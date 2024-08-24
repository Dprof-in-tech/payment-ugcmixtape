
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(135deg, #e83b95 0%, #6250fe 33%, #00aeef 66%, #1fba9c 100%)',
      },
    },
  },
  plugins: [],
};
