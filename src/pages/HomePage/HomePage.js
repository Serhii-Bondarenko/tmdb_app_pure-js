import React from 'react';

import './home.css';
import {MoviesList, Slider} from '../../components';
import {useSelector} from "react-redux";


const HomePage = () => {

    const {category} = useSelector(state => state['movieReducer']);

    return (
        <div className='main__home container'>
            <h3>Popular</h3>
            <Slider/>
            <h3>{category?.name}</h3>
            <MoviesList/>
        </div>
    );
};

export {HomePage};