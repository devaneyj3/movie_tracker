"use client";
import { dateFormatter } from "@/utils/dateFormater";
import React, { useState } from "react";
import styles from "./MovieCard.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMovies } from "@/context/moviesContest";
import { useAuth } from "@/context/authContext";
import Link from "next/link";

function MovieCard({ movie }) {
	const [movieDropdownClicked, setMovieDropdownClicked] = useState(false)
	const { signedInUser } = useAuth();
	const { id, title, release_date, poster_path } = movie;

	const { addToWatchlist, setSelectedMovie, actionMsg } = useMovies()
	const movieOptions = [
		{
			text: 'Watchlist',
			action: () => addToWatchlist(id)
		},
		{
			text: 'Favorite',
			action: addToWatchlist
		},
		{
			text: 'Your rating',
			action: addToWatchlist
		},
	]
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
		<div>
			{poster_path ? (
				<div className={styles.imageContainer} onClick={(e) => movieDropdown(e)}>
					<div className={styles.posterBtn}>...</div>
					{movieDropdownClicked && (
						<div className={styles.movieDropdownOptions}>
							{signedInUser ? (
								movieOptions.map((option) => (
									<p
										className={styles.signedInOptions}
										key={option.text}
										onClick={(e) => {
											e.stopPropagation();
											setMovieDropdownClicked(false)
											option.action(id);
										}}>
										{option.text}
									</p>
								))
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
					{actionMsg && <div className={styles.msgBox}><p>{actionMsg}</p></div>}
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
