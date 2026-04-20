const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMovies = async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    return data.results;
}

export const API = {
    getNowShowing: () => fetchMovies('/movie/now_playing'),
    getUpcoming: () => fetchMovies('/movie/upcoming'),
    getTopRated: () => fetchMovies('/movie/top_rated'),
    getRecommended: () => fetchMovies('/movie/popular'),
    getMovieDetails: async (id) => {
      const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`);
      return await res.json();
    },
    imgUrl: (path) => `https://image.tmdb.org/t/p/w500${path}`
};