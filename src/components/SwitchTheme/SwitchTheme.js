import React from 'react';

const SwitchTheme = () => {
    return (
        <div>
            <label htmlFor='switchTheme'>
                dark theme
                <input id='switchTheme' type='checkbox'/>
            </label>
        </div>
    );
};

export {SwitchTheme};