import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";

interface MovieGridProps {
    movies: Movie[];
    searchQuery?: string;
}

export default function MovieGrid({ movies, searchQuery }: MovieGridProps) {
    if (movies.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-xl text-gray-400">
                    {searchQuery
                        ? `No movies found for "${searchQuery}"`
                        : "No movies available"}
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    )
}