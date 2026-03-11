import { discoverMovies, searchMovies, getGenres } from "@/lib/tmdb";
import { TMDBResponse } from "@/types/movie";
import MovieGrid from "@/components/MovieGrid";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";

interface HomePageProps {
  searchParams: Promise<{ query?: string; genre?: string; sort_by?: string }>
}

export default async function Homepage({ searchParams }: HomePageProps) {
  const { query, genre, sort_by } = await searchParams;
  const searchQuery = query || "";
  const genreId = genre || "";
  const sortBy = sort_by || "popularity.desc";

  const [movies, genres]: [TMDBResponse, Awaited<ReturnType<typeof getGenres>>] = await Promise.all([
    searchQuery
      ? searchMovies(searchQuery)
      : discoverMovies({ genreId: genreId || undefined, sortBy }),
    getGenres(),
  ]);

  const activeGenreName = genreId
    ? genres.find((g) => String(g.id) === genreId)?.name
    : null;

  let heading = "Popular Movies";
  if (searchQuery) {
    heading = `Search Results for "${searchQuery}"`;
  } else if (activeGenreName && sortBy !== "popularity.desc") {
    heading = `${activeGenreName} Movies`;
  } else if (activeGenreName) {
    heading = `${activeGenreName} Movies`;
  } else if (sortBy !== "popularity.desc") {
    heading = "Movies";
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-zinc-50 font-sans dark:bg-black py-10 px-4">
      <header className="mb-8 w-full space-y-6">
        <h1 className="text-4xl sm:text-5xl text-center font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          Movie Discovery
        </h1>
        <SearchBar />
        <div className="max-w-[1920px] mx-auto">
          <FilterBar genres={genres} />
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto flex flex-col">
        <h2 className="text-2xl font-bold py-4 w-full self-start">{heading}</h2>
        <MovieGrid
          initialMovies={movies.results}
          initialPage={movies.page}
          totalPages={movies.total_pages}
          searchQuery={searchQuery}
          genre={genreId}
          sortBy={sortBy}
        />
      </main>
    </div>
  );
}
