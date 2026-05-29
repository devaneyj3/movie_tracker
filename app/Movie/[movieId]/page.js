"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import MovieDetails from "@/components/MovieDetails/Details";
import tmdb from "@/lib/tmdb";
export default function Movie() {
	const { movieId } = useParams();
	const [movieDetails, setMovieDetails] = useState([]);
	useEffect(() => {
		const fetchMovieDetails = async () => {
			const movie = await tmdb.movies.details(movieId, ['credits', 'recommendations', 'videos', 'watch/providers']);
			setMovieDetails(movie);
		};
		fetchMovieDetails();
	}, [movieId]);

	return (
		<>
			{movieDetails ? (
				<MovieDetails movieDetails={movieDetails} />
			) : (
				<h2>No details</h2>
			)}
		</>
	);
}
