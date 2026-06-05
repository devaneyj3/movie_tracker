export const isMovieInList = (list, movieId) => {
	return list.some((entry) => String(entry.movieId) === String(movieId));
};
