import { prisma } from "./prisma";


export async function getWatchList() {
  // Fetch all users with their posts
  const allMovies = await prisma.watchList.findMany();
  return allMovies;
}
export async function addToWatchList(userId, movieId) {
  const createdWatchList = await prisma.watchList.create({
    data: {
      userId: userId,
      movieId: String(movieId)
    },
  });
  return createdWatchList
}