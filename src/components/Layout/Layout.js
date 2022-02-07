import React from 'react';
import {Outlet} from 'react-router-dom';

import './layout.css';
import {Header} from '../Header/Header';

const Layout = () => {
    return (
        <div className='wrapper'>
            <header className='header'>
                <Header/>
            </header>
            <main className='main'>
                <Outlet/>
            </main>
        </div>
    );
};

export {Layout};