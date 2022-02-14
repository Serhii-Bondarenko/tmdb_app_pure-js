import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useSearchParams} from 'react-router-dom';

import './moviesByGenrePage.css';
import {Loader, MoviesList} from '../../components';
import {getMoviesByCategory, setNewPage} from '../../store';


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
            {errors ? <div className='reject'><h3>{errors}</h3></div> :
                status === 'pending' ? <Loader/> :
                    <div className='main__genres container'>
                        <div>
                            <h3>{category.name}</h3>
                        </div>
                        <MoviesList/>
                    </div>}
        </>
    );
};

export {MoviesByGenrePage};