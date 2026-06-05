"use client";

import styles from "./home.module.scss";
import {
	Hero,
	Trending,
	LatestTrailers,
	Popular,
	FreeToWatch,
} from "@/components/home";
import { Searchbar } from "@/components/shared/layout";

export default function Home() {
	return (
		<div className={styles.pageContainer}>
			<Searchbar />
			<Hero />
			<div className={styles.page}>
				<Trending />
				<LatestTrailers />
				<Popular />
				<FreeToWatch />
			</div>
		</div>
	);
}
