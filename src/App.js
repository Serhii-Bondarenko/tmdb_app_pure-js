import {Route, Routes, Navigate} from 'react-router-dom';

import {Layout} from './components';
import {FilmDetailsPage, HomePage, MoviesByGenrePage, MoviesByQueryPage, NotFoundPage} from './pages';

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<Navigate to={'movie?page=1'}/>}/>
                <Route path={'movie'} element={<HomePage/>}/>
                <Route path={'movie/genre/:genreId'} element={<MoviesByGenrePage/>}/>
                <Route path={'movie/:id'} element={<FilmDetailsPage/>}/>
                <Route path={'movie/search'} element={<MoviesByQueryPage/>}/>
                <Route path={'*'} element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;
