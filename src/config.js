export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "3bd73b00a7a718c594da5466ec7f4960";
const tmdbEndpoit = `https://api.themoviedb.org/3/`;
export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoit}movie/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetails: (movieId) =>
    `${tmdbEndpoit}movie/${movieId}?api_key=${apiKey}`,
  getMovieMeta: (movieId, type) =>
    `${tmdbEndpoit}movie/${movieId}/${type}?api_key=${apiKey}`,
  getImageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  getImageW500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
  getMovieSearch: (query, page) =>
    `${tmdbEndpoit}search/movie?api_key=${apiKey}&query=${query}&page=${page}`,
};
