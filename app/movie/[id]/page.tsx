import Image from "next/image";
import Link from "next/link";
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
                                {movie.poster_path ? (
                                    <Image
                                        src={imageUrl}
                                        alt={movie.title}
                                        fill
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
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
                            </div>
                        </div>

                        <div className="flex-1">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4 transition-colors"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                Back to movies
                            </Link>

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
