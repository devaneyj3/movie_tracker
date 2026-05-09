import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Cast from "../Cast/cast";
import styles from "./Details.module.scss";
import SimilarFilms from "../SimilarFilms/SimilarFilms";
import WhereToWatch from "../WhereToWatch/WhereToWatch";

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
	console.log("movie detail", movieDetails);

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
					<Button
						className="mt-2 w-full bg-green-400  text-white text-xl font-thin"
						variant="secondary"
						size="lg">
						Add to my list
					</Button>
				</div>
				<div className={styles.details}>
					<h2 className="font-bold text-4xl text-white">{title}</h2>

					<span className={styles.label}>Release date:</span>
					<span className={styles.value}>{release_date}</span>

					<span className={styles.label}>Runtime:</span>
					<span className={styles.value}>{runtime} min</span>

					<span className={styles.label}>Revenue:</span>
					<span className={styles.value}>${revenue?.toLocaleString()}</span>
					<span className={styles.label}>Budget:</span>
					<span className={styles.value}>${budget?.toLocaleString()}</span>

					<span className={styles.label}>Vote average:</span>
					<span className={styles.value}>{vote_average}/10</span>
					<div className={styles.fullRow}>
						<p className={styles.value}>{overview}</p>
					</div>

					{genres && genres.length > 0 && (
						<div className={styles.genresSection}>
							<div className={styles.genresList}>
								{genres.map((genre) => (
									<div key={genre.id}>
										<Button
											variant="ghost"
											className="mt-2 w-full bg-green-400  text-white text-xl font-thin">
											{genre.name}
										</Button>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
			{movieDetails["watch/providers"] &&
				Object.keys(movieDetails["watch/providers"].results).length >= 1 && (
					<WhereToWatch movieDetails={movieDetails} />
				)}
			<Cast credits={credits} />
			{recommendations && <SimilarFilms recommendations={recommendations} />}
		</>
	);
}
