import React, {useEffect, useRef} from 'react';
import {useSelector} from "react-redux";

import css from './genresList.module.css';
import {Genre} from "../Genre/Genre";

const GenresList = () => {

    const list = useRef();
    const {genres} = useSelector(state => state['movieReducer']);

    const showList = () => {
        list.current.classList.toggle(css.show);
    }

    return (
        <>
            {
                genres.length ? <div className={css.wrap}>
                    <h2 className={css.title} onClick={showList}>GENRES</h2>
                    <ul ref={list} className={css.list}>
                        {genres.map(genre => <Genre key={genre.id} genre={genre} showList={showList}/>)}
                    </ul>
                </div> : false
            }
        </>
    );
};

export {GenresList};