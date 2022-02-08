import React from 'react';
import {Link} from 'react-router-dom';

import css from './header.module.css';
import {SearchForm} from '../SearchForm/SearchForm';
import {UserAccount} from '../UserAccount/UserAccount';
import {GenresList} from "../GenresList/GenresList";

const Header = () => {
    return (
        <div className={css.headerContainer}>
            <nav className={css.headerNav}>
                <Link to={'/'}>
                    <img src='https://s1.bunnycdn.ru/assets/sites/fmovies/logo2.png' alt='Home'/>
                </Link>
                <GenresList/>
            </nav>
            <div className={css.userAction}>
                <SearchForm/>
                <UserAccount/>
            </div>
        </div>
    );
};

export {Header};