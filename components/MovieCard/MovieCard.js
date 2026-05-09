"use client";
import { dateFormatter } from "@/utils/dateFormater";
import React from "react";
import styles from "./MovieCard.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";

export default function MovieCard({ movie }) {
	const { id, title, release_date, poster_path, vote_average } = movie;
	const router = useRouter();
	function goToMovie() {
		router.push(`/Movie/${id}`);
	}

	return (
		<div onClick={goToMovie}>
			{poster_path ? (
				<div className={styles.imageContainer}>
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
				<Button
					className="mt-2 w-full bg-green-400  text-white text-xl font-thin"
					variant="secondary"
					size="lg">
					Add to my list
				</Button>
				<Badge className={styles.badge}>{vote_average.toFixed(1)}</Badge>
				<p className={styles.title}>{title}</p>
				<p className={styles.date}>{dateFormatter(release_date)}</p>
			</div>
		</div>
	);
}
