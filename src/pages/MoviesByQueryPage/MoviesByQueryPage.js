import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useSearchParams} from 'react-router-dom';

import './moviesByQuery.css';
import {Loader, MoviesList} from '../../components';
import {getMoviesByQuery, setNewPage, setRequest} from '../../store';

const MoviesByQueryPage = () => {

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        document.title = 'FMovies';
    }, [])

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

    const {status, totalResults, request, errors} = useSelector(state => state['movieReducer']);

    return (
        <>
            {errors ? <div className='reject'><h3>{errors}</h3></div> :
                status === 'pending' ? <Loader/> :
                    <div className={'container'}>
                        <div className='search-results'>
                            <p>search results for <span>"{request}"</span>: {totalResults}</p>
                        </div>
                        <MoviesList/>
                    </div>
            }
        </>
    );
};

export {MoviesByQueryPage};