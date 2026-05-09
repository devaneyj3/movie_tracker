"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/utils/apiClient";
import { dateFormatter } from "@/utils/dateFormater";
import styles from "./home.module.scss";
import Trending from "@/components/Movies/Trending/Trending";
import LatestTrailers from "@/components/Movies/LatestTrailers/LatestTrailers";
import Popular from "@/components/Movies/Popular/Popular";
import FreeToWatch from "@/components/Movies/FreeToWatch/FreeToWatch";

export default function Home() {
	const [moviesPlaying, setMoviesPlaying] = useState({});
	useEffect(() => {
		const getMoviesPlaying = async () => {
			try {
				const response = await apiClient.get("movie/now_playing", {
					params: { language: "en-US", page: 1 },
				});
				setMoviesPlaying(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		getMoviesPlaying();
	}, []);
	const { dates, results } = moviesPlaying;
	const minDate = dates ? dateFormatter(dates.minimum) : "";
	const maxDate = dates ? dateFormatter(dates.maximum) : "";
	return (
		<div className={styles.pageContainer}>
			<Trending />
			<LatestTrailers />
			<Popular />
			<FreeToWatch/>
		</div>
	);
}
