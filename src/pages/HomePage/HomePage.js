import React, {useEffect, useState} from 'react';

import './home.css';
import {MoviesList, Slider} from '../../components';
import {useDispatch, useSelector} from "react-redux";
import {useParams, useSearchParams} from "react-router-dom";
import {getGenres} from "../../store";


const HomePage = () => {

    const dispatch = useDispatch();

    const [params] = useSearchParams();

    const {genres} = useSelector(state => state['movieReducer']);

    useEffect(() => {
        !genres.length && dispatch(getGenres());
    }, [genres]);

    const [title, setTitle] = useState('Action');

    useEffect(() => {
        const currentCategory = +params.get('with_genres');

        try {
            const selectedGenre = genres.find(genre => genre.id === currentCategory);

            setTitle(selectedGenre.name);

        } catch (e) {
            setTitle('Your choose');

        }

    }, [params]);

    return (
        <div className='main__home container'>
            <h3>Popular</h3>
            <Slider/>
            <h3>{title}</h3>
            <MoviesList/>
        </div>
    );
};

export {HomePage};