import { get, post, response } from "../apis/axios.client";

export const moviesService = {
    getGuestSessionId: async () => {
        try {

            const guestSessionId = await get('/3/authentication/guest_session/new');

            const { data } = guestSessionId;

            return response.ok(data);

        } catch (error) {

            console.error(error);

            return response.error(error)

        }
    },
    getNowPlayingMovies: async () => {
        try {

            const nowPlayingMoviesResponse = await get('/3/movie/now_playing?language=en-US&page=1', {
                language: 'en-US',
                page: 1
            });

            const { data } = nowPlayingMoviesResponse;

            return response.ok(data);

        } catch (error) {

            console.error(error);

            return response.error(error)

        }
    },
    getMovieById: async (movieId: string | number) => {
        try {

            const movie = await get(`/3/movie/${movieId}`);

            const { data } = movie;

            return response.ok(data);

        } catch (error) {

            console.error(error);

            return response.error(error)

        }
    },
    getCast: async (movieId: string | number) => {
        try {

            const actors = await get(`/3/movie/${movieId}/credits?language=en-US`);

            const { data } = actors;

            return response.ok(data);

        } catch (error) {

            console.error(error);

            return response.error(error)

        }
    },
    rateMovie: async (movieId: string | number, sessionId: string | null, value: number | string) => {
        try {
            const actors = await post(`/3/movie/${movieId}/rating?guest_session_id=${sessionId}`, {
                value
            });
            
            const { data } = actors;

            return response.ok(data);

        } catch (error) {

            console.error(error);

            return response.error(error)

        }
    },
}