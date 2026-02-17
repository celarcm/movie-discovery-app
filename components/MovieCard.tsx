import { Movie } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/tmdb";

export default function MovieCard({ movie }: { movie: Movie }) {
    const imageUrl = getImageUrl(movie.poster_path);

    return (
        <Link href={`/movie/${movie.id}`}>
            <div key={movie.id} className="h-full transition-transform duration-300 hover:scale-105">
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
                )
                }

            </div>
        </Link>
    )
}