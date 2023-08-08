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
            '@assets': './app/assets',
            '@config': './app/config',
            '@context': './app/context',
            '@utility': './app/utility',
            '@views': './app/views',
          },
        },
      ],
    ],
  }
}
