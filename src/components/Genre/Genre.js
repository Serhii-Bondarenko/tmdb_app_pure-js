import React, {useEffect} from 'react';
import {Link} from "react-router-dom";

import css from './genre.module.css';

const Genre = ({genre}) => {

    return (
        <Link to={`movie?with_genres=${genre.id.toString()}&page=1`} className={css.item}>
            <li>{genre.name}</li>
        </Link>
    );
};

export {Genre};