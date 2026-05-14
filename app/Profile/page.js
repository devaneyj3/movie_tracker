"use client";
import React from "react";
import Image from "next/image";
import { User } from "lucide-react";
import MovieStats from "@/components/MovieStats/MovieStats";
import styles from "./Profile.module.scss";
import { useAuth } from "@/context/authContext";
import { useMovies } from "@/context/moviesContest";
import FavList from "@/components/Movies/FavList/FavList";

export default function Profile() {
	const { signedInUser } = useAuth();
	const { watchlist, movies, actionMsg } = useMovies()
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
				<section>
					<h1>Stats</h1>
					<MovieStats stats={signedInUser?.stats} />
				</section>
				<section>
					<h1>Watch List</h1>
					{actionMsg ? (
						<p className={styles.watchlistActionMsg} role="status">
							{actionMsg}
						</p>
					) : null}
					{movies && watchlist.map((result) => {
						return (
							<FavList key={result.id} movieDetails={result} />
						)
					})}
				</section>
			</section>
		</div>
	);
}
