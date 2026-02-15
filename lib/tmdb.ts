import { TMDBResponse } from "@/types/movie";

export const getPopularMovies = async (page: number = 1): Promise<TMDBResponse> => {
    const API_KEY = process.env.TMDB_API_KEY;
    const BASE_URL = 'https://api.themoviedb.org/3';

    const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
    );

    if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
    }

    return response.json();
};