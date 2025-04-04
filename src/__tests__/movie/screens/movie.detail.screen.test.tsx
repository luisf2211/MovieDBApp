import React from 'react';
import { render } from '@testing-library/react-native';
import MovieDetailScreen from '../../../containers/movie/screens/movie.detail.screen';
import { NavigationContainer } from '@react-navigation/native';

describe('MovieDetailScreen | Renderizar Componente', () => {
    it('Debe renderizar correctamente.', () => {
        expect(() => {
            render(
              <NavigationContainer>
                <MovieDetailScreen />
              </NavigationContainer>
            );
          }).toBeTruthy();
    });
});