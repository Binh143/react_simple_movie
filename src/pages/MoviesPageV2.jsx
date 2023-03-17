import React, { useEffect, useState } from "react";
import MoviesCard, { MovieCardSkeleton } from "component/movies/MoviesCard";
import { fetcher, tmdbAPI } from "../config";
import useDebounce from "hook/useDebounce";
import { v4 } from "uuid";
import Button from "component/button/Button";
import useSWRInfinite from "swr/infinite";
const MoviesPageV2 = () => {
  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const filterDebounce = useDebounce(filter, 1500);
  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", nextPage));
    }
  }, [filterDebounce, nextPage]);
  const { data, size, setSize, isLoading } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  );

  const isEmpty = data?.[0]?.results?.length === 0;
  const movies = data?.[0]
    ? data?.reduce((a, b) => a.concat(b.results), [])
    : [];

  const isReachingEnd =
    isEmpty ||
    (data?.length > 0 && data?.[data.length - 1]?.results.length < 20);
  return (
    <div className="page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 text-white outline-none"
            placeholder="Type here to search..."
            onChange={handleFilterChange}
          />
        </div>
        <button className="p-4 bg-primary text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {isLoading && (
        <>
          <div className="grid grid-cols-4 gap-10">
            {new Array(8).fill(0).map(() => (
              <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
            ))}
          </div>
        </>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!isLoading &&
          movies?.length > 0 &&
          movies.map((item, index) => (
            <MoviesCard key={item.id} item={item}></MoviesCard>
          ))}
      </div>
      <div className="mt-10 text-center">
        <Button
          onClick={() => (isReachingEnd ? {} : setSize(size + 1))}
          disabled={isReachingEnd}
          className={`${isReachingEnd ? "hidden" : ""}`}
        >
          Load more...
        </Button>
      </div>
    </div>
  );
};

export default MoviesPageV2;
