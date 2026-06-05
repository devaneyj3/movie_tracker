const sortMovies = (sortOption, movieList) => {
	const movies = [...movieList];

	switch (sortOption) {
		case "popularity-desc":
			return movies.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
		case "popularity-asc":
			return movies.sort((a, b) => (a.popularity ?? 0) - (b.popularity ?? 0));
		case "rating-desc":
			return movies.sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0));
		case "rating-asc":
			return movies.sort((a, b) => (a.vote_average ?? 0) - (b.vote_average ?? 0));
		case "release-date-desc":
			return movies.sort(
				(a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0),
			);
		case "release-date-asc":
			return movies.sort(
				(a, b) => new Date(a.release_date || 0) - new Date(b.release_date || 0),
			);
		case "title-desc":
			return movies.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
		case "title-asc":
			return movies.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
		default:
			return movies;
	}
};

export default sortMovies;
