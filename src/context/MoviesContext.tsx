import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MovieResponseType } from '../types/MoviesServiceTypes';

interface MoviesContextType {
  movies: MovieResponseType[];
  addMovies: (movies: MovieResponseType[]) => void;
  removeMovie: (id: number) => void;
}

export const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

interface MoviesProviderProps {
  children: ReactNode;
}

export const MoviesProvider: React.FC<MoviesProviderProps> = ({ children }) => {
  const [movies, setMovies] = useState<MovieResponseType[]>([]);

  const addMovies = (movie: MovieResponseType[]) => {
    setMovies(movie);
  };

  const removeMovie = (id: number) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  return (
    <MoviesContext.Provider value={{ movies, addMovies, removeMovie }}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = (): MoviesContextType => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error('useMovies debe usarse dentro de un MoviesProvider');
  }
  return context;
};
