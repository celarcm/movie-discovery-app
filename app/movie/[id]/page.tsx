import Image from "next/image";
import { notFound } from "next/navigation";
import { getMovieDetails, getImageUrl } from "@/lib/tmdb";

interface MoviePageProps {
    params: Promise<{ id: string }>;
}

export default async function MovieDetailsPage({ params }: MoviePageProps) {
    const { id } = await params

    const movieId = parseInt(id)

    if (isNaN(movieId)) {
        notFound();
    }

    try {
        const movie = await getMovieDetails(movieId);

        const imageUrl = getImageUrl(movie.poster_path);
        const userScore = `${Number(movie.vote_average * 10).toFixed(0)}%`;
        const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
        const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "N/A";

        return (
            <div className="min-h-screen py-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-shrink-0 w-full md:w-80">
                            <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-2xl">
                                <Image
                                    src={imageUrl}
                                    alt={movie.title}
                                    fill
                                />
                            </div>
                        </div>

                        <div className="flex-1">

                            <h1 className="text-4xl sm:text-5xl font-bold mb-2">{movie.title}</h1>

                            {movie.tagline && (
                                <p className="text-xl text-gray-400 italic mb-4">{movie.tagline}</p>
                            )}

                            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm sm:text-base">
                                <span className="font-bold">{userScore}</span>
                                <span className="text-gray-400">|</span>
                                <span>{releaseYear}</span>
                                <span className="text-gray-400">|</span>
                                <span>{runtime}</span>
                            </div>

                            {movie.genres.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {movie.genres.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="px-3 py-1 bg-blue-600/20 border border-blue-600 rounded-full text-sm"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold mb-3">Overview</h2>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    {movie.overview || "No overview available."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        notFound();
    }
}
