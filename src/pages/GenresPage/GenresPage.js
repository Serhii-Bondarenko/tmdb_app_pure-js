import React from 'react';
import {MoviesList} from "../../components";

const GenresPage = () => {
    return (
        <div className='main__genres container'>
            <h3>Top rated movies</h3>
            <MoviesList/>
        </div>
    );
};

export {GenresPage};