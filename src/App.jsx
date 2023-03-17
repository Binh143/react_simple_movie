import "./App.css";
import { Route, Routes } from "react-router-dom";
import "swiper/css";
import Header from "./component/layout/Header";
import { lazy, Suspense } from "react";
import MoviesPageV2 from "pages/MoviesPageV2";

const HomePage = lazy(() => import("./pages/HomePage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));

function App() {
  return (
    <Suspense fallback={<ErrorPage></ErrorPage>}>
      <div className="relative">
        <Header></Header>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/movies" element={<MoviesPage></MoviesPage>}></Route>
          <Route
            path="/moviesV2"
            element={<MoviesPageV2></MoviesPageV2>}
          ></Route>

          <Route
            path="/movies/:movieId"
            element={<MovieDetailsPage></MovieDetailsPage>}
          ></Route>

          <Route path="/:something" element={<ErrorPage></ErrorPage>}></Route>
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
