import Image from "next/image";
import { getPopularMovies } from "@/lib/tmdb";
import { Movie } from "@/types/movie";

export default async function Homepage() {
  const movies = await getPopularMovies();

  return (
    <div className="flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black py-10">
      <h1 className="text-2xl font-bold py-10">Popular Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.results.map((movie: Movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={500} height={500} />
          </div>
        ))}
      </div>
    </div>
  );
}
