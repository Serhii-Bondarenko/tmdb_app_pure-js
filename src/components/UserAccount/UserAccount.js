import React from 'react';

import css from './userAccount.module.css';
import {SwitchTheme} from "../SwitchTheme/SwitchTheme";

const UserAccount = ({switchTheme}) => {
    return (
        <div className={css.userContainer}>
            <div className={css.userImg}><i className="far fa-user"/></div>
            <div className={css.userAction}>
                <p>User</p>
                <SwitchTheme data={switchTheme}/>
            </div>
        </div>
    );
};

export {UserAccount};