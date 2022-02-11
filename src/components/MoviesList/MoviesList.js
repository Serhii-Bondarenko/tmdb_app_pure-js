import React from 'react';
import {useSelector} from 'react-redux';

import './movieList.css';
import {Movie} from '../Movie/Movie';
import {Paginator} from "../Paginator/Paginator";

const MoviesList = () => {
    const {
        movies,
        totalPages
    } = useSelector(state => state['movieReducer']);

    return (
        <>
            {!movies.length ? <div className='reject'><h3>OK, so... no movie...</h3></div> :
                <div className='wrap-list'>
                    <div className='list'>
                        {movies.map(movie => <Movie key={movie.id} movie={movie}/>)}
                    </div>
                    <div className='action__btn'>
                        <Paginator totalPages={totalPages}/>
                    </div>
                </div>}
        </>
    );
};

export {MoviesList};