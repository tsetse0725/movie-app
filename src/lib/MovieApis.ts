import axios from "axios";

// TMDB API-ийн header-уудыг бэлтгэнэ
const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
});

// Жишээ: Upcoming кинонуудыг авах функц
export const GetUpcomingApi = async (page = 1) => {
  // Bearer Token-ийн утга ямар байгааг log хийнэ
  console.log("TMDB_BEARER_TOKEN:", process.env.TMDB_BEARER_TOKEN);

  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
      { headers: getHeaders() }
    );
    return result.data;
  } catch (error: any) {
    // Fetch алдааг дэлгэрэнгүй log-доно
    console.error(
      "TMDB GetUpcomingApi error:",
      error?.response?.status,
      error?.response?.data || error.message
    );
    throw error;
  }
};

// Жишээ: Popular кинонуудыг авах функц
export const GetPopularApi = async (page = 1) => {
  console.log("TMDB_BEARER_TOKEN:", process.env.TMDB_BEARER_TOKEN);

  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
      { headers: getHeaders() }
    );
    return result.data;
  } catch (error: any) {
    console.error(
      "TMDB GetPopularApi error:",
      error?.response?.status,
      error?.response?.data || error.message
    );
    throw error;
  }
};

// Жишээ: Top Rated кинонуудыг авах функц
export const GetTopRatedApi = async (page = 1) => {
  console.log("TMDB_BEARER_TOKEN:", process.env.TMDB_BEARER_TOKEN);

  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
      { headers: getHeaders() }
    );
    return result.data;
  } catch (error: any) {
    console.error(
      "TMDB GetTopRatedApi error:",
      error?.response?.status,
      error?.response?.data || error.message
    );
    throw error;
  }
};