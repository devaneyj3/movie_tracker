import { prisma } from "./prisma";

export async function getWatchlist() {
	return prisma.watchList.findMany();
}

export async function addToWatchlistEntry(userId, movieId, movieTitle) {
	return prisma.watchList.create({
		data: {
			userId,
			movieId: String(movieId),
			movieTitle,
		},
	});
}

export async function deleteFromWatchlistEntry(userId, movieId) {
	return prisma.watchList.delete({
		where: {
			userId_movieId: {
				userId,
				movieId: String(movieId),
			},
		},
	});
}
