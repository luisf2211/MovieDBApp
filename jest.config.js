// jest.config.js
module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@expo|expo(nent)?|@ui-kitten|@eva-design|@unimodules|sentry-expo|native-base)',
    ],
  };
