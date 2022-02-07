import React from 'react';

import css from './userAccount.module.css';

const UserAccount = () => {
    return (
        <div className={css.userContainer}>
            <div><i className="far fa-user"/></div>
            <p>User name</p>
        </div>
    );
};

export {UserAccount};