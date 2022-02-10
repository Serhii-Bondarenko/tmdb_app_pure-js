import React from 'react';

import css from './notFoundPage.module.css';

const NotFoundPage = () => {
    return (
        <div className={css.wrap}>
            <h2 className={css.notFound}>
                Page not found :(
            </h2>
        </div>
    );
};

export {NotFoundPage};