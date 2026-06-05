import React, { memo } from "react";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./MovieList.module.scss";
import { useMovies } from "@/context/moviesContext";
import Slider from "../Slider/slider";

function MovieList({ heading, movies, layout = 'grid' }) {
	const { actionMessage } = useMovies();

	return (
		<section className={styles.list}>
			<h1>{heading}</h1>
			{actionMessage && (
				<div className={styles.msgBox}>
					<p>{actionMessage}</p>
				</div>
			)}
			{layout == 'carousel' ? (
				<Slider movies={movies} />
			) : (
				<div className={styles.movieList}>
					{movies && movies.length > 0 && movies.map((result) => (
						<MovieCard key={result.id} movie={result} />
					))}
				</div>
			)}
		</section>
	);
}

export default memo(MovieList);
