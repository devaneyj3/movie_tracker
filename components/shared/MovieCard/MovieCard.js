"use client";
import { dateFormatter } from "@/utils/dateFormatter";
import React, { useState } from "react";
import styles from "./MovieCard.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMovies } from "@/context/moviesContext";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { isMovieInList } from "@/utils/isMovieInList";
import { getWatchStats } from "@/utils/getWatchStats";
import WatchStats from "../WatchStats/WatchStats";
import WatchDatePicker from "../WatchDatePicker/WatchDatePicker";
import { cn } from "@/lib/utils";

function MovieCard({ keenClass, movie }) {
	const [movieDropdownClicked, setMovieDropdownClicked] = useState(false)
	const [watchPickerOpen, setWatchPickerOpen] = useState(false)
	const { signedInUser } = useAuth();

	const { id, title, release_date, poster_path } = movie;

	const { addToWatchlist, removeFromWatchlist, watchlist, watchedMovies } =
		useMovies();

	const router = useRouter();
	const watchStats = getWatchStats(watchedMovies, id);

	function goToMovie() {
		router.push(`/Movie/${id}`);
	}

	function movieDropdown(e) {
		movieDropdownClicked ? setMovieDropdownClicked(false) : setMovieDropdownClicked(true)
	}


	return (
		<div
			className={cn(
				keenClass,
				styles.movieCard,
				movieDropdownClicked && styles.menuOpen,
			)}
			onClick={(e) => movieDropdown(e)}
		>
			{poster_path ? (
				<div className={styles.imageContainer}>
					<div className={styles.posterBtn}>...</div>
					{movieDropdownClicked && (
						<div className={styles.movieDropdownOptions}>
							{signedInUser ? (
								<>
									<p
										className={styles.signedInOptions}
										onClick={async (e) => {
											e.stopPropagation();
											setMovieDropdownClicked(false);
											try {
												if (isMovieInList(watchlist, id)) {
													await removeFromWatchlist(String(id), title);
												} else {
													await addToWatchlist(id, title);
												}
											} catch (err) {
												console.error(err);
											}
										}}>
										{isMovieInList(watchlist, id) ? "Remove from Watchlist" : "Add to Watchlist"}
									</p>
									<p
										className={styles.signedInOptions}
										onClick={(e) => {
											e.stopPropagation();
											setMovieDropdownClicked(false)
										}}>
										Favorite
									</p>
									<p
										className={styles.signedInOptions}
										onClick={(e) => {
											e.stopPropagation();
											setMovieDropdownClicked(false);
											setWatchPickerOpen(true);
										}}>
										Mark as Watched
									</p>
									<p
										className={styles.signedInOptions}
										onClick={(e) => {
											e.stopPropagation();
											setMovieDropdownClicked(false)
										}}>
										Your rating
									</p>
								</>
							) : (
								<div className={styles.signedOutOptions}>
									<p>Want to rate or add this item to a list?</p>
									<Link href="/sign-in" onClick={(e) => {
										e.stopPropagation()
										setMovieDropdownClicked(false)
									}}>
										Login
									</Link>
								</div>
							)}
						</div>
					)}
					<Image
						src={`https://image.tmdb.org/t/p/w500${poster_path}`}
						width={150}
						height={225}
						alt={`${title} Poster`}
						onClick={goToMovie}
						className={styles.image}
					/>
				</div>
			) : (
				<p>No poster available</p>
			)
			}
			<div className={styles.info}>
				<p className={styles.title}>{title}</p>
				<p className={styles.date}>{dateFormatter(release_date)}</p>
				<WatchStats stats={watchStats} />
			</div>
			<WatchDatePicker
				movie={movie}
				open={watchPickerOpen}
				onClose={() => setWatchPickerOpen(false)}
			/>
		</div>
	);
}

export default React.memo(MovieCard)
