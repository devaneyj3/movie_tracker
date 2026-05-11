import { prisma } from "./prisma";


export async function  getWatchList() {
  // Fetch all users with their posts
  const allMovies = await prisma.watchList.findMany();
  return allMovies;
}
async function  addWatchList() {
  // Fetch all users with their posts
  const allUsers = await print.user.findMany({
    include: {
      posts: true,
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}