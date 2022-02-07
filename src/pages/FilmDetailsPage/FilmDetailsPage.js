import React, {useEffect} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import './filmDetailsPage.css';
import {cinemaService} from '../../services';
import {initializeSelectedFilm} from '../../store';

const FilmDetailsPage = () => {

    const {id} = useParams();
    const {state} = useLocation();

    const dispatch = useDispatch();
    const {selectedFilm, genres} = useSelector(state => state['movieReducer']);

    const poster = cinemaService.getPoster('1280', selectedFilm.backdrop_path);

    useEffect(() => {
        if (genres.length) {
            if (state) {
                dispatch(initializeSelectedFilm({state}));
                return;
            }
        }

        cinemaService.getById(id).then(state => dispatch(initializeSelectedFilm({state})));
    }, [id]);

    useEffect(() => {
        document.title = selectedFilm.title;
    }, [selectedFilm])

    return (
        <>
            {selectedFilm && <div className='main__film'>
                <img src={poster} alt={selectedFilm.title}/>
                <div className={'main__film-info'}>
                    <div>
                        <p>
                            {selectedFilm.genres ?
                                selectedFilm.genres.map(genre => <span key={genre.id}>{genre.name}/ </span>) :

                                selectedFilm.genre_ids && selectedFilm.genre_ids.map(genre => <span
                                    key={genre.id}> {genre.name}/ </span>)
                            }<span className='title'>{selectedFilm.original_title}</span>
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
        </>
    );
};

export {FilmDetailsPage};