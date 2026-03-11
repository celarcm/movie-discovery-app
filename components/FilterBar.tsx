"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Genre } from "@/types/movie";

const SORT_OPTIONS = [
    { value: "popularity.desc", label: "Most Popular" },
    { value: "vote_average.desc", label: "Highest Rated" },
    { value: "release_date.desc", label: "Newest First" },
    { value: "release_date.asc", label: "Oldest First" },
    { value: "original_title.asc", label: "Title A–Z" },
] as const;

interface FilterBarProps {
    genres: Genre[];
}

export default function FilterBar({ genres }: FilterBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeGenre = searchParams.get("genre") || "";
    const activeSort = searchParams.get("sort_by") || "popularity.desc";

    function navigate(params: Record<string, string>) {
        const next = new URLSearchParams(searchParams.toString());
        for (const [key, value] of Object.entries(params)) {
            if (value) {
                next.set(key, value);
            } else {
                next.delete(key);
            }
        }
        const qs = next.toString();
        router.push(qs ? `?${qs}` : "/");
    }

    function handleGenre(genreId: string) {
        navigate({ genre: activeGenre === genreId ? "" : genreId });
    }

    function handleSort(sortBy: string) {
        navigate({ sort_by: sortBy === "popularity.desc" ? "" : sortBy });
    }

    return (
        <div className="w-full space-y-4">
            <div className="flex flex-wrap items-center gap-2">
                <button
                    onClick={() => handleGenre("")}
                    className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                        !activeGenre
                            ? "bg-violet-600 text-white"
                            : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    }`}
                >
                    All
                </button>
                {genres.map((genre) => (
                    <button
                        key={genre.id}
                        onClick={() => handleGenre(String(genre.id))}
                        className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                            activeGenre === String(genre.id)
                                ? "bg-violet-600 text-white"
                                : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                        }`}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-2">
                <label htmlFor="sort-select" className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Sort by:
                </label>
                <select
                    id="sort-select"
                    value={activeSort}
                    onChange={(e) => handleSort(e.target.value)}
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                >
                    {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
