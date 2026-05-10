"use client";
import { dateFormatter } from "@/utils/dateFormater";
import React, { useState } from "react";
import styles from "./MovieCard.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMovies } from "@/context/moviesContest";

function MovieCard({ movie }) {
	const [movieDropdownClicked, setMovieDropdownClick] = useState(false)
	const { id, title, release_date, poster_path } = movie;

	const { addToWatchlist, setSelectedMovie } = useMovies()
	const movieOptions = [
		{
			text: 'Add to list',
			action: addToWatchlist
		},
		{
			text: 'Favorite',
			action: addToWatchlist
		},
		{
			text: 'Watchlist',
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
		e.stopPropagation()
		movieDropdownClicked ? setMovieDropdownClick(false) : setMovieDropdownClick(true)
		setSelectedMovie(movie)
	}
	return (
		<div onClick={goToMovie}>
			{poster_path ? (
				<div className={styles.imageContainer} onClick={(e) => movieDropdown(e)}>
					<div className={styles.posterBtn}>...</div>
					{movieDropdownClicked && (<div className={styles.movieDropdownOptions}>{movieOptions.map((option) => {
						return (
							<p key={option.text} onClick={() => option.action()}>{option.text}</p>
						)
					})}</div>)}
					<Image
						src={`https://image.tmdb.org/t/p/w500${poster_path}`}
						width={200}
						height={300}
						alt={`${title} Poster`}
					/>
				</div>
			) : (
				<p>No poster available</p>
			)}
			<div className={styles.info}>
				<p className={styles.title}>{title}</p>
				<p className={styles.date}>{dateFormatter(release_date)}</p>
			</div>
		</div>
	);
}

export default React.memo(MovieCard)
