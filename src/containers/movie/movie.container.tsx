import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { CustomViewPagerComponent } from '../../components/custom.viewpager/custom.viewpage.component';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/app.navigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { moviesService } from '../../services/movies.service';
import { MovieResponseType } from '../../types/MoviesServiceTypes';
import HeroComponent from './components/hero.component';
import ThumbnailComponent from './components/thumbnail.component';
import { useMovies } from '../../context/MoviesContext';
import { Icon } from 'react-native-elements';
import { MOVIE_ASSETS_URL } from '../../utils/constants';
import AsyncStorageClient from '../../apis/async.storage.client';

const MovieContainer: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const { getGuestSessionId, getNowPlayingMovies } = moviesService;

    const { movies, addMovies } = useMovies();

    useEffect(() => {
      const doRequest = async () => {
        const response = await getGuestSessionId();

        const { ok, value } = response;

        if (!ok) {
            alert('Ha ocurrido un error al intentar obtener el token.');
            return;
        }

        await AsyncStorageClient.setItem('guest_session_id', value.guest_session_id);
      }

      doRequest();
    }, [])
    

    useEffect(() => {
        const doRequest = async () => {
            const { ok, value } = await getNowPlayingMovies();

            if (!ok) {
                alert('Ha ocurrido un error al intentar obtener las peliculas.');
                return;
            }

            const { results } = value;

            const _results = results.map((result: MovieResponseType) => {
                const { id, title, overview, poster_path, vote_average, vote_count, release_date } = result;
                return {
                    id,
                    title,
                    overview,
                    poster_path,
                    vote_average: Math.round(vote_average),
                    vote_count,
                    release_date
                }
            }).sort((a: MovieResponseType, b: MovieResponseType) => a.title.localeCompare(b.title));

            addMovies(_results);
        }

        doRequest();
    }, [])

    return (
        <View style={styles.container}>
            <HeroComponent>
                <HeroComponent.HeroHeader>
                    <HeroComponent.Title>
                        Reproduciendo ahora
                    </HeroComponent.Title>
                    <HeroComponent.Description onPress={() => navigation.navigate('MovieListScreen')}>
                        Ver listado
                    </HeroComponent.Description>
                </HeroComponent.HeroHeader>
                <CustomViewPagerComponent>
                    {
                        movies.slice(0, 5).map((movie: MovieResponseType) => {
                            return (
                                <CustomViewPagerComponent.Layout key={movie.id} >
                                    <ThumbnailComponent
                                        id={movie.id}
                                        image={`${MOVIE_ASSETS_URL}/t/p/w500/${movie.poster_path}`}
                                        title={movie.title}
                                        overview={movie.overview}
                                        rating={movie.vote_average}
                                        release_date={`${movie.release_date}`}
                                    />
                                </CustomViewPagerComponent.Layout>
                            )
                        })
                    }
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.touchOpacityStyle} onPress={() => navigation.navigate('MovieListScreen')} activeOpacity={1}>
                            <Text style={{ color: '#032541', fontSize: 20, padding: 12, letterSpacing: 0.8, textAlign: 'center' }}>
                                Ver listado de peliculas
                            </Text>
                            <Icon name='list' size={50} color={'#032541'} />
                        </TouchableOpacity>
                    </View>
                </CustomViewPagerComponent>
            </HeroComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(242, 242, 242, 0.84)'
    },
    subTitle: {
        fontFamily: 'inter',
        fontWeight: 500,
        fontSize: 16,
        color: '#032541',
    },
    touchOpacityStyle: { margin: 'auto', borderColor: 'rgb(215, 215, 215)', borderWidth: 1, borderRadius: 14, padding: 25 }
});

export default MovieContainer;