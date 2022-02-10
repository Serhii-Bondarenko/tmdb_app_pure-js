import React, {useEffect, useState} from 'react';
import {MoviesList, Slider} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {getGenres, getMoviesByCategory, getTopRatedMovies, setCategory, setNewPage} from "../../store";
import {cinemaService} from "../../services";

const HomePage = () => {

    const dispatch = useDispatch();

    const {genres} = useSelector(state => state['movieReducer']);

    useEffect(() => {
        !genres.length && dispatch(getGenres());
    }, [genres]);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        // }
        const page = searchParams.get('page');
        // const genre = searchParams.get('with_genres');
        dispatch(setNewPage({page}));
        dispatch(getTopRatedMovies());
    }, [searchParams]);

    return (
        <div className='main__home container'>
            <h3>Popular</h3>
            <Slider/>
            <h3>Top Rated</h3>
            <MoviesList/>
        </div>
    );
};

export {HomePage};