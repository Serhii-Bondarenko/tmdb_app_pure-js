import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {cinemaService} from '../services';
import {click} from "@testing-library/user-event/dist/click";

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
        const {movieReducer: {currentPage, category}} = getState();
        try {
            const response = await cinemaService.getByCategory(currentPage, category);
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
        selectedFilm: null,
        category: 28,
        status: null,
        errors: null
    },

    reducers: {

        setGenres: (state, action) => {
            state.genres = action.payload.genres;
        },

        setMoviesState: (state, action) => {
            const {results, total_pages} = action.payload.response;
            state.totalPages = total_pages;
            state.movies = results;
        },

        initializeSelectedFilm: (state, action) => {

            state.selectedFilm = action.payload.state;

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
            state.category = action.payload.genre;
        },

        setNewPage: (state, action) => {
            state.currentPage = action.payload.page;
        },

        setStatus: (state, action) => {
            state.status = action.payload.status;
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
    setNewPage,
    setStatus
} = movieSlice.actions;
