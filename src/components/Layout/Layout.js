import React from 'react';
import {Outlet} from 'react-router-dom';
import useLocalStorage from 'use-local-storage'
import './layout.css';
import '../../index.css';
import {Header} from '../Header/Header';

const Layout = () => {

    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

    const switchTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    }

    return (
        <div className='wrapper'>
            <header className='header'>
                <Header theme={{switchTheme, theme}}/>
            </header>
            <main data-theme={theme} className='main'>
                <Outlet/>
            </main>
        </div>
    );
};

export {Layout};