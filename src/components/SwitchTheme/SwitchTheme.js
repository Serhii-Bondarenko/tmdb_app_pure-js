import React from 'react';

const SwitchTheme = ({data: {theme, switchTheme}}) => {
    return (
        <div>
            <button data-theme={theme} onClick={switchTheme}>
                Switch to {theme === 'light' ? 'Dark' : 'Light'}
            </button>
        </div>
    );
};

export {SwitchTheme};