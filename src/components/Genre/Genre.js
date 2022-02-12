import React from 'react';
import {Link} from "react-router-dom";

import './genre.css';

const Genre = ({genre, showList}) => {

    return (
        <Link to={`/movie/genre/${genre.id}?page=1`} className='genre'
              onClick={showList}>

            <li>{genre.name}</li>

        </Link>
    );
};

export {Genre};