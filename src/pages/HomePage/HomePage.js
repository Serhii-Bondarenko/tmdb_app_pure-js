import React from 'react';

import './home.css';
import {MoviesList} from '../../components';


const HomePage = () => {
    return (
        <div className='main__home container'>
            <h3>Popular</h3>
            <MoviesList/>
        </div>
    );
};

export {HomePage};