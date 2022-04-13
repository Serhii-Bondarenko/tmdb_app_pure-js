import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';

import App from './App';
import store from './store/store.config';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter basename={process.env.PUBLIC_URL}>
                <App/>
            </HashRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
