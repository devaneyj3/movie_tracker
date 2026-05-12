import Image from "next/image";
import React from "react";
import Cast from "../Cast/cast";
import styles from "./Details.module.scss";
import SimilarFilms from "../SimilarFilms/SimilarFilms";
import WhereToWatch from "../WhereToWatch/WhereToWatch";
import { dateFormatter } from "@/utils/dateFormater";

export default function MovieDetails({ movieDetails }) {
	const {
		title,
		overview,
		tagline,
		release_date,
		runtime,
		revenue,
		poster_path,
		budget,
		recommendations,
		spoken_languages,
		genres,
		vote_average,
		credits,
	} = movieDetails;


	return (
		<>
			<div className={styles.movieContainer}>
				<div className={styles.imageContainer}>
					<Image
						src={`https://image.tmdb.org/t/p/w500${poster_path}`}
						width={200}
						height={300}
						alt={`${title} Poster`}
						className={styles.image}
					/>
					<span
						className={styles.poster_btn}>
						Add to my list
					</span>
				</div>
				<div className={styles.details}>
					<div className={styles.detailHeader}>
						<span>{title}</span>
						<div className={styles.attrbutes}>
							<span>{dateFormatter(release_date)}</span>
							{genres?.length > 0 &&
								genres.map((genre) => (
									<span key={genre.id}>{genre.name}</span>
								))}
							<span>{runtime} min</span>
						</div>
					</div>
					<span className={styles.value}>{vote_average}/10</span>
					<div className={styles.synopsis}>
						<h2>{tagline}</h2>
						<p >{overview}</p>
					</div>
				</div>
			</div>
			{movieDetails["watch/providers"] &&
				Object.keys(movieDetails["watch/providers"].results).length >= 1 && (
					<WhereToWatch movieDetails={movieDetails} />
				)}
			<Cast credits={credits} />
			{recommendations && <SimilarFilms recommendations={recommendations} />}
			<span className={styles.label}>Revenue:</span>
			<span className={styles.value}>${revenue?.toLocaleString()}</span>
			<span className={styles.label}>Budget:</span>
			<span className={styles.value}>${budget?.toLocaleString()}</span>
		</>
	);
}
