"use client";

import { Searchbar } from "@/components/shared/layout";
import { Search } from "@/components/page-search";
import { MovieList } from "@/components/shared";
import React from "react";
import styles from "./SearchPage.module.scss";
import { useMovies } from "@/context/moviesContest";

export default function SearchPage() {
	const { searchResults } = useMovies();

	return (
		<div>
			<Searchbar />
			<div className={styles.page}>
				<Search />
				<div>
					<MovieList
						heading="Search Results"
						movies={searchResults.movies?.results}
					/>
				</div>
			</div>
		</div>
	);
}
