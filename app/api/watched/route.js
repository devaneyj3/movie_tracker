
import { addMoviesWatched, deleteMoviesWatched, getMoviesWatched } from "@/utils/moviesWatchedQueries";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getMoviesWatched();
  return NextResponse.json({ data });
}
export async function POST(request) {
  const data = await request.json();
  const { movieId, userId, movieTitle, dateWatched } = data;
  try {
    const movieWatched = await addMoviesWatched(
      userId,
      movieId,
      movieTitle,
      dateWatched,
    );
    console.log(movieWatched)
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
    const deletedMovieWatched = await deleteMoviesWatched(userId, movieId);
    return NextResponse.json(
      { success: true, deletedMovieWatched },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
