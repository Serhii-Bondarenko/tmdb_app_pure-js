import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './movieList.css';
import {getGenres, getMovies, setCategory, setNewPage} from '../../store';
import {Movie} from '../Movie/Movie';
import {Loader} from "../Loader/Loader";
import {Link, useLocation, useSearchParams} from "react-router-dom";
import {Paginator} from "../Paginator/Paginator";

const MoviesList = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    const {
        currentPage,
        movies,
        totalPages,
        status,
    } = useSelector(state => state['movieReducer']);

    useEffect(() => {
        document.title = 'FMovies';
        if (!searchParams.get('with_genres', 'page')) {
            setSearchParams({with_genres: '28', page: '1'})
        }
        const page = searchParams.get('page');
        const genre = searchParams.get('with_genres');
        dispatch(setCategory({genre: +genre}))
        dispatch(setNewPage({page}));
        dispatch(getMovies());
    }, [searchParams]);

    return (
        <div className='wrap-list'>
            {status === 'rejected' && <h3>OK, so... no movie...</h3>}
            <div className='list'>
                {movies.map(movie => <Movie key={movie.id} movie={movie}/>)}
            </div>
            {status === 'pending' && <Loader/>}
            <div className='action__btn'>
                <Paginator totalPages={totalPages}/>
            </div>
        </div>
    );
};

export {MoviesList};