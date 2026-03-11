import { Movie } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl, GENRE_MAP } from "@/lib/tmdb";

export default function MovieCard({ movie }: { movie: Movie }) {
    const imageUrl = getImageUrl(movie.poster_path);
    const genres = movie.genre_ids
        ?.slice(0, 3)
        .map((id) => GENRE_MAP[id])
        .filter(Boolean) ?? [];
    const rating = movie.vote_average?.toFixed(1);

    return (
        <Link href={`/movie/${movie.id}`}>
            <div className="relative h-full group transition-transform duration-300 hover:scale-105">
                {movie.poster_path ? (
                    <Image className="rounded-md" src={imageUrl} alt={movie.title} width={500} height={500} />
                ) : (
                    <div className="h-full rounded-md bg-gray-800 flex flex-col items-center justify-center">
                        <div className="text-gray-200 font-medium p-2">{movie.title}</div>
                        <svg
                            className="w-24 h-24 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                            />
                        </svg>
                    </div>
                )}

                <div className="absolute inset-0 rounded-md bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2">
                        {movie.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1.5">
                        <svg className="w-4 h-4 text-yellow-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-yellow-400 font-medium text-sm">{rating}</span>
                    </div>
                    {genres.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {genres.map((genre) => (
                                <span key={genre} className="text-xs bg-white/20 text-gray-200 rounded px-1.5 py-0.5">
                                    {genre}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}