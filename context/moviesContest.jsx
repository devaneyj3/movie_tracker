"use client";
import { useAuth } from "@/context/authContext";
import {
	createContext,
	useContext,
	useState,
	useEffect,
	useMemo,
	useCallback,
} from "react";
import { getCurrentDateFormatted } from "@/utils/currrentDate";
import tmdb from "@/lib/tmdb";
import { useRouter } from "next/navigation";
import sortByDate from "@/utils/sortByDate";

export const MoviesContext = createContext({});

export const MoviesProvider = ({ children }) => {
	const { signedInUser } = useAuth();
	const [moviesWatched, setWatchedMovies] = useState([]);
	const [movies, setMovies] = useState([]);
	const [watchlist, setWatchlist] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [actionMsg, setActionMsg] = useState("");
	const [selectedMovie, setSelectedMovie] = useState({});
	const [sortBy, setSortBy] = useState(null);
	const [searchText, setSearchText] = useState(null);
	const [searchResults, setSearchResults] = useState([]);
	const router = useRouter();
	useEffect(() => {
		const getMovies = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await tmdb.trending.trending("movie", "day");
				const { results, page, total_pages, total_results } = response;
				const sortedMovies = sortByDate(results);
				setMovies(sortedMovies);
			} catch (error) {
				console.error(error);
				setError(err.message);
				if (data.length > 0) setSelectedMovie(data[0]);
			} finally {
				setIsLoading(false);
			}
		};
		getMovies();
	}, []);
	useEffect(() => {
		if (!signedInUser?.id) {
			setWatchlist([]);
			return;
		}

		const getUserWatchList = async () => {
			setError(null);
			try {
				const response = await fetch("/api/watchlist");
				if (!response.ok) {
					throw new Error("Failed to fetch watchlist");
				}
				const { data } = await response.json();
				setWatchlist(data ?? []);
			} catch (error) {
				console.error(error);
				setError(error.message);
			}
		};
		getUserWatchList();
	}, [signedInUser?.id]);

	useEffect(() => {
		if (!signedInUser?.id) {
			setWatchedMovies([]);
			return;
		}

		const getUserWatchedMovies = async () => {
			setError(null);
			try {
				const response = await fetch("/api/watched");
				if (!response.ok) {
					throw new Error("Failed to fetch movies watched");
				}
				const { data } = await response.json();
				setWatchedMovies(data ?? []);
			} catch (error) {
				console.error(error);
				setError(error.message);
			}
		};
		getUserWatchedMovies();
	}, [signedInUser?.id]);

	const search = async () => {
		const results = await tmdb.search.movies({ query: searchText });
		setSearchResults({ movies: results });
		router.push("/Search");
	};
	const removeFromWatchlist = useCallback(
		async (movieId, displayTitle) => {
			const res = await fetch("/api/watchlist", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					movieId,
					userId: signedInUser?.id,
				}),
			});
			const body = await res.json();
			if (!res.ok) {
				throw new Error(
					typeof body?.error === "string"
						? body.error
						: "Failed to remove from watchlist",
				);
			}
			const mid = String(movieId);
			setWatchlist((prev) =>
				prev.filter((item) => String(item.movieId) !== mid),
			);
			setActionMsg(
				displayTitle
					? `You removed ${displayTitle} from your watchlist`
					: selectedMovie?.title
						? `You removed ${selectedMovie.title} from your watchlist`
						: "You removed a title from your watchlist",
			);
			setTimeout(() => setActionMsg(""), 1000);
			return body;
		},
		[signedInUser?.id],
	);

	const addToWatchlist = useCallback(
		async (id, title) => {
			const res = await fetch("/api/watchlist", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ movieId: id, userId: signedInUser?.id }),
			});
			const body = await res.json();
			if (!res.ok) {
				throw new Error("Failed to add to watchlist");
			}
			const row = body.createdWatchList;
			setWatchlist((prev) => [...prev, row]);
			setActionMsg(`You added ${title} to your watchlist`);
			setTimeout(() => setActionMsg(""), 5000);
			return row;
		},
		[signedInUser?.id],
	);

	const markMovieAsWatched = useCallback(
		async (movie) => {
			const res = await fetch("/api/watched", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ movieId: movie.id, userId: signedInUser?.id }),
			});
			const body = await res.json();
			if (!res.ok) {
				throw new Error("Failed to add movie as watched");
			}
			const row = body.movieWatched;
			const today = getCurrentDateFormatted();
			row.lastWatchedDate = today;
			setWatchedMovies((prev) => [...prev, row]);
			setActionMsg(`You marked ${movie.title} as watched`);
			setTimeout(() => setActionMsg(""), 5000);
		},
		[signedInUser?.id],
	);
	const removeMovieAsWatched = useCallback(
		async (movie) => {
			const res = await fetch("/api/watched", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ movieId: movie.id, userId: signedInUser?.id }),
			});
			const body = await res.json();
			if (!res.ok) {
				throw new Error("Failed to remove movie as watched");
			}
			const deletedId = body.deletedMovieWatched.movieId;
			setWatchedMovies((prev) =>
				prev.filter((item) => String(item.movieId) !== deletedId),
			);
			setActionMsg(`You removed ${movie.title} as watched`);
			setTimeout(() => setActionMsg(""), 5000);
		},
		[signedInUser?.id],
	);

	const values = useMemo(
		() => ({
			movies,
			setMovies,
			selectedMovie,
			setSelectedMovie,
			removeFromWatchlist,
			addToWatchlist,
			watchlist,
			actionMsg,
			error,
			isLoading,
			markMovieAsWatched,
			moviesWatched,
			removeMovieAsWatched,
			sortBy,
			setSortBy,
			setSearchText,
			search,
			searchResults,
		}),
		[
			movies,
			setMovies,
			actionMsg,
			markMovieAsWatched,
			selectedMovie,
			setSelectedMovie,
			removeFromWatchlist,
			addToWatchlist,
			watchlist,
			error,
			isLoading,
			moviesWatched,
			removeMovieAsWatched,
			sortBy,
			setSortBy,
			setSearchText,
			search,
			searchResults,
		],
	);
	return (
		<MoviesContext.Provider value={values}>{children}</MoviesContext.Provider>
	);
};

export const useMovies = () => useContext(MoviesContext);
