'use client';

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./ProfileMovieCard.module.scss";
import { Heart, List, Star, X } from "lucide-react";
import { dateFormatter } from "@/utils/dateFormatter";
import { useMovies } from "@/context/moviesContext";
import { isMovieInList } from "@/utils/isMovieInList";
import { getWatchStats } from "@/utils/getWatchStats";
import WatchStats from "@/components/shared/WatchStats/WatchStats";
import WatchDatePicker from "@/components/shared/WatchDatePicker/WatchDatePicker";
import tmdb from "@/lib/tmdb";
import { cn } from "@/lib/utils";

export default function ProfileMovieCard({ savedMovieEntry }) {
	const [tmdbMovie, setTmdbMovie] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
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
			if (!savedMovieEntry?.movieId) {
				setIsLoading(false);
				return;
			}

			setIsLoading(true);

			try {
				const movie = await tmdb.movies.details(savedMovieEntry.movieId);
				setTmdbMovie(movie);
			} catch (error) {
				console.error(error);
				setTmdbMovie(null);
			} finally {
				setIsLoading(false);
			}
		};

		loadTmdbMovieDetails();
	}, [savedMovieEntry?.movieId]);

	if (isLoading) {
		return (
			<article className={cn(styles.card, styles.loading)} aria-busy="true">
				<Link
					href={`/Movie/${savedMovieEntry.movieId}`}
					className={styles.main}
				>
					<div className={styles.posterSkeleton} />
					<div className={styles.content}>
						<h2 className={styles.title}>
							{savedMovieEntry?.movieTitle ?? "Loading…"}
						</h2>
						<div className={styles.textSkeleton} />
					</div>
				</Link>
			</article>
		);
	}

	if (!tmdbMovie) {
		return (
			<article className={cn(styles.card, styles.error)}>
				<p className={styles.errorMessage}>
					Could not load {savedMovieEntry?.movieTitle ?? "this movie"}.
				</p>
			</article>
		);
	}

	const { id, title, poster_path, release_date, overview } = tmdbMovie;
	const isWatched = isMovieInList(watchedMovies, id);
	const isWatchlisted = isMovieInList(watchlist, id);

	return (
		<>
			<article className={styles.card}>
				<Link href={`/Movie/${id}`} className={styles.main}>
					<div className={styles.posterWrap}>
						{poster_path ? (
							<Image
								src={`https://image.tmdb.org/t/p/w500${poster_path}`}
								width={150}
								height={225}
								sizes="(max-width: 768px) 45vw, (max-width: 1200px) 20vw, 11rem"
								alt={`${title} poster`}
								className={styles.poster}
							/>
						) : (
							<div className={styles.posterFallback}>No poster</div>
						)}
					</div>

					<div className={styles.content}>
						<WatchStats stats={watchStats} />
						<div className={styles.header}>
							<h2 className={styles.title}>{title}</h2>
							<p className={styles.releaseDate}>
								{release_date ? dateFormatter(release_date) : "Release date TBD"}
							</p>
						</div>
						{overview ? (
							<p className={styles.overview}>{overview}</p>
						) : null}
					</div>
				</Link>

				<div className={styles.actions}>
					<button type="button" className={styles.actionButton}>
						<span className={styles.actionIcon} aria-hidden>
							<Star />
						</span>
						<span className={styles.actionLabel}>Rate</span>
					</button>

					<button type="button" className={styles.actionButton}>
						<span className={styles.actionIcon} aria-hidden>
							<Heart />
						</span>
						<span className={styles.actionLabel}>Favorite</span>
					</button>

					<button
						type="button"
						className={styles.actionButton}
						onClick={async () => {
							try {
								if (isWatched) {
									await removeFromWatched(tmdbMovie);
								} else {
									setWatchPickerMovie(tmdbMovie);
								}
							} catch (err) {
								console.error(err);
							}
						}}
					>
						<span className={styles.actionIcon} aria-hidden>
							{isWatched ? <X /> : <List />}
						</span>
						<span className={styles.actionLabel}>
							{isWatched ? "Unwatch" : "Watch"}
						</span>
					</button>

					<button
						type="button"
						className={styles.actionButton}
						onClick={async () => {
							try {
								if (isWatchlisted) {
									await removeFromWatchlist(String(id), title);
								} else {
									await addToWatchlist(id, title);
								}
							} catch (err) {
								console.error(err);
							}
						}}
					>
						<span className={styles.actionIcon} aria-hidden>
							{isWatchlisted ? <X /> : <List />}
						</span>
						<span className={styles.actionLabel}>
							{isWatchlisted ? "Remove" : "Watchlist"}
						</span>
					</button>
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
