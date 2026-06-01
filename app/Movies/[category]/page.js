"use client";

import { MovieSearchbar } from "@/components/browse";
import { useParams } from "next/navigation";
import styles from "./cat.module.scss";
import React from "react";
import { useMovies } from "@/context/moviesContest";
import filterMovies from "@/utils/filterMovies";
import { MovieList } from "@/components/shared";

export default function Movies() {
	const { category } = useParams();
	const { sortBy, movies } = useMovies();
	const sortedResults = filterMovies(sortBy, movies ?? []);

	return (
		<div className={styles.container}>
			<div className={styles.infoContainer}>
				<div className={styles.searchContainer}>
					<MovieSearchbar />
				</div>
				<div className={styles.movies}>
					<MovieList heading={`${category} Movies`} movies={sortedResults} /> 
				</div>
			</div>
		</div>
	);
}
