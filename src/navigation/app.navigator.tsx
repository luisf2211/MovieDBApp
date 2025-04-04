import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomNavbarComponent from '../components/custom.navbar/custom.navbar.component';
import MovieContainer from '../containers/movie/movie.container';
import MovieListScreen from '../containers/movie/screens/movie.list.screen';
import MovieDetailScreen from '../containers/movie/screens/movie.detail.screen';
import { MovieResponseType } from '../types/MoviesServiceTypes';


export type RootStackParamList = {
    Home: undefined;
    MovieListScreen: {
        movies: MovieResponseType[]
    },
    MovieListRecommendationScreen: {
        movies: MovieResponseType[]
    },
    MovieDetailScreen: {
        id: number,
        image: string,
        title: string,
        overview: string,
        rating: number,
        release_date: string
    },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen
                name={'Home'}
                component={MovieContainer}
                options={{
                    headerShown: true,
                    header: () => <CustomNavbarComponent />
                }}
            />

            <Stack.Screen
                name={'MovieListRecommendationScreen'}
                component={MovieListScreen}
                options={{
                    headerShown: true,
                    header: () => <CustomNavbarComponent title='Recomendaciones' />
                }}
            />
            
            <Stack.Screen
                name={'MovieListScreen'}
                component={MovieListScreen}
                options={{
                    headerShown: true,
                    header: () => <CustomNavbarComponent title='Listado de peliculas' />
                }}
            />

            <Stack.Screen
                name={'MovieDetailScreen'}
                component={MovieDetailScreen}
                options={({ route }) => ({
                    headerShown: true,
                    header: () => (
                        <CustomNavbarComponent
                            title={route.params.title}
                        />
                    ),
                })}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;