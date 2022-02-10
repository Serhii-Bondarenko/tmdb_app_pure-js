import React, {useRef} from 'react';
import {Link} from 'react-router-dom';

import './movie.css';
import {cinemaService} from "../../services";
import StarRatings from "react-star-ratings/build/star-ratings";

const Movie = ({movie}) => {

    const {id, title, vote_average, vote_count, poster_path, original_language} = movie;

    const poster = cinemaService.getPoster('185', poster_path);

    const popup = useRef();

    const over = () => {
        popup.current.classList.add('on');
    }

    const leave = () => {
        popup.current.classList.remove('on');
    }

    return (
        <Link to={`/movie/${id.toString()}`} state={movie} className='item-link slide' onMouseOver={over}
              onMouseLeave={leave}>
            <div className='item__content'>
                <img src={poster} alt={title}/>
                <div className='item__info'>
                    <h4>{title}</h4>
                    <StarRatings
                        rating={vote_average / 2}
                        starRatedColor='ghostwhite'
                        starDimension='15px'
                        starSpacing='2px'
                        starEmptyColor='transparent'
                    />
                </div>
                <div ref={popup} className='pop-up'>
                    <p>Original language: <span>{original_language}</span></p>
                    <p>Rating: <span>{vote_average}</span></p>
                    <p>Total votes: <span>{vote_count}</span></p>
                </div>
            </div>
        </Link>
    );
};

export {Movie};