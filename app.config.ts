import 'dotenv/config';

export default {
  expo: {
    name: 'movies-inc',
    slug: 'movies-inc',
    version: '1.0.0',
    orientation: "portrait",
    extra: {
        API_BASE_URL: process.env.API_BASE_URL,
        MOVIE_DB_API_READ_ACCESS_TOKEN: process.env.MOVIE_DB_API_READ_ACCESS_TOKEN,
        MOVIE_ASSETS_URL: process.env.MOVIE_ASSETS_URL
    },
  },
};