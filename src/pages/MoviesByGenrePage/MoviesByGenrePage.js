import React, {useEffect, useState} from 'react';

import './moviesByGenrePage.css';
import {Loader, MoviesList, Slider} from '../../components';
import {useDispatch, useSelector} from "react-redux";
import {useParams, useSearchParams} from "react-router-dom";
import {getMoviesByCategory, setCategory, setNewPage} from "../../store";


const MoviesByGenrePage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const {genreId} = useParams();
    const dispatch = useDispatch();

    const {category, status, errors} = useSelector(state => state['movieReducer']);

    useEffect(() => {
        document.title = 'FMovies';

        if (!searchParams.get('page')) {
            setSearchParams({page: '1'});
        }

        const page = searchParams.get('page');

        dispatch(setNewPage({page}));
        dispatch(getMoviesByCategory({id: genreId}));

    }, [searchParams, genreId]);

    return (
        <>
            {errors ? <div className='reject'><h3>OK, so... no movie...</h3></div> :
                status === 'pending' ? <Loader/> :
                    <div className='container'>
                        <div>
                            <h3>{category.name}</h3>
                        </div>
                        <MoviesList/>
                    </div>}
        </>
    );
};

export {MoviesByGenrePage};