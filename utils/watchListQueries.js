import { prisma } from "./prisma";


export async function getWatchList() {
  // Fetch all users with their posts
  const allMovies = await prisma.watchList.findMany();
  return allMovies;
}
export async function addToWatchList(userId, movieId, movieTitle) {
  const createdWatchList = await prisma.watchList.create({
    data: {
      userId,
      movieId: String(movieId),
      movieTitle,
    },
  });
  return createdWatchList;
}
export async function deleteFromWatchList(userId, movieId) {
	return prisma.watchList.delete({
		where: {
			userId_movieId: {
				userId,
				movieId: String(movieId),
			},
		},
	});
}