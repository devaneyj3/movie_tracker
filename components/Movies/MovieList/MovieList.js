import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import styles from './MovieList.module.scss'

export default function MovieList({ heading, movies }) {
	const {  results } = movies
	return (
		<section className={styles.list}>
			<h1>{heading}</h1>
			<div className={styles.movieList}>
				{results && results.map((result) => {
					return (
						<MovieCard key={result.id} movie={result} />
					)
				})}
			</div>
		</section>
	);
}
