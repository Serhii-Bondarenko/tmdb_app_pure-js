import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useSearchParams} from 'react-router-dom';

import './homePage.css';
import {Loader, MoviesList, Slider} from '../../components';
import {getTopRatedMovies, setNewPage} from '../../store';

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
            {
                errors ? <div className='reject'><h3>{errors}</h3></div> :
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
                    </div>
            }
        </>
    );
};

export {HomePage};