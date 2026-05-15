import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import styles from './MovieList.module.scss'
import { useMovies } from "@/context/moviesContest";

export default function MovieList({ heading, movies }) {
	const { actionMsg } = useMovies()
	const { results } = movies
	
	return (
		<section className={styles.list}>
			<h1>{heading}</h1>
			{actionMsg && <div className={styles.msgBox}><p>{actionMsg}</p></div>}
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
