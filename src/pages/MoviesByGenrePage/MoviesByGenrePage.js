import React, {useEffect, useState} from 'react';

import './moviesByGenrePage.css';
import {Loader, MoviesList, Slider} from '../../components';
import {useDispatch, useSelector} from "react-redux";
import {useParams, useSearchParams} from "react-router-dom";
import {getMoviesByCategory, setCategory, setNewPage} from "../../store";


const MoviesByGenrePage = () => {
    const [searchParams] = useSearchParams();
    const {genreId, genre} = useParams();
    const dispatch = useDispatch();

    const {status, errors} = useSelector(state => state['movieReducer']);

    useEffect(() => {
        document.title = 'FMovies';
        const page = searchParams.get('page');
        dispatch(setCategory({genre: +genreId}))
        dispatch(setNewPage({page}));
        dispatch(getMoviesByCategory());
    }, [searchParams, genreId]);

    return (
        <>
            {errors ? <div className='reject'><h3>OK, so... no movie...</h3></div> :
                status === 'pending' ? <Loader/> :
                    <div className='container'>
                        <div>
                            <h3>{genre}</h3>
                        </div>
                        <MoviesList/>
                    </div>}
        </>
    );
};

export {MoviesByGenrePage};