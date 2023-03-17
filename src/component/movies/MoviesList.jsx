import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MoviesCard, { MovieCardSkeleton } from "./MoviesCard";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";

const MoviesList = ({ type = "now_playing" }) => {
  const [movies, setMovies] = useState([]);
  const { data, isLoading } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  useEffect(() => {
    data && data.results && setMovies(data.results);
  }, [data]);
  return (
    <>
      <div className="movies-list ">
        {isLoading && (
          <>
            <Swiper
              grabCursor={"true"}
              spaceBetween={40}
              slidesPerView={"auto"}
            >
              <SwiperSlide>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
              <SwiperSlide>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
              <SwiperSlide>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
              <SwiperSlide>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
              <SwiperSlide>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
            </Swiper>
          </>
        )}
        {!isLoading && (
          <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
            {movies.length > 0 &&
              movies.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <MoviesCard item={item}></MoviesCard>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </>
  );
};
MoviesList.propTypes = {
  type: PropTypes.string.isRequired,
};
function FallbackComponent() {
  return (
    <p className="bg-red-50 text-red-400">
      Some thing went wrong with this component
    </p>
  );
}
export default withErrorBoundary(MoviesList, {
  FallbackComponent,
});
