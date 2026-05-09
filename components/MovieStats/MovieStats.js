import React from "react";
import { Film } from "lucide-react";
import styles from "./MovieStats.module.scss";

const MovieStats = ({ stats = {} }) => {
	const {
		moviesWatched = 0,
		moviesRated = 0,
		watchlistItems = 0,
		reviewsWritten = 0,
	} = stats;

	return (
		<div className={styles.statsContainer}>
			<div className={styles.sectionTitle}>
				<Film />
				Movie Statistics
			</div>

			<div className={styles.statsGrid}>
				<div className={styles.statCard}>
					<div className={styles.statNumber}>{moviesWatched}</div>
					<div className={styles.statLabel}>Movies Watched</div>
				</div>

				<div className={styles.statCard}>
					<div className={styles.statNumber}>{moviesRated}</div>
					<div className={styles.statLabel}>Movies Rated</div>
				</div>

				<div className={styles.statCard}>
					<div className={styles.statNumber}>{watchlistItems}</div>
					<div className={styles.statLabel}>Watchlist Items</div>
				</div>

				<div className={styles.statCard}>
					<div className={styles.statNumber}>{reviewsWritten}</div>
					<div className={styles.statLabel}>Reviews Written</div>
				</div>
			</div>
		</div>
	);
};

export default MovieStats;
