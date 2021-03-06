const baseURL = 'https://api.themoviedb.org/3';

export default baseURL;

export const urls = {
    movies: '/discover/movie',
    movie: '/movie',
    genres: '/genre/movie/list',
    img: 'https://image.tmdb.org/t/p/w'
};

export const sort ={
    popular: 'popularity.desc',
    query: '/search/movie'
}