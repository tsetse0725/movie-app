import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
};

export const GetHeroApi = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    { headers }
  );

  const movies = res?.data?.results?.slice(0, 5) || [];

  //  Трейлер key-г кино бүр дээр авч нэмэх
  const moviesWithTrailers = await Promise.all(
    movies.map(async (movie: any) => {
      try {
        const videoRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
          { headers }
        );

        const videos = videoRes?.data?.results || [];
        const trailer = videos.find(
          (v: any) =>
            v.type === "Trailer" && v.site === "YouTube" && v.official === true
        );

        return {
          ...movie,
          trailerKey: trailer?.key || "", // Трейлер байвал нэмнэ
        };
      } catch (error) {
        console.warn(`🎥 Error fetching trailer for ${movie.title}:`, error);
        return {
          ...movie,
          trailerKey: "",
        };
      }
    })
  );

  return { results: moviesWithTrailers };
};
