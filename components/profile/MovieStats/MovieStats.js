import React from "react";
import styles from "./MovieStats.module.scss";
import { useMovies } from "@/context/moviesContext";

export default function MovieStats() {
	const { watchlist, watchedMovies } = useMovies();

	return (
		<div className={styles.statsContainer}>
			<div className={styles.statsGrid}>
				<div className={styles.statCard}>
					<div className={styles.statLabel}>Movies Watched</div>
					<div className={styles.statNumber}>{watchedMovies.length}</div>
				</div>
				<div className={styles.statCard}>
					<div className={styles.statLabel}>Movies Rated</div>
					<div className={styles.statNumber}>{watchedMovies.length}</div>
				</div>
				<div className={styles.statCard}>
					<div className={styles.statLabel}>Watchlist Items</div>
					<div className={styles.statNumber}>{watchlist.length}</div>
				</div>
				<div className={styles.statCard}>
					<div className={styles.statLabel}>Reviews Written</div>
					<div className={styles.statNumber}>{watchedMovies.length}</div>
				</div>
			</div>
		</div>
	);
}
