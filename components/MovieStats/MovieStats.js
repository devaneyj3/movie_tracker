import React from "react";
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
			<div className={styles.statsGrid}>
				<div className={styles.statCard}>
					<div className={styles.statLabel}>Movies Watched</div>
					<div className={styles.statNumber}>{moviesWatched}</div>
				</div>
				<div className={styles.statCard}>
					<div className={styles.statLabel}>Movies Rated</div>
					<div className={styles.statNumber}>{moviesRated}</div>
				</div>
				<div className={styles.statCard}>
					<div className={styles.statLabel}>Watchlist Items</div>
					<div className={styles.statNumber}>{watchlistItems}</div>
				</div>
				<div className={styles.statCard}>
					<div className={styles.statLabel}>Reviews Written</div>
					<div className={styles.statNumber}>{reviewsWritten}</div>
				</div>
			</div>
		</div>
	);
};

export default MovieStats;
