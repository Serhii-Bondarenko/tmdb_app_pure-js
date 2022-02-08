import {Route, Routes} from 'react-router-dom';

import './App.css';
import {Layout} from './components';
import {FilmDetailsPage, HomePage} from './pages';

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path={'movie/:id'} element={<FilmDetailsPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;
