"use client";

import { apiClient } from "@/utils/apiClient";
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
	const [movies, setMovies] = useState([]);
	const [watchlist, setWatchlist] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
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

	const createMovie = useCallback(async (data) => {
		const res = await fetch("/api/job", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...data, userId: session?.user.id }),
		});
		const newMovie = await res.json();
		setSelectedMovie(newJob);
		if (!res.ok) throw new Error("Failed to save job to database");
		return newMovie;
	}, []);

	const addToWatchlist = useCallback(() => {
		setWatchlist((prev) => [...prev, selectedMovie]);
	}, [selectedMovie]);

	console.log(watchlist);
	const values = useMemo(
		() => ({
			movies,
			setMovies,
			selectedMovie,
			setSelectedMovie,
			createMovie,
			addToWatchlist,
			watchlist,
			error,
			isLoading,
		}),
		[
			movies,
			setMovies,
			selectedMovie,
			setSelectedMovie,
			createMovie,
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
