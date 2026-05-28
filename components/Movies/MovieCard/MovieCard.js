"use client";
import { dateFormatter } from "@/utils/dateFormater";
import React, { useState } from "react";
import styles from "./MovieCard.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMovies } from "@/context/moviesContest";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { isOnList } from "@/utils/isOnList";

function MovieCard({ movie }) {
	const [movieDropdownClicked, setMovieDropdownClicked] = useState(false)
	const { signedInUser } = useAuth();

	const { id, title, release_date, poster_path } = movie;

	const { addToWatchlist, removeFromWatchlist, setSelectedMovie, watchlist, markMovieAsWatched, moviesWatched, removeMovieAsWatched } =
		useMovies();

	const router = useRouter();
	function goToMovie() {
		setSelectedMovie(movie)
		router.push(`/Movie/${id}`);
	}

	function movieDropdown(e) {
		movieDropdownClicked ? setMovieDropdownClicked(false) : setMovieDropdownClicked(true)
		setSelectedMovie(movie)
	}


	return (
		<div className={styles.movieCard} onClick={(e) => movieDropdown(e)} >
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
												if (isOnList(watchlist, id)) {
													await removeFromWatchlist(String(id), title);
												} else {
													await addToWatchlist(id, title);
												}
											} catch (err) {
												console.error(err);
											}
										}}>
										{isOnList(watchlist, id) ? "Remove from Watchlist" : "Add to Watchlist"}
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
										onClick={async (e) => {
											e.stopPropagation();
											setMovieDropdownClicked(false)
											try {
												if (isOnList(moviesWatched, id)) {
													await removeMovieAsWatched(movie);
													return
												} else {
													await markMovieAsWatched(movie);
												}
											} catch (err) {
												console.error(err);
											}
										}}>
										{isOnList(moviesWatched, id) ? "Remove from Watched" : "Mark as Watched"}
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
						width={200}
						height={300}
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
			</div>
		</div>
	);
}

export default React.memo(MovieCard)
