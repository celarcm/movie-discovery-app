import { TMDBResponse } from "@/types/movie";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

if (!API_KEY) {
    console.warn("TMDB API key is not set. Please add TMDB_API_KEY to your .env file");
}

export const getPopularMovies = async (page: number = 1): Promise<TMDBResponse> => {
    const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
    );

    if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
    }

    return response.json();
};

export const searchMovies = async (query: string, page: number = 1): Promise<TMDBResponse> => {
    if (!query.trim()) {
        return getPopularMovies(page);
    }

    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
    );

    if (!response.ok) {
        throw new Error("Failed to search movies");
    }

    return response.json();
};