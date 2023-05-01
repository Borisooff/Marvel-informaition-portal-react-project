import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spiner from "../spiner/spiner";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPaje"));
const SingleComicPage = lazy(() => import("../pages/singleComicPage/SingleComicPage"));
const SingleCharPage = lazy(() => import("../pages/singleCharPage/SingleCharPage"));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spiner />}>
                        <Routes>
                            <Route path='/' element={<MainPage />} />
                            <Route path='/comics' element={<ComicsPage />} />
                            <Route path='/comics/:comicId' element={<SingleComicPage />} />
                            <Route path='/:charId' element={<SingleCharPage />} />
                            <Route path='*' element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;