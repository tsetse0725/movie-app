export interface DetailProps {
  movie: {
    title: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    genres: { id: number; name: string }[];
    release_date: string;
    runtime: number;
    vote_average: number;
    vote_count: number;
  };
  credits: {
    cast: { name: string }[];
    crew: { name: string; job: string; department: string }[];
  };
  trailerKey: string;
  similar: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
  }[];
}
