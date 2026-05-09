"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/utils/apiClient";
import MovieList from "@/components/MovieList/MovieList";
import { dateFormatter } from "@/utils/dateFormater";
import styles from "./home.module.scss";

export default function Home() {
	const [moviesPlaying, setMoviesPlaying] = useState({});

	useEffect(() => {
		const getMoviesPlaying = async () => {
			try {
				const response = await apiClient.get("movie/now_playing", {
					params: { language: "en-US", page: 1 },
				});
				setMoviesPlaying(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		getMoviesPlaying();
	}, []);

	const { dates, results } = moviesPlaying;

	const minDate = dates ? dateFormatter(dates.minimum) : "";
	const maxDate = dates ? dateFormatter(dates.maximum) : "";

	return (
		<div className={styles.pageContainer}>
			{/* Hero Section */}
			<div className={styles.heroSection}>
				<div className={styles.heroContent}>
					<div className={styles.heroTextContainer}>
						<h1 className={styles.heroTitle}>Welcome to MovieTracker</h1>
						<p className={styles.heroSubtitle}>
							Track the movies you&apos;ve watched and discover new favorites
							with ease. Your personal cinema journey starts here.
						</p>

						{/* Decorative elements */}
						<div className={styles.decorativeDots}>
							<div className={styles.dot}></div>
							<div className={styles.dot}></div>
							<div className={styles.dot}></div>
						</div>
					</div>
				</div>
			</div>

			{/* Movies Section */}
			<div className={styles.moviesSection}>
				{dates && (
					<div className={styles.moviesHeader}>
						<div className={styles.moviesTitleContainer}>
							<h2 className={styles.moviesTitle}>Now Playing in Theaters</h2>
							<p className={styles.moviesSubtitle}>
								Movies currently showing between {minDate} and {maxDate}
							</p>
						</div>
					</div>
				)}

				{results && (
					<div className={styles.moviesListContainer}>
						<MovieList data={results} />
					</div>
				)}
			</div>
		</div>
	);
}
