import React, { memo } from "react";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./MovieList.module.scss";
import { useMovies } from "@/context/moviesContest";

function MovieList({ heading, movies }) {
	const { actionMsg } = useMovies();

	return (
		<section className={styles.list}>
			<h1>{heading}</h1>
			{actionMsg && (
				<div className={styles.msgBox}>
					<p>{actionMsg}</p>
				</div>
			)}
			<div className={styles.movieList}>
				{movies && movies.length > 0 && movies.map((result) => (
					<MovieCard key={result.id} movie={result} />
				))}
			</div>
		</section>
	);
}

export default memo(MovieList);
