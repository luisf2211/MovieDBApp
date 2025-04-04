import React, { useContext } from 'react';
import { render } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { MoviesContext } from '../../../context/MoviesContext';
import MovieListScreen from '../../../containers/movie/screens/movie.list.screen';
import { NavigationContainer } from '@react-navigation/native';

const mockMovies = [
  {
    id: 1125899,
    overview: "When a group of radical activists take over an energy company's annual gala, seizing 300 hostages, an ex-soldier turned window cleaner suspended 50 storeys up on the outside of the building must save those trapped inside, including her younger brother.",
    poster_path: "/76Xvdqiv8ufGkerQunOpcy98oT7.jpg",
    release_date: "2025-02-19",
    title: "Cleaner",
    video: false,
    vote_average: 6.75,
    vote_count: 142,
  },
];

const MockMoviesProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MoviesContext.Provider value={{ movies: mockMovies, addMovies: () => { }, removeMovie: () => { } }}>
      {children}
    </MoviesContext.Provider>
  );
};

describe('MovieListScreen | Renderizar Componente junto al listado.', () => {
  it('Debe renderizar las películas del contexto.', () => {
    const { getByText } = render(
      <NavigationContainer>
        <MockMoviesProvider>
          <MovieListScreen />
        </MockMoviesProvider>
      </NavigationContainer>
    );

    expect(getByText('Cleaner')).toBeTruthy();
  });
});

describe('MovieListScreen | Intentar renderizar sin contexto', () => {
  it('Debe lanzar error si se usa fuera del MoviesProvider.', () => {
    expect(() => {
      render(
        <NavigationContainer>
          <MovieListScreen />
        </NavigationContainer>
      );
    }).toThrow('useMovies debe usarse dentro de un MoviesProvider');
  });
});
