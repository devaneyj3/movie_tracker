"use client";
import React, { useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { MovieStats, ProfileMovieCard } from "@/components/profile";
import styles from "./Profile.module.scss";
import { useAuth } from "@/context/authContext";
import { useMovies } from "@/context/moviesContext";
import { groupWatchedByMonth } from "@/utils/groupWatchedByMonth";

const ALL_PERIODS = "all";

export default function Profile() {
	const { signedInUser } = useAuth();
	const { watchlist, actionMessage, watchedMovies } = useMovies();
	const [watchedPeriod, setWatchedPeriod] = useState(ALL_PERIODS);
	const watchedByMonth = groupWatchedByMonth(watchedMovies);

	const visibleGroups =
		watchedPeriod === ALL_PERIODS
			? watchedByMonth
			: watchedByMonth.filter((group) => group.key === watchedPeriod);

	if (!signedInUser) {
		return (
			<div className={styles.profileContent}>
				<div className={styles.sectionTitle}>
					<User />
					Please sign in to view your profile
				</div>
			</div>
		);
	}

	return (
		<div className={styles.profile}>
			<div className={styles.profileHeader}>
				<div className={styles.imageContainer}>
					<Image
						src={signedInUser?.image || "/images/avatar.svg"}
						width={128}
						height={128}
						alt={signedInUser?.name || "User"}
						className={styles.profileImage}
					/>
				</div>
				<div className={styles.headerInfo}>
					<h1 className={styles.profileName}>
						{signedInUser?.name || "No Name"}
					</h1>
					<p className={styles.profileEmail}>
						{signedInUser?.email || "No Email"}
					</p>
				</div>
			</div>
			<section className={styles.profileContent}>
				<div className={styles.statsSection}>
					<h1>Stats</h1>
					<MovieStats />
				</div>
				{actionMessage ? (
					<p className={styles.watchlistActionMsg} role="status">
						{actionMessage}
					</p>
				) : null}
				<section className={styles.listSection}>
					<h1>Watch List</h1>
					{watchlist.length > 0 ? (
						<div className={styles.grid}>
							{watchlist.map((entry) => (
								<ProfileMovieCard key={entry.id} savedMovieEntry={entry} />
							))}
						</div>
					) : (
						<h2>No movies in watchlist</h2>
					)}
				</section>
				<section className={styles.listSection}>
					<h1>Watched Movies</h1>
					{watchedByMonth.length > 0 ? (
						<>
							<div
								className={styles.periodFilters}
								role="tablist"
								aria-label="Filter watched movies by time period"
							>
								<button
									type="button"
									role="tab"
									aria-selected={watchedPeriod === ALL_PERIODS}
									className={`${styles.periodPill} ${watchedPeriod === ALL_PERIODS ? styles.periodPillActive : ""}`}
									onClick={() => setWatchedPeriod(ALL_PERIODS)}
								>
									All time
									<span className={styles.periodPillCount}>
										{watchedMovies.length}
									</span>
								</button>
								{watchedByMonth.map((group) => {
									const isActive = watchedPeriod === group.key;

									return (
										<button
											key={group.key}
											type="button"
											role="tab"
											aria-selected={isActive}
											className={`${styles.periodPill} ${isActive ? styles.periodPillActive : ""}`}
											onClick={() => setWatchedPeriod(group.key)}
										>
											{group.label}
											<span className={styles.periodPillCount}>
												{group.movies.length}
											</span>
										</button>
									);
								})}
							</div>

							<div className={styles.monthGroups}>
								{visibleGroups.map((group) => (
									<section
										key={group.key}
										className={styles.monthGroup}
										aria-labelledby={`watched-${group.key}`}
									>
										<div className={styles.monthHeader}>
											<h2
												id={`watched-${group.key}`}
												className={styles.monthTitle}
											>
												{group.label}
											</h2>
											<span className={styles.monthCount}>
												{group.movies.length}{" "}
												{group.movies.length === 1 ? "movie" : "movies"}
											</span>
										</div>
										<div className={styles.grid}>
											{group.movies.map((entry) => (
												<ProfileMovieCard
													key={entry.id}
													savedMovieEntry={entry}
												/>
											))}
										</div>
									</section>
								))}
							</div>
						</>
					) : (
						<h2>No watched movies</h2>
					)}
				</section>
			</section>
		</div>
	);
}
