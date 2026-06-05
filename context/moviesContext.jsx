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
import tmdbQuery from "@/utils/tmdbQuery";
import { useRouter } from "next/navigation";

export const MoviesContext = createContext({});

export const MoviesProvider = ({ children }) => {
	const { signedInUser } = useAuth();
	const [moviesWatched, setWatchedMovies] = useState([]);
	const [watchlist, setWatchlist] = useState([]);
	const [actionMsg, setActionMsg] = useState("");
	const [searchText, setSearchText] = useState(null);
	const [searchResults, setSearchResults] = useState([]);
	const router = useRouter();

	useEffect(() => {
		if (!signedInUser?.id) {
			setWatchlist([]);
			return;
		}

		const getUserWatchList = async () => {
			try {
				const response = await fetch("/api/watchlist");
				if (!response.ok) {
					throw new Error("Failed to fetch watchlist");
				}
				const { data } = await response.json();
				setWatchlist(data ?? []);
			} catch (error) {
				console.error(error);
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
			try {
				const response = await fetch("/api/watched");
				if (!response.ok) {
					throw new Error("Failed to fetch movies watched");
				}
				const { data } = await response.json();
				setWatchedMovies(data ?? []);
			} catch (error) {
				console.error(error);
			}
		};
		getUserWatchedMovies();
	}, [signedInUser?.id]);

	const search = useCallback(async () => {
		const results = await tmdbQuery.searchMovies(searchText);
		setSearchResults({ movies: results });
		router.push("/Search");
	}, [router, searchText]);

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
				body: JSON.stringify({
					movieId: id,
					userId: signedInUser?.id,
					movieTitle: title,
				}),
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
		async (movie, dateWatched = new Date()) => {
			const res = await fetch("/api/watched", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					movieId: movie.id,
					userId: signedInUser?.id,
					movieTitle: movie.title,
					dateWatched:
						dateWatched instanceof Date
							? dateWatched.toISOString()
							: dateWatched,
				}),
			});
			const body = await res.json();
			if (!res.ok) {
				throw new Error("Failed to add movie as watched");
			}
			const row = body.movieWatched;
			setWatchedMovies((prev) => {
				const exists = prev.some(
					(item) => String(item.movieId) === String(row.movieId),
				);
				if (exists) {
					return prev.map((item) =>
						String(item.movieId) === String(row.movieId) ? row : item,
					);
				}
				return [...prev, row];
			});
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
			removeFromWatchlist,
			addToWatchlist,
			watchlist,
			actionMsg,
			markMovieAsWatched,
			moviesWatched,
			removeMovieAsWatched,
			setSearchText,
			search,
			searchResults,
		}),
		[
			actionMsg,
			markMovieAsWatched,
			removeFromWatchlist,
			addToWatchlist,
			watchlist,
			moviesWatched,
			removeMovieAsWatched,
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
