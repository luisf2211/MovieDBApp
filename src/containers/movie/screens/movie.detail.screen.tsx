import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import { RootStackParamList } from '../../../navigation/app.navigator';
import { Badge, Rating } from 'react-native-elements';
import { moviesService } from '../../../services/movies.service';
import { MOVIE_ASSETS_URL } from '../../../utils/constants';
import AsyncStorageClient from '../../../apis/async.storage.client';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MovieDetailRouteProp = RouteProp<RootStackParamList, 'MovieDetailScreen'>;

type MovieGenreProp = {
    id?: number,
    name: string
}

type MovieActorProp = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
};

const MovieGenresComponent: React.FC<MovieGenreProp> = ({ name }) => {
    return <Badge value={name} />
}

const MovieActorComponent: React.FC<{ actor: MovieActorProp }> = ({ actor }) => {
    return (
        <View style={{ borderWidth: 1, borderColor: 'rgba(219, 218, 218, 0.97)', height: 240, flex: 1 }}>
            <View style={{ gap: 10, padding: 10 }}>
                <Image source={{ uri: `${MOVIE_ASSETS_URL}/t/p/w500/${actor.profile_path}` }}
                    resizeMode="stretch"
                    style={{
                        height: 120,
                        width: '100%',
                    }}
                />
                <Text style={{ fontSize: 12 }}>
                    Nombre: {actor.name}
                </Text>

                <Text style={{ fontSize: 12 }}>
                    Personaje: {actor.character}
                </Text>
            </View>
        </View>
    )
}

const MovieDetailScreen: React.FC = () => {
    const route = useRoute<MovieDetailRouteProp>();

    const [genres, setGenres] = useState<MovieGenreProp[]>([]);
    const [actors, setActors] = useState<MovieActorProp[]>([]);
    const [startingValue, setStartingValue] = useState<string | number | null>(0);

    const { getMovieById, getCast, rateMovie } = moviesService;

    const {
        id,
        image,
        overview,
        rating,
        release_date
    } = route.params;

    useEffect(() => {
        const doRequest = async () => {
            const response = await getMovieById(id);

            const { ok, value } = response;

            if (!ok) {
                alert('Ha ocurrido un error al intentar obtener los generos.');
                return;
            }

            const { genres } = value;

            setGenres(genres);
        }

        doRequest();
    }, []);

    useEffect(() => {
        const doRequest = async () => {
            const response = await getCast(id);

            const { ok, value } = response;

            if (!ok) {
                alert('Ha ocurrido un error al intentar obtener los generos.');
                return;
            }

            const { cast } = value;

            setActors(cast);
        }

        doRequest();
    }, []);

    useEffect(() => {
        const doRequest = async () => {
            const storedValue = await AsyncStorage.getItem(`voto_pelicula_${id}`);
            setStartingValue(storedValue);
        }

        doRequest();
    }, [])

    const ratingCompleted = async (rating: number) => {
        const _token = await AsyncStorageClient.getItem('guest_session_id');
        
        const { ok } = await rateMovie(id, _token, rating)

        if (!ok) {
            alert('Ha ocurrido un error al intentar votar.');
            return;
        }

        await AsyncStorage.setItem(`voto_pelicula_${id}`, rating.toString());
        alert('Has votado satisfactoriamente.');
    };

    return (
        <FlatList
            data={actors}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }) => <MovieActorComponent actor={item} />}
            columnWrapperStyle={{ justifyContent: 'space-between', width: '100%', rowGap: 50 }}
            contentContainerStyle={{ padding: 10 }}
            showsVerticalScrollIndicator={false}
            bounces={false}
            ListHeaderComponent={
                <View style={{ padding: 20, gap: 20 }}>
                    <Image source={{ uri: image }}
                        resizeMode="stretch"
                        style={{
                            borderRadius: 14,
                            height: 350,
                            width: '100%',
                        }}
                    />

                    <View style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'row', gap: 5 }}>
                        {
                            genres.map((genre) => {
                                return <MovieGenresComponent key={genre.id} id={genre.id} name={genre.name} />
                            })
                        }
                    </View>

                    <Text>
                        Año de estreno: {release_date.split('-')[0]}
                    </Text>

                    <Text style={{ display: 'flex' }}>
                        Calificación: ⭐️ {Math.round(rating)} / 10
                    </Text>

                    <View>
                        <Text style={{ textAlign: 'justify' }}>
                            {overview}
                        </Text>
                    </View>
                    
                    <View>
                        <Text style={{ textAlign: 'justify', paddingBottom: 10 }}>
                            Dejanos tu voto:
                        </Text>
                        <Rating imageSize={25} startingValue={startingValue} ratingCount={10} ratingColor="#3498db" onFinishRating={ratingCompleted} /> 
                    </View>
                </View>
            }
        />
    );
};

export default MovieDetailScreen;