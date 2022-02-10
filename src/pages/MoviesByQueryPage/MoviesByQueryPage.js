import React, {useEffect, useState} from 'react';
import {MoviesList} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {getGenres, getMoviesByQuery, getTopRatedMovies, setNewPage, setRequest} from "../../store";

const MoviesByQueryPage = () => {

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    useEffect(() => {
        const queryParams = searchParams.get('query');
        const page = searchParams.get('page');

        dispatch(setRequest({queryParams}));
        dispatch(setNewPage({page}));
        dispatch(getMoviesByQuery());
    }, [searchParams]);

    return (
        <div className={'container'}>
            <div>
                <p>searching results: <span>{searchParams.get('query')}</span></p>
            </div>
            <MoviesList/>
        </div>
    );
};

export {MoviesByQueryPage};