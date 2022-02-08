import React, {useRef} from 'react';
import {useSelector} from "react-redux";

import css from './genresList.module.css';
import {Genre} from "../Genre/Genre";

const GenresList = () => {

    const list = useRef();
    const title = useRef();

    const {genres} = useSelector(state => state['movieReducer']);

    const showList = () => {
        title.current.classList.toggle(css.active);
        list.current.classList.toggle(css.show);
    }

    return (
        <div className={css.wrap}>
            <h2 ref={title} className={css.title} onClick={showList}>GENRES</h2>
            <ul ref={list} className={css.list}>
                {genres.map(genre => <Genre key={genre.id} genre={genre}/>)}
            </ul>
        </div>
    );
};

export {GenresList};