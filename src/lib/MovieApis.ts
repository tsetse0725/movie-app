import axios from "axios";

// Header-ийг функц болгож runtime дээр хувьсагчийг уншина
const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
});

// Upcoming
export const GetUpcomingApi = async (page = 1) => {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
      { headers: getHeaders() }
    );
    return result.data;
  } catch (error: any) {
    console.error("TMDB GetUpcomingApi error:", error?.response?.data || error.message);
    throw error;
  }
};

// Popular
export const GetPopularApi = async (page = 1) => {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
      { headers: getHeaders() }
    );
    return result.data;
  } catch (error: any) {
    console.error("TMDB GetPopularApi error:", error?.response?.data || error.message);
    throw error;
  }
};

// Top Rated
export const GetTopRatedApi = async (page = 1) => {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
      { headers: getHeaders() }
    );
    return result.data;
  } catch (error: any) {
    console.error("TMDB GetTopRatedApi error:", error?.response?.data || error.message);
    throw error;
  }
};

// Movie Detail
export const GetMovieDetailApi = async (id: string) => {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      { headers: getHeaders() }
    );
    return result.data;
  } catch (error: any) {
    console.error("TMDB GetMovieDetailApi error:", error?.response?.data || error.message);
    throw error;
  }
};

// Movie Videos
export const GetMovieVideosApi = async (id: string) => {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      { headers: getHeaders() }
    );
    return result.data;
  } catch (error: any) {
    console.error("TMDB GetMovieVideosApi error:", error?.response?.data || error.message);
    throw error;
  }
};

// Movie Credits
export const GetMovieCreditsApi = async (id: string) => {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      { headers: getHeaders() }
    );
    return result.data;
  } catch (error: any) {
    console.error("TMDB GetMovieCreditsApi error:", error?.response?.data || error.message);
    throw error;
  }
};

// Similar Movies
export const GetSimilarMoviesApi = async (id: string) => {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
      { headers: getHeaders() }
    );
    return result.data;
  } catch (error: any) {
    console.error("TMDB GetSimilarMoviesApi error:", error?.response?.data || error.message);
    throw error;
  }
};

// Search Movies
export const GetSearchMoviesApi = async (query: string, page = 1) => {
  if (!query) return { results: [] };
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`,
      { headers: getHeaders() }
    );
    return result.data;
  } catch (error: any) {
    console.error("TMDB GetSearchMoviesApi error:", error?.response?.data || error.message);
    throw error;
  }
};

// Movies by Genre
export const GetMoviesByGenre = async (genreId: number, page = 1) => {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genreId}&page=${page}`,
      { headers: getHeaders() }
    );
    return result.data;
  } catch (error: any) {
    console.error("TMDB GetMoviesByGenre error:", error?.response?.data || error.message);
    throw error;
  }
};