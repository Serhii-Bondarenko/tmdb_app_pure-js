import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import './filmDetailsPage.css';
import {getMovieDetails} from '../../store';
import {Genre, Loader} from '../../components';

const FilmDetailsPage = () => {

    const {id} = useParams();

    const dispatch = useDispatch();
    const {selectedFilm, status, errors} = useSelector(state => state['movieReducer']);

    useEffect(() => {
        title ? document.title = title : document.title = 'FMovies';
    }, [selectedFilm]);

    useEffect(() => {
        dispatch(getMovieDetails({id}));
    }, [id]);

    const {
        img,
        title,
        genres,
        original_title,
        release_date,
        vote_average,
        vote_count,
        overview,
        original_language,
        popularity,
        production_countries,
        runtime,
        video_path
    } = selectedFilm;

    return (
        <>
            {errors ? <div className='reject'><h3>OK, so... no movie...</h3></div> :
                status === 'pending' ? <Loader/> :
                    <div className='main__film' style={
                        {
                            backgroundImage: `linear-gradient(90deg, rgb(29, 37, 36, 0.9), rgb(249, 249, 249, 0) 100%), url(${img})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }
                    }>

                        <div className={'main__film container'}>
                            <div className='film__detail'>

                                <div className={'film__info'}>
                                    <div>
                                        <ul>
                                            {genres?.map(genre => <Genre key={genre.id} genre={genre}/>)}
                                        </ul>
                                        <p className='film__title'>{original_title}</p>
                                    </div>
                                    <p><span>premiere:</span> {release_date}</p>
                                    <p><span>runtime:</span> {runtime} min</p>
                                    <p><span>original language:</span> {original_language}</p>
                                    <p><span>popularity:</span> {popularity}</p>
                                    {production_countries?.[0]?.name &&
                                        <p><span>country:</span> {production_countries?.[0].name}</p>}
                                    <div className='film__rating'>
                                        <p>
                                            rating: <span>{vote_average}</span> (total
                                            votes: <span>{vote_count}</span>)
                                        </p>
                                    </div>
                                </div>

                                <div className='film__trailer'>
                                    <iframe
                                        src={video_path}
                                        name={'video'}
                                        allowFullScreen='allowFullScreen'
                                        height='100%'
                                        width='100%'
                                    />
                                </div>
                            </div>
                            <div className='film__add'>
                                <p>{overview}</p>
                            </div>
                        </div>
                    </div>}

        </>
    );
};

export {FilmDetailsPage};