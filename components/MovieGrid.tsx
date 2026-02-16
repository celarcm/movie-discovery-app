import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies }: { movies: Movie[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {movies.map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    )
}