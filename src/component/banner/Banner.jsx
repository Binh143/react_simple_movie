import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
const Banner = () => {
  // const [movies, setMovies] = useState([]);
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=3bd73b00a7a718c594da5466ec7f4960`,
    fetcher
  );
  const movies = data?.results || [];
  console.log("🚀 ~ file: Banner.jsx:12 ~ Banner ~ movies:", movies);
  return (
    <section className="banner h-screen  page-container-fluid mb-20 overflow-hidden">
      <Swiper grabCursor={"true"} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item, index) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
function BannerItem({ item }) {
  const { title, poster_path, id } = item;
  const navigate = useNavigate();

  return (
    <div className="w-full h-full  relative">
      <img
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        alt="endgame"
        className="h-full w-full object-cover object-top "
      />
      <div className="absolute left-0 bottom-0 w-full ">
        <div className="relative w-full">
          <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,.9)] to-transparent "></div>
          <div className="relative  w-full text-white p-10">
            <h2 className="font-bold text-3xl mb-3">{title}</h2>
            <div className="flex items-center gap-x-3 mb-8">
              <span className="px-4 py-2 border border-white rounded-md">
                Action
              </span>
              <span className="px-4 py-2 border border-white rounded-md">
                Anventure
              </span>
              <span className="px-4 py-2 border border-white rounded-md">
                Drama
              </span>
            </div>
            <Button onClick={() => navigate(`/movies/${id}`)}>Watch Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
