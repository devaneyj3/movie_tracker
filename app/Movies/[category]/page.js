"use client";

import { MovieSearchbar } from "@/components/browse";
import { Trending } from "@/components/home";
import { useParams } from "next/navigation";
import styles from "./cat.module.scss";
import React from "react";
import { useMovies } from "@/context/moviesContest";
import filterMovies from "@/utils/filterMovies";

export default function Movies() {
	const { category } = useParams();
	const { sortBy, movies } = useMovies();
	const sortedResults = filterMovies(sortBy, movies?.results ?? []);

	return (
		<div className={styles.container}>
			<h1>{category} Movies</h1>
			<div className={styles.infoContainer}>
				<div className={styles.searchContainer}>
					<MovieSearchbar />
				</div>
				<div className={styles.movies}>
					<Trending movies={sortedResults} />
				</div>
			</div>
		</div>
	);
}
