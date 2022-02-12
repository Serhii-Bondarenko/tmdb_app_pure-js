import React, {useEffect, useState} from 'react';
import {Loader, MoviesList} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {getMoviesByQuery, setNewPage, setRequest} from "../../store";

const MoviesByQueryPage = () => {

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {

        if (!searchParams.get('page')) {
            setSearchParams({query: searchParams.get('query'), page: '1'});
        }

        const queryParams = searchParams.get('query');
        const page = searchParams.get('page');

        dispatch(setRequest({queryParams}));
        dispatch(setNewPage({page}));
        dispatch(getMoviesByQuery());

    }, [searchParams]);

    const {status} = useSelector(state => state['movieReducer']);

    return (
        <>
            {status === 'pending' && <Loader/>}
            <div className={'container'}>
                <div>
                    <p>searching results: <span>{searchParams.get('query')}</span></p>
                </div>
                <MoviesList/>
            </div>
        </>
    );
};

export {MoviesByQueryPage};