import { getPopularMovies } from "@/lib/tmdb";
import { TMDBResponse } from "@/types/movie";
import MovieGrid from "@/components/MovieGrid";

export default async function Homepage() {
  const movies: TMDBResponse = await getPopularMovies();

  return (
    <div className="flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black py-10">
      <h1 className="text-2xl font-bold py-10">Popular Movies</h1>
      <MovieGrid movies={movies.results} />
    </div>
  );
}
