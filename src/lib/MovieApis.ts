// src/lib/MovieApis.ts
import axios from "axios";

// ✅ Headers тохиргоо (Bearer токен орж ирэх ёстой)
const headers = {
  Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
  "Content-Type": "application/json",
};

// ✅ TMDB API үндсэн URL
const BASE_URL = "https://api.themoviedb.org/3";

// ✅ Upcoming Movies
export const GetUpcomingApi = async (page = 1) => {
  const res = await axios.get(
    `${BASE_URL}/movie/upcoming?language=en-US&page=${page}`,
    { headers }
  );
  return res.data;
};

// ✅ Popular Movies
export const GetPopularApi = async (page = 1) => {
  const res = await axios.get(
    `${BASE_URL}/movie/popular?language=en-US&page=${page}`,
    { headers }
  );
  return res.data;
};

// ✅ Top Rated Movies
export const GetTopRatedApi = async (page = 1) => {
  const res = await axios.get(
    `${BASE_URL}/movie/top_rated?language=en-US&page=${page}`,
    { headers }
  );
  return res.data;
};

// ✅ Movie Detail by ID
export const GetMovieDetailApi = async (id: string) => {
  const res = await axios.get(
    `${BASE_URL}/movie/${id}?language=en-US`,
    { headers }
  );
  return res.data;
};

// ✅ Movie Videos (YouTube trailers)
export const GetMovieVideosApi = async (id: string) => {
  const res = await axios.get(
    `${BASE_URL}/movie/${id}/videos?language=en-US`,
    { headers }
  );
  return res.data;
};

// ✅ Movie Casts/Credits
export const GetMovieCreditsApi = async (id: string) => {
  const res = await axios.get(
    `${BASE_URL}/movie/${id}/credits?language=en-US`,
    { headers }
  );
  return res.data;
};

// ✅ Similar Movies
export const GetSimilarMoviesApi = async (id: string) => {
  const res = await axios.get(
    `${BASE_URL}/movie/${id}/similar?language=en-US&page=1`,
    { headers }
  );
  return res.data;
};

// ✅ Search Movies
export const GetSearchMoviesApi = async (query: string, page = 1) => {
  if (!query) return { results: [] }; // 🧠 Хоосон хайлтаас сэргийлнэ
  const res = await axios.get(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`,
    { headers }
  );
  return res.data;
};

// ✅ Movies by Genre ID
export const GetMoviesByGenre = async (genreId: number, page = 1) => {
  const res = await axios.get(
    `${BASE_URL}/discover/movie?language=en-US&with_genres=${genreId}&page=${page}`,
    { headers }
  );
  return res.data;
};
