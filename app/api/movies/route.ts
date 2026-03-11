import { discoverMovies, searchMovies } from "@/lib/tmdb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const query = searchParams.get("query") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const genre = searchParams.get("genre") || "";
    const sortBy = searchParams.get("sort_by") || "popularity.desc";

    try {
        const data = query
            ? await searchMovies(query, page)
            : await discoverMovies({ page, genreId: genre || undefined, sortBy });

        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch movies" },
            { status: 500 },
        );
    }
}
