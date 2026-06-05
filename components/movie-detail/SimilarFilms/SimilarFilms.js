import React from "react";
import styles from "./SimilarFilms.module.scss";
import { MovieCard } from "@/components/shared";

export default function SimilarFilms({ recommendations, title }) {
	const { results } = recommendations;
	return (
		<div className={styles.contain}>
			<h2>If you liked <span>{title}</span>, you might also like...</h2>
			<div className={styles.similiarFilmsContainer}>
				{results &&
					results.map((result) => {
						return <MovieCard key={result.id} movie={result} />;
					})}
			</div>
		</div>
	);
}
