"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Movie, TMDBResponse } from "@/types/movie";
import MovieCard from "./MovieCard";

interface MovieGridProps {
    initialMovies: Movie[];
    initialPage: number;
    totalPages: number;
    searchQuery?: string;
    genre?: string;
    sortBy?: string;
}

export default function MovieGrid({
    initialMovies,
    initialPage,
    totalPages,
    searchQuery,
    genre,
    sortBy,
}: MovieGridProps) {
    const [movies, setMovies] = useState<Movie[]>(initialMovies);
    const [page, setPage] = useState(initialPage);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(initialPage < totalPages);
    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMovies(initialMovies);
        setPage(initialPage);
        setHasMore(initialPage < totalPages);
    }, [initialMovies, initialPage, totalPages]);

    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        const nextPage = page + 1;
        const params = new URLSearchParams({ page: String(nextPage) });
        if (searchQuery) params.set("query", searchQuery);
        if (genre) params.set("genre", genre);
        if (sortBy) params.set("sort_by", sortBy);

        try {
            const res = await fetch(`/api/movies?${params}`);
            const data: TMDBResponse = await res.json();

            setMovies((prev) => {
                const existingIds = new Set(prev.map((m) => m.id));
                const newMovies = data.results.filter((m) => !existingIds.has(m.id));
                return [...prev, ...newMovies];
            });
            setPage(nextPage);
            setHasMore(nextPage < data.total_pages);
        } catch (error) {
            console.error("Failed to load more movies:", error);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, page, searchQuery, genre, sortBy]);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { rootMargin: "200px" },
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [loadMore]);

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
        <div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {movies.map((movie: Movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            <div ref={sentinelRef} className="flex justify-center py-8">
                {loading && (
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-violet-600" />
                )}
            </div>
        </div>
    );
}
