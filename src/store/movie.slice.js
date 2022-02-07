import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {cinemaService} from '../services';

export const getMovies = createAsyncThunk(
    'movieSlice/getMovies',

    async ({pathname}, {dispatch, rejectWithValue}) => {
        try {
            if (pathname === '/genres') {
                const response = await cinemaService.getTop();
                dispatch(setMoviesState({response}));

                return;
            }

            const response = await cinemaService.getPopular();
            dispatch(setMoviesState({response}));

        } catch (e) {
            rejectWithValue(e.message);
        }
    }
);

export const getGenres = createAsyncThunk(
    'movieSlice/getGenres',

    async (_, {dispatch, rejectWithValue}) => {
        try {
            const genres = await cinemaService.getGenres();
            dispatch(setGenres(genres));

        } catch (e) {
            rejectWithValue(e.message);
        }
    }
);

const movieSlice = createSlice({
    name: 'movieSlice',

    initialState: {
        currentPage: null,
        totalPages: null,
        movies: [],
        genres: [],
        selectedFilm: {},
        status: null,
        errors: null
    },

    reducers: {
        setMoviesState: (state, action) => {
            const {page, results, total_pages} = action.payload.response;

            state.currentPage = page;
            state.movies = results;
            state.totalPages = total_pages;
        },

        setGenres: (state, action) => {
            state.genres = action.payload.genres;
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
        }
    },

    extraReducers: {
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
        },

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
        }
    }
});

const movieReducer = movieSlice.reducer;

export default movieReducer;

export const {setMoviesState, setGenres, initializeSelectedFilm} = movieSlice.actions;
