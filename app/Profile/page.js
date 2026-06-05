"use client";
import React from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { MovieStats, ProfileMovieCard } from "@/components/profile";
import styles from "./Profile.module.scss";
import { useAuth } from "@/context/authContext";
import { useMovies } from "@/context/moviesContext";

export default function Profile() {
	const { signedInUser } = useAuth();
	const { watchlist, actionMessage, watchedMovies } = useMovies();

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
		<div className={styles.profile} >
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
					{watchedMovies.length > 0 ? (
						<div className={styles.grid}>
							{watchedMovies.map((entry) => (
								<ProfileMovieCard key={entry.id} savedMovieEntry={entry} />
							))}
						</div>
					) : (
						<h2>No watched movies</h2>
					)}
				</section>
			</section>
		</div>
	);
}
