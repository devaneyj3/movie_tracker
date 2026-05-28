import React from "react";
import styles from "./SimularFilms.module.scss";
import MovieCard from "../Movies/MovieCard/MovieCard";

export default function SimilarFilms({ recommendations }) {
	const { results } = recommendations;
	return (
		<div className={styles.contain}>
			<h2>If you liked The <span>Super Mario Galaxy Movie</span>, you might also like...</h2>
			<div className={styles.similiarFilmsContainer}>
				{results &&
					results.map((result) => {
						return <MovieCard key={result.id} movie={result} />;
					})}
			</div>
		</div>
	);
}
