"use client";

import { MovieSearchbar } from "@/components/browse";
import { useParams } from "next/navigation";
import styles from "./cat.module.scss";
import React, { useEffect, useState } from "react";
import filterMovies from "@/utils/filterMovies";
import { MovieList } from "@/components/shared";
import tmdbQuery from "@/utils/tmdbQuery";

function formatCategoryLabel(category) {
	return category
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export default function Movies() {
	const { category } = useParams();
	const [sortBy, setSortBy] = useState(null);
	const [categoryMovies, setCategoryMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [fetchError, setFetchError] = useState(null);

	useEffect(() => {
		if (!category) return;

		const loadCategoryMovies = async () => {
			setIsLoading(true);
			setFetchError(null);

			try {
				const response = await tmdbQuery.getMoviesByCategory(category);
				setCategoryMovies(response?.results ?? []);
			} catch (error) {
				console.error(error);
				setCategoryMovies([]);
				setFetchError(
					error.message?.includes("Unknown movie category")
						? "This category is not available yet."
						: "Failed to load movies.",
				);
			} finally {
				setIsLoading(false);
			}
		};

		loadCategoryMovies();
	}, [category]);

	const sortedResults = filterMovies(sortBy, categoryMovies);
	const heading = `${formatCategoryLabel(String(category))} Movies`;

	return (
		<div className={styles.container}>
			<div className={styles.infoContainer}>
				<div className={styles.searchContainer}>
					<MovieSearchbar onSortChange={setSortBy} />
				</div>
				<div className={styles.movies}>
					{isLoading ? (
						<p className={styles.status}>Loading movies…</p>
					) : fetchError ? (
						<p className={styles.status}>{fetchError}</p>
					) : (
						<MovieList heading={heading} movies={sortedResults} />
					)}
				</div>
			</div>
		</div>
	);
}
