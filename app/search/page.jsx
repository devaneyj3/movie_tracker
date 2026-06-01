"use client";

import { Searchbar } from "@/components/shared/layout";
import { Search as SearchPanel } from "@/components/page-search";
import { MovieList } from "@/components/shared";
import React from "react";
import styles from "./SearchPage.module.scss";
import { useMovies } from "@/context/moviesContest";

export default function SearchPage() {
	const { searchResults } = useMovies();
	const movies = searchResults?.movies?.results;

	return (
		<div>
			<Searchbar />
			<div className={styles.pageWrapper}>
				<div className={styles.page}>
					<aside className={styles.sidebar}>
						<SearchPanel />
					</aside>
					<div className={styles.searchResults}>
						<MovieList heading="Search Results" movies={movies} />
					</div>
				</div>
			</div>
		</div>
	);
}
