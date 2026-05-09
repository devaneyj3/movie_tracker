"use client";
import React from "react";
import Image from "next/image";
import { User } from "lucide-react";
import ProfileInfo from "@/components/ProfileInfo/ProfileInfo";
import MovieStats from "@/components/MovieStats/MovieStats";
import styles from "./Profile.module.scss";
import { useAuth } from "@/context/authContext";

export default function Profile() {
	const { signedInUser } = useAuth();
	console.log(signedInUser);

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
		<>
			<div className={styles.profileHeader}>
				<Image
					src={signedInUser?.image || "/images/avatar.svg"}
					width={128}
					height={128}
					alt={signedInUser?.name || "User"}
					className={styles.profileImage}
				/>
				<h1 className={styles.profileName}>
					{signedInUser?.name || "No Name"}
				</h1>
				<p className={styles.profileEmail}>
					{signedInUser?.email || "No Email"}
				</p>
			</div>

			<div className={styles.profileContent}>
				<ProfileInfo user={signedInUser} />
				<MovieStats stats={signedInUser?.stats} />
			</div>
		</>
	);
}
