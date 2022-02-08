import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './movieList.css';
import {getGenres, getMovies, setNextPage, setStatus} from '../../store';
import {Movie} from '../Movie/Movie';
import {Loader} from "../Loader/Loader";

const MoviesList = () => {

    const dispatch = useDispatch();

    const [active, setActive] = useState(true);
    const [disabled, setDisabled] = useState(true);

    let {
        currentPage,
        movies,
        genres,
        totalPages,
        status,
        category
    } = useSelector(state => state['movieReducer']);

    useEffect(() => {
        dispatch(setStatus());
        !genres.length && dispatch(getGenres());
    }, []);

    useEffect(() => {
        document.title = 'FMovies';
        if (category && status) dispatch(getMovies());
    }, [currentPage, category]);

    const toNextPage = () => {
        dispatch(setNextPage({nextPage: ++currentPage}));
        if (currentPage === 2) {
            setDisabled(false);
        }
        if (currentPage === totalPages) {
            setActive(!active);
        }

        // console.log({"DO": movies});
        // console.log({"POSLE": movies});
    }

    return (
        <div className='wrap-list'>
            {status === 'pending' && <Loader/>}
            {status === 'rejected' && <h3>OK, so... no movie...</h3>}
            <div className='list'>
                {movies.map(movie => <Movie key={movie.id} movie={movie}/>)}
            </div>
            <p className='page__count'>{currentPage}</p>
            <div className='action__btn'>
                {!disabled && <button onClick={() => dispatch(setNextPage({nextPage: 1}))}>back to start</button>}
                {active && <button onClick={toNextPage}>show more</button>}
            </div>
        </div>
    );
};

export {MoviesList};