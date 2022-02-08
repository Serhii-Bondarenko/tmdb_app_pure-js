import React from 'react';
import {useDispatch} from "react-redux";

import css from './genre.module.css';
import {setCategory} from "../../store";
import {Link} from "react-router-dom";

const Genre = ({genre}) => {

    const dispatch = useDispatch();

    const chooseGenre = () => dispatch(setCategory({genre}));

    return (
        <Link to={'/'} className={css.item} onClick={chooseGenre}>
            <li>{genre.name}</li>
        </Link>
    );
};

export {Genre};