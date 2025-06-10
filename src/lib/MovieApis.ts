import axios from "axios";

// TMDB API-ийн header-уудыг бэлтгэх функц
const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
});

// Upcoming кино авах
export const GetUpcomingApi = async (page = 1) => {
  const result = await axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
    { headers: getHeaders() }
  );
  if (!result.data) throw new Error("Upcoming movies not found");
  return result.data;
};

// Popular кино авах
export const GetPopularApi = async (page = 1) => {
  const result = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
    { headers: getHeaders() }
  );
  if (!result.data) throw new Error("Popular movies not found");
  return result.data;
};

// Top Rated кино авах
export const GetTopRatedApi = async (page = 1) => {
  const result = await axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
    { headers: getHeaders() }
  );
  if (!result.data) throw new Error("Top rated movies not found");
  return result.data;
};

// Киноны дэлгэрэнгүй авах
export const GetMovieDetailApi = async (id: string | number) => {
  const result = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    { headers: getHeaders() }
  );
  if (!result.data) throw new Error("Movie details not found");
  return result.data;
};

// Киноны уран бүтээлчид (credits)
export const GetMovieCreditsApi = async (id: string | number) => {
  const result = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
    { headers: getHeaders() }
  );
  if (!result.data) throw new Error("Movie credits not found");
  return result.data;
};

// Киноны видеонууд (trailer, teaser)
export const GetMovieVideosApi = async (id: string | number) => {
  const result = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    { headers: getHeaders() }
  );
  if (!result.data) throw new Error("Movie videos not found");
  return result.data;
};

// Төстэй кинонууд
export const GetSimilarMoviesApi = async (id: string | number, page = 1) => {
  const result = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}`,
    { headers: getHeaders() }
  );
  if (!result.data) throw new Error("Similar movies not found");
  return result.data;
};

// Жанраар кино авах
export const GetMoviesByGenre = async (genreId: string | number, page = 1) => {
  const result = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=${page}`,
    { headers: getHeaders() }
  );
  if (!result.data) throw new Error("Movies by genre not found");
  return result.data;
};

// Кино хайлт хийх
export const GetSearchMoviesApi = async (query: string, page = 1) => {
  const result = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`,
    { headers: getHeaders() }
  );
  if (!result.data) throw new Error("Search movies not found");
  return result.data;
};