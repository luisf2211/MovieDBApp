import { moviesService } from '../../../services/movies.service';
import * as axiosClient from '../../../apis/axios.client';

function fakeGet(url: string, options?: any) {
    if (url.includes('/3/movie/now_playing')) {
        return Promise.resolve({
            data: {
                results: [{ id: 1, title: 'Test Movie' }],
            },
        });
    }

    if (url.includes('/3/movie/123/credits')) {
        return Promise.resolve({
            data: {
                cast: [{ id: 10, name: 'Test Actor', character: 'Hero' }],
            },
        });
    }

    return Promise.reject('No match');
}

function fakePost(url: string, body: any) {
    if (url.includes('/3/movie/456/rating')) {
        return Promise.resolve({
            data: {
                status_code: 1,
                status_message: 'Rating successful',
            },
        });
    }

    return Promise.reject('No match');
}

describe('MoviesService | Prueba de endpoints.', () => {
    beforeAll(() => {
        (axiosClient as any).get = fakeGet;
        (axiosClient as any).post = fakePost;
    });

    it('getNowPlayingMovies retorna resultados esperados.', async () => {
        const response = await moviesService.getNowPlayingMovies();
        console.log('getNowPlayingMovies:', response);
        if (!response.ok || response.value.results.length === 0) {
            throw new Error('No se obtuvieron películas.');
        }
    });

    it('getCast retorna actores esperados.', async () => {
        const response = await moviesService.getCast(123);
        console.log('getCast:', response);
        if (!response.ok || response.value.cast.length === 0) {
            throw new Error('No se obtuvieron actores.');
        }
    });

    it('rateMovie retorna éxito.', async () => {
        const response = await moviesService.rateMovie(456, 'guest123', 8);
        console.log('rateMovie:', response);
        if (!response.ok || response.value.status_code !== 1) {
            throw new Error('No se pudo votar.');
        }
    });
});
