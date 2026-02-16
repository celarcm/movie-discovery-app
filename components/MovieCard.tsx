import { Movie } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/tmdb";

export default function MovieCard({ movie }: { movie: Movie }) {
    const imageUrl = getImageUrl(movie.poster_path);

    return (
        <Link href={`/movie/${movie.id}`}>
            <div key={movie.id} className="h-100 transition-transform duration-300 hover:scale-105">
                {movie.poster_path ? (
                    <Image className="rounded-md" src={imageUrl} alt={movie.title} width={500} height={500} />
                ) : (
                    <div className="w-full h-full flex items-center justify-center rounded-md border border-gray-500 bg-black">
                        <div className="text-center text-gray-200 font-medium px-2">{movie.title}</div>
                    </div>
                )
                }

            </div>
        </Link>
    )
}