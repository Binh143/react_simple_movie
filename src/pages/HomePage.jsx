import React from "react";
import Banner from "../component/banner/Banner";
import MoviesList from "../component/movies/MoviesList";

const HomePage = () => {
  return (
    <>
      <Banner></Banner>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Now playing
        </h2>
        <MoviesList type={"now_playing"}></MoviesList>
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Top rated movies
        </h2>
        <MoviesList type={"top_rated"}></MoviesList>
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Trending
        </h2>
        <MoviesList type={"popular"}></MoviesList>
      </section>
    </>
  );
};

export default HomePage;
