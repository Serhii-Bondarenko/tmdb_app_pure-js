import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {getGenres, getMovies} from '../../store';
import {Movie} from '../Movie/Movie';
import {Loader} from "../Loader/Loader";

const MoviesList = () => {

    const {pathname} = useLocation();

    const dispatch = useDispatch();

    const {
        currentPage,
        movies,
        genres,
        totalPages,
        status
    } = useSelector(state => state['movieReducer']);

    useEffect(() => {
        dispatch(getMovies({pathname}));
        !genres.length && dispatch(getGenres());
        document.title = 'FMovies';
    }, []);

    return (
        <div className='wrap-list'>
            {status === 'pending' && <Loader/>}
            {status === 'rejected' && <h3>OK, so... no movie...</h3>}
            <div className='list'>
                {movies.map(movie => <Movie key={movie.id} movie={movie}/>)}
            </div>
        </div>
    );
};

export {MoviesList};