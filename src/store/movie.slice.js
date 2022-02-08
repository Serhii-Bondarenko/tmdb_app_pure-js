import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {cinemaService} from '../services';

export const getGenres = createAsyncThunk(
    'movieSlice/getGenres',

    async (_, {dispatch, rejectWithValue}) => {
        try {
            const genres = await cinemaService.getGenres();
            dispatch(setGenres(genres));

        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const getMovies = createAsyncThunk(
    'movieSlice/getMovies',

    async (_, {dispatch, getState, rejectWithValue}) => {
        try {
            const {movieReducer: {currentPage, category}} = getState();

            const response = await cinemaService.getByCategory(currentPage, category.id);
            dispatch(setMoviesState({response}));

        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const movieSlice = createSlice({
    name: 'movieSlice',

    initialState: {
        currentPage: 1,
        totalPages: null,
        movies: [],
        genres: [],
        selectedFilm: {},
        category: null,
        status: null,
        errors: null
    },

    reducers: {

        setGenres: (state, action) => {
            state.genres = action.payload.genres;
            state.category = state.genres[0];

        },

        setMoviesState: (state, action) => {

            const {page, results, total_pages} = action.payload.response;

            state.currentPage = page;
            state.totalPages = total_pages;

            if (state.currentPage !== 1) {
                state.movies = state.movies.concat(results);

                return;
            }

            state.movies = results;
        },

        initializeSelectedFilm: (state, action) => {

            state.selectedFilm = action.payload.state;
            state.status = null;

            if (state.selectedFilm.genre_ids) {

                state.selectedFilm = {
                    ...state.selectedFilm,

                    genre_ids: state.selectedFilm.genre_ids.map(genreId => {
                        return state.genres.find(genre => genre.id === genreId);
                    })
                }
            }
        },

        setCategory: (state, action) => {
            state.currentPage = 1;
            state.category = action.payload.genre;

        },

        setNextPage: (state, action) => {
            state.currentPage = action.payload.nextPage;
        },

        setStatus: (state, action) => {
            state.status = 'fulfilled';
        }
    },

    extraReducers: {

        // Genres extra
        [getGenres.pending]: (state, action) => {
            state.status = 'pending';
            state.errors = null;
        },
        [getGenres.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
        },

        [getGenres.rejected]: (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        },

        // Movies extra
        [getMovies.pending]: (state, action) => {
            state.status = 'pending';
            state.errors = null;
        },

        [getMovies.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
        },

        [getGenres.rejected]: (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        }
    }
});

const movieReducer = movieSlice.reducer;

export default movieReducer;

export const {
    setMoviesState,
    setGenres,
    initializeSelectedFilm,
    setCategory,
    setNextPage,
    setStatus
} = movieSlice.actions;
