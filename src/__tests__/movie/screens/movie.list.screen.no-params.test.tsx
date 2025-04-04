import React from 'react';
import { render } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import MovieListScreen from '../../../containers/movie/screens/movie.list.screen';
import { NavigationContainer } from '@react-navigation/native';

// Mock sin `params` o con `params: undefined`
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useRoute: () => ({}), // ❌ Sin `params`
  };
});

describe('MovieListScreen | Sin params', () => {
  it('Debe lanzar error si route.params no está definido', () => {
    expect(() => {
      render(
        <NavigationContainer>
          <MovieListScreen />
        </NavigationContainer>
      );
    }).toThrow(); // puedes ser más específico si manejas el error
  });
});