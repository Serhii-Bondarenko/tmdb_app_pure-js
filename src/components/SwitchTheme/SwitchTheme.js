import React from 'react';

import './switchTheme.css';

const SwitchTheme = ({theme}) => {
    return (
        <div>
            <label data-theme={theme.theme} className='switch'>
                <input type='checkbox' onChange={theme.switchTheme}/>
                <span className='select round'/>
            </label>
        </div>
    );
};

export {SwitchTheme};