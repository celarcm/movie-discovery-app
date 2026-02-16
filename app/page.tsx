import { getPopularMovies, searchMovies } from "@/lib/tmdb";
import { TMDBResponse } from "@/types/movie";
import MovieGrid from "@/components/MovieGrid";
import SearchBar from "@/components/SearchBar";

interface HomePageProps {
  searchParams: Promise<{ query?: string }>
}

export default async function Homepage({ searchParams }: HomePageProps) {
  const { query } = await searchParams
  const searchQuery = query || ''

  const movies: TMDBResponse = searchQuery
    ? await searchMovies(searchQuery)
    : await getPopularMovies();

  return (
    <div className="min-h-screen flex flex-col items-center bg-zinc-50 font-sans dark:bg-black py-10 px-4">
      <header className="mb-12 w-full">
        <h1 className="text-4xl sm:text-5xl text-center font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-10">
          Movie Discovery
        </h1>
        <SearchBar />
      </header>

      <main className="max-w-[1920px] mx-auto flex flex-col">
        <h1 className="text-2xl font-bold py-4 w-full self-start">{searchQuery ? `Search Results for "${searchQuery}"` : "Popular Movies"}</h1>
        <MovieGrid movies={movies.results} searchQuery={searchQuery} />
      </main>
    </div>
  );
}
