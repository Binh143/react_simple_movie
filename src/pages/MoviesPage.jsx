import React, { useEffect, useState } from "react";
// import MoviesList from "../component/movies/MoviesList";
import useSWR from "swr";
import MoviesCard, { MovieCardSkeleton } from "component/movies/MoviesCard";
import { fetcher, tmdbAPI } from "../config";
import useDebounce from "hook/useDebounce";
import ReactPaginate from "react-paginate";
import { v4 } from "uuid";
import Button from "component/button/Button";

const MoviesPage = () => {
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
  const { data, isLoading } = useSWR(url, fetcher);

  const movies = data?.results || [];
  const pageCount = data?.total_pages > 500 ? 500 : data?.total_pages;
  const handlePageClick = (event) => {
    setNextPage(event.selected + 1);
  };
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
        <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
      )}

      <div className="grid grid-cols-4 gap-10">
        {!isLoading &&
          movies.length > 0 &&
          movies.map((item, index) => (
            <MoviesCard key={item.id} item={item}></MoviesCard>
          ))}
      </div>
      <div className="mt-10 text-center">
        <Button>Load more...</Button>
      </div>
      {/* pagination */}
      <div className="mt-10 py-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default MoviesPage;
