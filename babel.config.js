module.exports = function (api) {
api.cache(true);
return {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',  // Module resolver plugin
      {
        alias: {
          '@/': './src/',  // Alias for the 'src' folder
          '@components': './src/components',  // Alias for 'components'
          '@lib': './src/lib'  // Alias for 'lib'
        },
      },
    ],
  ],
}
};