import React, {useRef, useState} from 'react';
import {useNavigate, useParams, useSearchParams} from 'react-router-dom';

import css from './searchForm.module.css';

const SearchForm = () => {

    const searchInput = useRef();
    const navigate = useNavigate();
    const [searchRequest, setSearchRequest] = useSearchParams();

    const search = (e) => {
        e.preventDefault();

        if (searchInput.current.value) {
            const request = searchInput.current.value;
            setSearchRequest({query: request});
            navigate(`movie/search?query=${request.trim()}&page=1`, {replace: true});

            searchInput.current.value = '';
        }
    }

    return (
        <div className={css.formContainer}>
            <form onSubmit={search}>
                <input ref={searchInput} type="text" placeholder='search...'/>
                <button><i className="fas fa-search"/></button>
            </form>
        </div>
    );
};

export {SearchForm};