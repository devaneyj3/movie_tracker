"use client";
import MovieSearchbar from "@/components/Movies/MovieSearchbar/MovieSearchbar";
import { useParams } from "next/navigation";
import styles from './cat.module.scss'
import React from "react";
import Trending from "@/components/Movies/Trending/Trending";

export default function Movies() {
	const { category } = useParams();
	return (
		<div className={styles.container}>
			<h1>{category} Movies</h1>
			<div className={styles.infoContainer}>
				<div className={styles.searchContainer}>
					<MovieSearchbar />
				</div>
				<div className={styles.movies}>
					<Trending />
				</div>
			</div>
		</div>
	);
}
