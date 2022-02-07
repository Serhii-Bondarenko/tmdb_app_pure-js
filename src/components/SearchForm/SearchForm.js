import React from 'react';

import css from './searchForm.module.css';

const SearchForm = () => {
    return (
        <div className={css.formContainer}>
            <form>
                <input type="text" placeholder='SEARCH'/>
                <button><i className="fas fa-search"/></button>
            </form>
        </div>
    );
};

export {SearchForm};