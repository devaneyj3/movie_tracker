import { prisma } from "./prisma";


export async function getMoviesWatched() {
  // Fetch all users with their posts
  const watchedMovies = await prisma.watchedMovies.findMany();
  return watchedMovies;
}
export async function addMoviesWatched(userId, movieId) {
  const watchedMovie = await prisma.watchedMovies.create({
    data: {
      userId: userId,
      movieId: String(movieId)
    },
  });
  return watchedMovie
}
export async function deleteMoviesWatched(userId, movieId) {
  return prisma.watchedMovies.delete({
    where: {
      userId_movieId: {
        userId,
        movieId: String(movieId),
      },
    },
  });
}