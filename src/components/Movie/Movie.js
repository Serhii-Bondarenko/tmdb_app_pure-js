import React, {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';

import './movie.css';
import {cinemaService} from "../../services";
import StarRatings from "react-star-ratings/build/star-ratings";

const Movie = ({movie}) => {

    const {id, title, vote_average, vote_count, poster_path, original_language} = movie;

    const poster = cinemaService.getMoviePoster('500', poster_path);

    const popup = useRef();
    const rate = useRef();

    useEffect(() => {
        if (vote_average < 4) {
            rate.current.classList.add('low');

        } else if (vote_average > 7) {
            rate.current.classList.add('high');

        } else {
            rate.current.classList.add('middle');
        }
    }, [vote_average]);

    const over = () => {
        popup.current.classList.add('on');
    }

    const leave = () => {
        popup.current.classList.remove('on');
    }

    return (
        <Link to={`/movie/${id.toString()}`} className='item-link slide' onMouseOver={over} onMouseLeave={leave}>
            <div className='item__content'>
                <img src={
                    !poster_path ? 'https://bytes.ua/wp-content/uploads/2017/08/no-image.png' :
                        poster
                } alt={title}/>
                <div className='item__info'>
                    <h4>{title}</h4>
                    <p className='movie-rating' ref={rate}>{vote_average}</p>
                </div>
                <div ref={popup} className='pop-up'>
                    <p>Original language: <span>{original_language}</span></p>
                    <StarRatings
                        rating={vote_average / 2}
                        starRatedColor='gold'
                        starDimension='15px'
                        starSpacing='2px'
                        starEmptyColor='silver'
                    />
                    <p>Total votes: <span>{vote_count}</span></p>
                </div>
            </div>
        </Link>
    );
};

export {Movie};