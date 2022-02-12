import React, {useEffect, useState} from 'react';
import {Loader, MoviesList, Slider} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {getGenres, getMoviesByCategory, getTopRatedMovies, setCategory, setNewPage} from "../../store";
import {cinemaService} from "../../services";

import './homePage.css';

const HomePage = () => {

    const dispatch = useDispatch();

    const {errors, status} = useSelector(state => state['movieReducer']);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        document.title = 'FMovies';
        if (!searchParams.get('page')) {
            setSearchParams({page: '1'});
        }
        const page = searchParams.get('page');
        dispatch(setNewPage({page}));
        dispatch(getTopRatedMovies());
    }, [searchParams]);

    return (
        <>
            {errors ? <div className='reject'><h3>OK, so... no movie...</h3></div> :
                status === 'pending' ? <Loader/> :
                    <div className='main__home'>
                        <div className='home-pop'>
                            <h3>Popular</h3>
                            <Slider/>
                        </div>
                        <div className='home-top container'>
                            <h3>Top Rated</h3>
                            <MoviesList/>
                        </div>
                    </div>}
        </>
    );
};

export {HomePage};