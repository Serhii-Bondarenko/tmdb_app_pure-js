import React, {useEffect, useState} from 'react';

import './moviesByGenrePage.css';
import {MoviesList, Slider} from '../../components';
import {useDispatch, useSelector} from "react-redux";
import {useParams, useSearchParams} from "react-router-dom";
import {getGenres, getMovies, getMoviesByCategory, setCategory, setNewPage} from "../../store";


const MoviesByGenrePage = () => {
    const [searchParams] = useSearchParams();
    const {genreId, genre} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    useEffect(() => {
        document.title = 'FMovies';
        const page = searchParams.get('page');
        dispatch(setCategory({genre: +genreId}))
        dispatch(setNewPage({page}));
        dispatch(getMoviesByCategory());
    }, [searchParams, genreId]);

    return (
        <div className='container'>
            <div>
                <h3>{genre}</h3>
            </div>
            <MoviesList/>
        </div>
    );
};

export {MoviesByGenrePage};