import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
};

// Upcoming
export const GetUpcomingApi = async (page = 1) => {
  const result = await axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`,
    { headers }
  );
  return result.data;
};

// Popular
export const GetPopularApi = async (page = 1) => {
  const result = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
    { headers }
  );
  return result.data;
};

// Top Rated
export const GetTopRatedApi = async (page = 1) => {
  const result = await axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,
    { headers }
  );
  return result.data;
};

//  Movie Detail
export const GetMovieDetailApi = async (id: string) => {
  const result = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    { headers }
  );
  return result.data;
};

//  Movie Videos
export const GetMovieVideosApi = async (id: string) => {
  const result = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    { headers }
  );
  return result.data;
};

//  Movie Credits
export const GetMovieCreditsApi = async (id: string) => {
  const result = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
    { headers }
  );
  return result.data;
};

//  Similar Movies
export const GetSimilarMoviesApi = async (id: string) => {
  const result = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
    { headers }
  );
  return result.data;
};

//  Search Movies
export const GetSearchMoviesApi = async (query: string, page = 1) => {
  if (!query) return { results: [] };
  const result = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query
    )}&language=en-US&page=${page}`,
    { headers }
  );
  return result.data;
};
