import React, {useEffect} from 'react';
import {Link} from "react-router-dom";

import './genre.css';

const Genre = ({genre, showList}) => {

    return (
        <Link to={`/movie/${genre.name}/${genre.id.toString()}?page=1`} className='genre'
              onClick={showList}>

            <li>{genre.name}</li>

        </Link>
    );
};

export {Genre};