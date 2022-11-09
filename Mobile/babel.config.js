module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["react-native-reanimated/plugin"],
  };
};

// npx expo install react-native-reanimated@~2.9.1
