"use client";
import { apiClient } from "@/utils/apiClient";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import MovieDetails from "@/components/MovieDetails/Details";

export default function Movie() {
	const { movieId } = useParams();
	const [movieDetails, setMovieDetails] = useState([]);
	useEffect(() => {
		const fetchMovieDetails = async () => {
			const res = await apiClient.get(
				`/movie/${movieId}?append_to_response=credits,recommendations,watch/providers`
			);
			setMovieDetails(res.data);
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
