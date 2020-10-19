module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'shop-logo': "url('/frontend/src/assets/bennystore.png')",
      })
    },
  },
  variants: {},
  plugins: [],
}
