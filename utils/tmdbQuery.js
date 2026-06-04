import tmdb from "@/lib/tmdb";

export async function searchMovies(query) {
	if (!query?.trim()) {
		return { results: [], total_results: 0, page: 1, total_pages: 0 };
	}

	return tmdb.search.movies({ query: query.trim() });
}

export async function getTrendingMovies() {
	return tmdb.trending.trending("movie", "day");
}

export async function getPopularMovies() {
	return tmdb.movies.popular();
}

export async function getUpcomingMovies() {
	return tmdb.movies.upcoming();
}

export async function getTopRatedMovies() {
	return tmdb.movies.topRated();
}

export async function getNowPlayingMovies() {
	return tmdb.movies.nowPlaying();
}

export async function getMovieDetails(movieId, appendToResponse) {
	return tmdb.movies.details(movieId, appendToResponse);
}

const categoryFetchers = {
	popular: getPopularMovies,
	upcoming: getUpcomingMovies,
	"top-rated": getTopRatedMovies,
	"now-playing": getNowPlayingMovies,
	trending: getTrendingMovies,
};

export async function getMoviesByCategory(category) {
	const fetcher = categoryFetchers[category];

	if (!fetcher) {
		throw new Error(`Unknown movie category: ${category}`);
	}

	return fetcher();
}

const tmdbQuery = {
	searchMovies,
	getTrendingMovies,
	getPopularMovies,
	getUpcomingMovies,
	getTopRatedMovies,
	getNowPlayingMovies,
	getMovieDetails,
	getMoviesByCategory,
};

export default tmdbQuery;
