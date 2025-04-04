import React from 'react';
import { ScrollView, View } from 'react-native';
import { useMovies } from '../../../context/MoviesContext';
import ThumbnailComponent from '../components/thumbnail.component';
import { MOVIE_ASSETS_URL } from '../../../utils/constants';

const MovieListScreen: React.FC = () => {
    const { movies } = useMovies();
    return (
        <ScrollView contentContainerStyle={{ padding: 20 }} bounces={false} showsHorizontalScrollIndicator={false}>
            <View style={{ gap: 20 }}>
                {
                    movies.map((movie) => {
                        return (
                            <ThumbnailComponent
                                key={movie.id}
                                id={movie.id}
                                image={`${MOVIE_ASSETS_URL}/t/p/w500/${movie.poster_path}`}
                                title={movie.title}
                                overview={movie.overview}
                                rating={movie.vote_average}
                                release_date={movie.release_date}
                            />
                        )
                    })
                }
            </View>
        </ScrollView>
    );
};

export default MovieListScreen;