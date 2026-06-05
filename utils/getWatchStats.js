export function getWatchStats(watchedMovies, movieId) {
	const record = watchedMovies.find(
		(item) => String(item.movieId) === String(movieId),
	);

	if (!record?.watchDates?.length) {
		return null;
	}

	const sortedDates = [...record.watchDates].sort(
		(a, b) => new Date(b.dateWatched) - new Date(a.dateWatched),
	);

	return {
		mostRecent: sortedDates[0].dateWatched,
		timesWatched: record.watchDates.length,
	};
}
