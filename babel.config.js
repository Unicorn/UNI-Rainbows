/** @format */

module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
      require.resolve('expo-router/babel'),
      [
        'module-resolver',
        {
          alias: {
            '@assets': './src/assets',
            '@config': './src/config',
            '@context': './src/context',
            '@utility': './src/utility',
            '@views': './src/views',
          },
        },
      ],
    ],
  }
}
