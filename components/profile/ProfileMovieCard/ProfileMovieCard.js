'use client';

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./ProfileMovieCard.module.scss";
import { Heart, List, Star, X } from 'lucide-react';
import { dateFormatter } from "@/utils/dateFormatter";
import { useMovies } from "@/context/moviesContext";
import { isMovieInList } from "@/utils/isMovieInList";
import { getWatchStats } from "@/utils/getWatchStats";
import WatchStats from "@/components/shared/WatchStats/WatchStats";
import WatchDatePicker from "@/components/shared/WatchDatePicker/WatchDatePicker";
import tmdb from "@/lib/tmdb";

export default function ProfileMovieCard({ savedMovieEntry }) {
	const [tmdbMovie, setTmdbMovie] = useState(null);
	const [watchPickerMovie, setWatchPickerMovie] = useState(null);

	const {
		addToWatchlist,
		removeFromWatchlist,
		watchlist,
		watchedMovies,
		removeFromWatched,
	} = useMovies();

	const watchStats = getWatchStats(watchedMovies, savedMovieEntry?.movieId);

	useEffect(() => {
		const loadTmdbMovieDetails = async () => {
			if (!savedMovieEntry?.movieId) return;

			try {
				const movie = await tmdb.movies.details(savedMovieEntry.movieId);
				setTmdbMovie(movie);
			} catch (error) {
				console.error(error);
				setTmdbMovie(null);
			}
		};

		loadTmdbMovieDetails();
	}, [savedMovieEntry?.movieId]);

	if (!tmdbMovie) {
		return null;
	}

	const { id, title, poster_path, release_date, overview } = tmdbMovie;

	return (
		<>
			<article className={styles.movie}>
				<div className={styles.movieInfo}>
					<div className={styles.imageContainer}>
						<Image
							src={`https://image.tmdb.org/t/p/w500${poster_path}`}
							width={150}
							height={200}
							alt={`${title} Poster`}
							className={styles.image}
						/>
					</div>
					<div className={styles.details}>
						<WatchStats stats={watchStats} />
						<div className={styles.detailHeader}>
							<h2>{title}</h2>
							<div className={styles.attributes}>
								<p>{dateFormatter(release_date)}</p>
							</div>
						</div>
						<div className={styles.synopsis}>
							<p>{overview}</p>
						</div>
					</div>
				</div>
				<div>
					<hr />
				</div>
				<div className={styles.actionBar}>
					<div className={styles.column}>
						<div className={styles.actionBox}>
							<div className={styles.actionIcon}><Star /></div>
							<h2>Rate it!</h2>
						</div>
						<div className={styles.actionBox}>
							<div className={styles.actionIcon}><Heart /></div>
							<h2>Favorite</h2>
						</div>
					</div>
					<div className={styles.column}>
						<div
							className={styles.actionBox}
							onClick={async (e) => {
								e.stopPropagation();
								try {
									if (isMovieInList(watchedMovies, id)) {
										await removeFromWatched(tmdbMovie);
									} else {
										setWatchPickerMovie(tmdbMovie);
									}
								} catch (err) {
									console.error(err);
								}
							}}
						>
							<div className={styles.actionIcon}>
								{isMovieInList(watchedMovies, id) ? <X /> : <List />}
							</div>
							<h2>
								{isMovieInList(watchedMovies, id)
									? "Remove from Watched"
									: "Mark as Watched"}
							</h2>
						</div>
						<div
							className={styles.actionBox}
							onClick={async (e) => {
								e.stopPropagation();
								try {
									if (isMovieInList(watchlist, id)) {
										await removeFromWatchlist(String(id), title);
									} else {
										await addToWatchlist(id, title);
									}
								} catch (err) {
									console.error(err);
								}
							}}
						>
							<div className={styles.actionIcon}>
								{isMovieInList(watchlist, id) ? <X /> : <List />}
							</div>
							<h2>
								{isMovieInList(watchlist, id)
									? "Remove from Watchlist"
									: "Add to Watchlist"}
							</h2>
						</div>
					</div>
				</div>
			</article>
			<WatchDatePicker
				movie={watchPickerMovie}
				open={!!watchPickerMovie}
				onClose={() => setWatchPickerMovie(null)}
			/>
		</>
	);
}
