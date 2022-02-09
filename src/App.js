import {Route, Routes, Navigate} from 'react-router-dom';

import './App.css';
import {Layout} from './components';
import {FilmDetailsPage, HomePage} from './pages';

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<Navigate to={'movie?with_genres=28&page=1'}/>}/>
                <Route path={'movie'} element={<HomePage/>}/>
                <Route path={'movie/:id'} element={<FilmDetailsPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;
