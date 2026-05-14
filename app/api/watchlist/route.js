import { addToWatchList, deleteFromWatchList, getWatchList } from "@/utils/watchListQueries";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
	const data = await getWatchList();
	return NextResponse.json({ data });
}
export async function POST(request) {
	const data = await request.json();
	const { movieId, userId } = data;
	try {
		const createdWatchList = await addToWatchList(userId, movieId);
		return NextResponse.json(
			{ success: true, createdWatchList },
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
		const deletedMovieFromWatchlist = await deleteFromWatchList(userId, movieId);
		return NextResponse.json(
      { success: true, deletedMovieFromWatchlist },
			{ status: 201 },
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ success: false, error: error }, { status: 500 });
	}
}
