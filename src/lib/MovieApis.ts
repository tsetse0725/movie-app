import axios from "axios";

// Токен болон header-уудыг авах функц
const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
});

// Upcoming кино авах
export const GetUpcomingApi = async (page = 1) => {
  console.log("TMDB_BEARER_TOKEN:", process.env.TMDB_BEARER_TOKEN);
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
      { headers: getHeaders() }
    );
    return result.data;
  } catch (error: any) {
    console.error("TMDB GetUpcomingApi error:", error?.response?.status, error?.response?.data || error.message);
    throw error;
  }
};

// Popular кино авах
export const GetPopularApi = async (page = 1) => {
  console.log("TMDB_BEARER_TOKEN:", process.env.TMDB_BEARER_TOKEN);
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
      { headers: getHeaders() }
    );
    return result.data;
  } catch (error: any) {
    console.error("TMDB GetPopularApi error:", error?.response?.status, error?.response?.data || error.message);
    throw error;
  }
};

// Top Rated кино авах
export const GetTopRatedApi = async (page = 1) => {
  console.log("TMDB_BEARER_TOKEN:", process.env.TMDB_BEARER_TOKEN);
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
      { headers: getHeaders() }
    );
    return result.data;
  } catch (error: any) {
    console.error("TMDB GetTopRatedApi error:", error?.response?.status, error?.response?.data || error.message);
    throw error;
  }
};

// Киноны дэлгэрэнгүй авах
export const GetMovieDetailApi = async (id: string | number) => {
  console.log("TMDB_BEARER_TOKEN:", process.env.TMDB_BEARER_TOKEN);
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      { headers: getHeaders() }
    );
    return result.data;
  } catch (error: any) {
    console.error("TMDB GetMovieDetailApi error:", error?.response?.status, error?.response?.data || error.message);
    throw error;
  }
};

// Уран бүтээлчид (credits)
export const GetMovieCreditsApi = async (id: string | number) => {
  console.log("TMDB_BEARER_TOKEN:", process.env.TMDB_BEARER_TOKEN);
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      { headers: getHeaders() }
    );
    return result.data;
  } catch (error: any) {
    console.error("TMDB GetMovieCreditsApi error:", error?.response?.status, error?.response?.data || error.message);
    throw error;
  }
};

// Видео (trailer, teaser)
export const GetMovieVideosApi = async (id: string | number) => {
  console.log("TMDB_BEARER_TOKEN:", process.env.TMDB_BEARER_TOKEN);
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      { headers: getHeaders() }
    );
    return result.data;
  } catch (error: any) {
    console.error("TMDB GetMovieVideosApi error:", error?.response?.status, error?.response?.data || error.message);
    throw error;
  }
};

// Төстэй кинонууд
export const GetSimilarMoviesApi = async (id: string | number, page = 1) => {
  console.log("TMDB_BEARER_TOKEN:", process.env.TMDB_BEARER_TOKEN);
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}`,
      { headers: getHeaders() }
    );
    return result.data;
  } catch (error: any) {
    console.error("TMDB GetSimilarMoviesApi error:", error?.response?.status, error?.response?.data || error.message);
    throw error;
  }
};

// Жанраар кино авах
export const GetMoviesByGenre = async (genreId: string | number, page = 1) => {
  console.log("TMDB_BEARER_TOKEN:", process.env.TMDB_BEARER_TOKEN);
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=${page}`,
      { headers: getHeaders() }
    );
    return result.data;
  } catch (error: any) {
    console.error("TMDB GetMoviesByGenre error:", error?.response?.status, error?.response?.data || error.message);
    throw error;
  }
};

// Хайлт хийх
export const GetSearchMoviesApi = async (query: string, page = 1) => {
  console.log("TMDB_BEARER_TOKEN:", process.env.TMDB_BEARER_TOKEN);
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`,
      { headers: getHeaders() }
    );
    return result.data;
  } catch (error: any) {
    console.error("TMDB GetSearchMoviesApi error:", error?.response?.status, error?.response?.data || error.message);
    throw error;
  }
};