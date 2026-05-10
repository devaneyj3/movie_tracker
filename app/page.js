"use client";
import styles from "./home.module.scss";
import Trending from "@/components/Movies/Trending/Trending";
import LatestTrailers from "@/components/Movies/LatestTrailers/LatestTrailers";
import Popular from "@/components/Movies/Popular/Popular";
import FreeToWatch from "@/components/Movies/FreeToWatch/FreeToWatch";
import Searchbar from "@/components/Header/Searchbar/Searchbar";
import Hero from "@/components/Hero/Hero";

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
