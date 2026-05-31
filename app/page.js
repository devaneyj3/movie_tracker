"use client";

import styles from "./home.module.scss";
import {
	Hero,
	Trending,
	LatestTrailers,
	Popular,
	FreeToWatch,
} from "@/components/home";
import { Searchbar } from "@/components/shared/layout";
import { useMovies } from "@/context/moviesContest";

export default function Home() {
	const { movies } = useMovies();

	return (
		<div className={styles.pageContainer}>
			<Searchbar />
			<Hero />
			<div className={styles.page}>
				<Trending movies={movies} />
				<LatestTrailers movies={movies} />
				<Popular movies={movies} />
				<FreeToWatch movies={movies} />
			</div>
		</div>
	);
}
