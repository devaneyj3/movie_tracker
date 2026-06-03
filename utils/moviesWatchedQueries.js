import { prisma } from "./prisma";


export async function getMoviesWatched() {
  const watchedMovies = await prisma.watchedMovies.findMany({
    include: {
      watchDates: {
        orderBy: { dateWatched: "desc" },
      },
    },
  });
  return watchedMovies;
}
export async function addMoviesWatched(userId, movieId, movieTitle, dateWatched = new Date()) {
  const watchedAt =
    dateWatched instanceof Date ? dateWatched : new Date(dateWatched);

  const watchedMovie = await prisma.watchedMovies.upsert({
    where: {
      userId_movieId: {
        userId,
        movieId: String(movieId),
      },
    },
    create: {
      userId,
      movieId: String(movieId),
      movieTitle,
      watchDates: {
        create: { dateWatched: watchedAt, movieTitle },
      },
    },
    update: {
      movieTitle,
      watchDates: {
        create: { dateWatched: watchedAt, movieTitle },
      },
    },
    include: {
      watchDates: {
        orderBy: { dateWatched: "desc" },
      },
    },
  });
  return watchedMovie;
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