import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import MoviesCard from "../component/movies/MoviesCard";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="pb-10">
      <div className="page-container-fluid h-screen relative">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat "
          style={{
            backgroundImage: `url(${tmdbAPI.getImageOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-40 pb-10">
        <img
          src={tmdbAPI.getImageW500(poster_path)}
          alt={`${title}`}
          className="w-full h-full object-cover  rounded-xl"
        />
      </div>
      <h1 className="text-center text-white text-4xl mb-10">{title}</h1>
      {genres.length > 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10">
          {genres.map((item, index) => (
            <span
              className="px-4 py-2 border border-primary text-primary rounded"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      <MovieCredits></MovieCredits>
      <MovieVideos></MovieVideos>
      <MoviesSimilar></MoviesSimilar>
    </div>
  );
};
function MovieCredits() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "credits"), fetcher);
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <>
      <h2 className="text-center text-3xl mb-10">Casts</h2>
      <div className="">
        <Swiper
          grabCursor={"true"}
          spaceBetween={30}
          slidesPerView={4}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="page-container"
        >
          {
            // cast.slice(0,4).map()
            cast.map(
              (item, index) =>
                item.profile_path !== null && (
                  <SwiperSlide key={item.id}>
                    <CastItem cast={item}></CastItem>
                  </SwiperSlide>
                )
            )
          }
        </Swiper>
      </div>
    </>
  );
}
function CastItem({ cast }) {
  const { profile_path, name } = cast;
  return (
    <>
      <div className="cast-item w-[300px]">
        <img
          src={tmdbAPI.getImageOriginal(profile_path)}
          alt={name}
          className="h-[350px] w-full object-cover rounded-lg mb-3"
        />
        <h3 className="text-xl font-medium text-center">{name}</h3>
      </div>
    </>
  );
}
function MovieVideos() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    tmdbAPI.getMovieMeta(movieId, "videos"),
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10 page-container">
      <div className="flex flex-col gap-5">
        {results.length > 0 &&
          results.slice(0, 2).map((item, index) => (
            <div className="" key={item.id}>
              <h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block">
                {item.name}
              </h3>
              <div key={item.id} className="w-full aspect-video  gap-y-5">
                <iframe
                  width="852"
                  height="480"
                  src={`https://www.youtube.com/embed/${item.key}`}
                  title={item.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen={true}
                  className="w-full h-full object-fill"
                ></iframe>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
function MoviesSimilar() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "similar"), fetcher);
  if (!data) return null;
  const { results } = data;

  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10 page-container">
      <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
      <div className="movies-list ">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item, index) => (
              <SwiperSlide key={item.id}>
                <MoviesCard item={item}></MoviesCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
export default MovieDetailsPage;
