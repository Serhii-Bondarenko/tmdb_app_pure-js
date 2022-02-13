import React, {useEffect, useRef, useState} from 'react';
import {Loader, MoviesList, Slider} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {
    getGenres,
    getMoviesByCategory,
    getTopRatedMovies,
    setCategory,
    setNewPage,
    setViewPortWidth
} from "../../store";
import {cinemaService} from "../../services";

import './homePage.css';

const HomePage = () => {

    const dispatch = useDispatch();
    const {errors, status} = useSelector(state => state['movieReducer']);;

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        document.title = 'FMovies';
        // dispatch(setViewPortWidth({width: }));

        if (!searchParams.get('page')) {
            setSearchParams({page: '1'});
        }
        const page = searchParams.get('page');
        dispatch(setNewPage({page}));
        dispatch(getTopRatedMovies());
    }, [searchParams]);

    return (
        <>
            {errors ? <div className='reject'><h3>{errors}</h3></div> :
                status === 'pending' ? <Loader/> :
                    <div className='main__home'>
                        <div className='home-pop'>
                            <div>
                                <h3>Popular</h3>
                                <Slider/>
                            </div>
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