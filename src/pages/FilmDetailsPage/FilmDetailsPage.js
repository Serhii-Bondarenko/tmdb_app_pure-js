import React, {useEffect} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import './filmDetailsPage.css';
import {cinemaService} from '../../services';
import {getGenres, initializeSelectedFilm, setStatus} from '../../store';
import {Loader} from "../../components";

const FilmDetailsPage = () => {

    const {id} = useParams();
    const {state} = useLocation();

    const dispatch = useDispatch();
    const {selectedFilm, genres, status} = useSelector(state => state['movieReducer']);

    const poster = cinemaService.getPoster('1280', selectedFilm?.backdrop_path);

    useEffect(() => {
        !genres.length && dispatch(getGenres());
        document.title = selectedFilm?.title;
    }, [selectedFilm]);

    useEffect(() => {
        if (genres.length) {
            if (state) {
                dispatch(initializeSelectedFilm({state}));
                return;
            }
        }

        cinemaService.getById(id).then(state => dispatch(initializeSelectedFilm({state})))
    }, [id]);

    return (
        <div className='wrap-list'>
            {status === 'pending' && <Loader/>}
            {!selectedFilm && <div className='reject'><h3>OK, so... no movie...</h3></div>}
            {selectedFilm && <div className='main__film'>
                <img src={poster} alt={selectedFilm?.title}/>
                <div className={'main__film-info'}>
                    <div>
                        <p>
                            {selectedFilm.genres ?
                                selectedFilm.genres.map(genre => <span key={genre.id}>{genre.name}/ </span>) :

                                selectedFilm.genre_ids && selectedFilm.genre_ids.map(genre => <span
                                    key={genre.id}> {genre.name}/ </span>)
                            }
                            <span className='title'>{selectedFilm.original_title}</span>
                        </p>
                        <p>
                            premiere: {selectedFilm.release_date}
                        </p>
                    </div>
                    <div className='rating'>
                        <p>
                            rating: <span>{selectedFilm.vote_average}</span> (total
                            votes: <span>{selectedFilm.vote_count}</span>)
                        </p>
                        <p>
                            {selectedFilm.overview}
                        </p>
                        <div className='add-info'>
                            <p>original language: {selectedFilm.original_language}</p>
                            <p>popularity: {selectedFilm.popularity}</p>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export {FilmDetailsPage};