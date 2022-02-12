import React, {useRef} from 'react';

import './slide.css';
import {Link} from "react-router-dom";
import {cinemaService} from "../../services";

const Slide = ({movie}) => {

    const {id, title, backdrop_path} = movie;

    const poster = cinemaService.getMoviePoster('780', backdrop_path);

    return (
        <Link to={`/movie/${id.toString()}`} className={'slide'}>
            <div>
                <img src={poster} alt={title}/>
                <p>{title}</p>
            </div>
        </Link>
    );
};

export {Slide};