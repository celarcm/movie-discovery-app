import { Movie } from "@/types/movie";
import Image from "next/image";

export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        <div key={movie.id} className="transition-transform duration-300 hover:scale-105">
            <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={500} height={500} />
        </div>
    )
}