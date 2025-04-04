// jest.config.js
module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@expo|expo(nent)?|@unimodules|unimodules|sentry-expo|native-base)',
    ],
    moduleNameMapper: {
        '^@react-native-async-storage/async-storage$': '<rootDir>/__mocks__/@react-native-async-storage/async-storage.js',
    }
};
