import {
	addWatchedMovie,
	deleteWatchedMovie,
	getWatchedMovies,
} from "@/utils/watchedMoviesQueries";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
	const data = await getWatchedMovies();
	return NextResponse.json({ data });
}

export async function POST(request) {
	const data = await request.json();
	const { movieId, userId, movieTitle, dateWatched } = data;
	try {
		const movieWatched = await addWatchedMovie(
			userId,
			movieId,
			movieTitle,
			dateWatched,
		);
		return NextResponse.json(
			{ success: true, movieWatched },
			{ status: 201 },
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ success: false, error: error }, { status: 500 });
	}
}

export async function DELETE(request) {
	const data = await request.json();
	const { movieId, userId } = data;
	try {
		const deletedMovieWatched = await deleteWatchedMovie(userId, movieId);
		return NextResponse.json(
			{ success: true, deletedMovieWatched },
			{ status: 201 },
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ success: false, error: error }, { status: 500 });
	}
}
