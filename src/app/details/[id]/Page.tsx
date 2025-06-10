import axios from "axios";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
});

// Киноны дэлгэрэнгүй
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

// Киноны уран бүтээлчид (credits)
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

// Киноны видеонууд (trailer, teaser)
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