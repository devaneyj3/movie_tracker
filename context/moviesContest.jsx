"use client";

import { apiClient } from "@/utils/apiClient";
import { useAuth } from "@/context/authContext";
import {
	createContext,
	useContext,
	useState,
	useEffect,
	useMemo,
	useCallback,
} from "react";

export const MoviesContext = createContext({});

export const MoviesProvider = ({ children }) => {
	const { signedInUser } = useAuth();
	const [movies, setMovies] = useState([]);
	const [watchlist, setWatchlist] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [actionMsg, setActionMsg] = useState("");
	const [selectedMovie, setSelectedMovie] = useState({});
	useEffect(() => {
		const getMovies = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await apiClient.get("movie/now_playing", {
					params: { language: "en-US", page: 1 },
				});
				setMovies(response.data);
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

	const addToWatchlist = useCallback(
		async (id) => {
			const res = await fetch("/api/watchlist", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ movieId: id, userId: signedInUser?.id }),
			});
			const newWatchList = await res.json();
			setActionMsg(`You added ${selectedMovie.title} to your watchlist`);
			setTimeout(() => {
				setActionMsg("");
			}, 1000);
			setWatchlist((prev) => [...prev, newWatchList]);
			if (!res.ok) throw new Error("Failed to save watchlist to database");
			return newWatchList;
		},
		[selectedMovie],
	);

	const values = useMemo(
		() => ({
			movies,
			setMovies,
			selectedMovie,
			setSelectedMovie,
			addToWatchlist,
			watchlist,
			actionMsg,
			error,
			isLoading,
		}),
		[
			movies,
			setMovies,
			actionMsg,
			selectedMovie,
			setSelectedMovie,
			addToWatchlist,
			watchlist,
			error,
			isLoading,
		],
	);
	return (
		<MoviesContext.Provider value={values}>{children}</MoviesContext.Provider>
	);
};

export const useMovies = () => useContext(MoviesContext);
