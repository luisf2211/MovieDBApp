import React from 'react';
import { render } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import MovieListScreen from '../../../containers/movie/screens/movie.list.screen';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useRoute: () => ({
      params: {
        movies: [{
          id: 1,
          title: 'Cleaner',
          overview: 'Test',
          release_date: '2025-02-19',
          rating: 8.9,
          image: 'https://image.tmdb.org/t/p/w500/fake.jpg'
        }]
      },
    }),
  };
});

describe('MovieListScreen | Renderizar Componente junto al listado.', () => {
  it('Debe renderizar las películas a traves de los params.', () => {
    const { getByText } = render(
      <NavigationContainer>
          <MovieListScreen />
      </NavigationContainer>
    );

    expect(getByText('Cleaner')).toBeTruthy();
  });
});