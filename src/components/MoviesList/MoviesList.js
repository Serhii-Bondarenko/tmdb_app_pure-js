import React from 'react';
import {useSelector} from 'react-redux';

import './movieList.css';
import {Movie} from '../Movie/Movie';
import {Loader} from "../Loader/Loader";
import {Paginator} from "../Paginator/Paginator";

const MoviesList = () => {
    const {
        movies,
        totalPages,
        status,
    } = useSelector(state => state['movieReducer']);

    return (
        <div className='wrap-list'>
            {status === 'rejected' && <h3>OK, so... no movie...</h3>}
            <div className='list'>
                {movies.map(movie => <Movie key={movie.id} movie={movie}/>)}
            </div>
            {status === 'pending' && <Loader/>}
            <div className='action__btn'>
                <Paginator totalPages={totalPages}/>
            </div>
        </div>
    );
};

export {MoviesList};