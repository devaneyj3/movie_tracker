import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import { useMovies } from '@/context/moviesContest';
import styles from './MovieList.module.scss'

export default function MovieList({ heading }) {
	const { movies } = useMovies()
	const { dates, results } = movies
	console.log(movies)
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
