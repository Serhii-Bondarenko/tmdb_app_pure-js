import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {cinemaService} from '../services';

export const getTopRatedMovies = createAsyncThunk(
    'movieSlice/getTopRatedMovies',
    async (_, {dispatch, getState, rejectWithValue}) => {
        const {movieReducer: {currentPage}} = getState();
        try {
            const response = [await cinemaService.getGenres(), await cinemaService.getByValue(currentPage, 'top_rated')];
            const data = await Promise.all(response);
            dispatch(setMoviesState({data}));
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
)

export const getMoviesByCategory = createAsyncThunk(
    'movieSlice/getMoviesByCategory',

    async (_, {dispatch, getState, rejectWithValue}) => {
        const {movieReducer: {currentPage, category}} = getState();
        try {
            const response = [await cinemaService.getGenres(), await cinemaService.getByCategory(currentPage, category)];
            const data = await Promise.all(response);
            dispatch(setMoviesState({data}));

        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const getMoviesByQuery = createAsyncThunk(
    'movieSlice/getMoviesByQuery',
    async (_, {dispatch, getState, rejectWithValue}) => {
        const {movieReducer: {currentPage, request}} = getState();
        try {
            const response = [await cinemaService.getGenres(), await cinemaService.getByQuery(currentPage, request)];
            const data = await Promise.all(response);
            dispatch(setMoviesState({data}));

        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const getMovieDetails = createAsyncThunk(
    'movieSlice/getMovieDetails',
    async ({id}, {dispatch, rejectWithValue}) => {
        try {
            const response = [await cinemaService.getById(id), await cinemaService.getMovieVideo(id)];
            const data = await Promise.all(response);
            dispatch(setSelectedFilm({data}));

        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
)

const movieSlice = createSlice({
    name: 'movieSlice',

    initialState: {
        currentPage: 1,
        totalPages: null,
        movies: [],
        genres: [],
        selectedFilm: {},
        category: null,
        request: '',
        status: null,
        errors: null
    },

    reducers: {

        setMoviesState: (state, action) => {
            const [{genres}, {results, total_pages}] = action.payload.data;

            state.genres = genres;
            state.movies = results;
            state.totalPages = total_pages;

            state.selectedFilm = {};

        },

        setSelectedFilm: (state, action) => {
            const [movie, video] = action.payload.data;

            state.selectedFilm = {
                ...movie,
                img: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path || movie.poster_path}`,
                video_path: video.results[0]?.key ? `https://www.youtube.com/embed/${video.results[0].key}` :
                    'https://www.youtube.com/embed/watch?v=xObfAv-fEjU&list=PLY1sAemBLA5wJKqD7nHAyIQtjuvgoWh3O&index=10'
            }
        },

        setCategory: (state, action) => {
            state.category = action.payload.genre;
        },

        setRequest: (state, action) => {
            state.request = action.payload.queryParams;
        },

        setNewPage: (state, action) => {
            state.currentPage = action.payload.page;
        },

        setStatus: (state, action) => {
            state.status = action.payload.status;
        }

    },

    extraReducers: {

        [getTopRatedMovies.pending]: (state, action) => {
            state.status = 'pending';
            state.errors = null;
        },

        [getTopRatedMovies.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
        },

        [getTopRatedMovies.rejected]: (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
            console.log(action.payload);
        },

        [getMoviesByCategory.pending]: (state, action) => {
            state.status = 'pending';
            state.errors = null;
        },

        [getMoviesByQuery.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
        },

        [getMoviesByCategory.pending]: (state, action) => {
            state.status = 'pending';
            state.errors = null;
        },

        [getMoviesByCategory.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
        },

        [getMoviesByCategory.rejected]: (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
            console.log(action.payload);

        },


        [getMoviesByQuery.pending]: (state, action) => {
            state.status = 'pending';
            state.errors = null;
        },

        [getMoviesByQuery.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
        },

        [getMoviesByQuery.rejected]: (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
            console.log(action.payload);
        },

        [getMovieDetails.pending]: (state, action) => {
            state.status = 'pending';
            state.errors = null;
        },

        [getMovieDetails.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
        },

        [getMovieDetails.rejected]: (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
            console.log(action.payload);
        }
    }
});

const movieReducer = movieSlice.reducer;

export default movieReducer;

export const {
    setMoviesState,
    setSelectedFilm,
    setCategory,
    setRequest,
    setNewPage,
    setStatus
} = movieSlice.actions;
