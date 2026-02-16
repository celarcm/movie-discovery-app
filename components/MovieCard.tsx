import { Movie } from "@/types/movie";
import Image from "next/image";

export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        <div key={movie.id} className="transition-transform duration-300 hover:scale-105">
            {movie.poster_path ? (
                <Image className="rounded-md" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={500} height={500} />
            ) : (
                <div className="w-full h-full flex items-center justify-center rounded-md border border-gray-500 bg-black">
                    <div className="text-center text-gray-200 font-medium px-2">{movie.title}</div>
                </div>
            )
            }

        </div>
    )
}