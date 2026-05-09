import React from "react";
import styles from "./SimularFilms.module.scss";
import Image from "next/image";
import MovieCard from "../MovieCard/MovieCard";

export default function SimilarFilms({ recommendations }) {
	const { results } = recommendations;
	return (
		<div className="mt-20 mb-10 ml-20">
			<h2 className="text-3xl mb-10 text-white">Simular Films</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{results &&
					results.map((result) => {
						return <MovieCard key={result.id} movie={result} />;
					})}
			</div>
		</div>
	);
}
