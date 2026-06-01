import React from "react";
import styles from "./SortResults.module.scss";
import { useMovies } from "@/context/moviesContest";

const options = [
	{
		title: "Popularity Descending",
		value: "popularity-desc",
	},
	{
		title: "Popularity Ascending",
		value: "popularity-asc",
	},
	{
		title: "Rating Descending",
		value: "rating-desc",
	},
	{
		title: "Rating Ascending",
		value: "rating-asc",
	},
	{
		title: "Realease Date Descending",
		value: "realease-date-desc",
	},
	{
		title: "Realease Date Ascending",
		value: "realease-date-asc",
	},
	{
		title: "Title (A to Z)",
		value: "title-desc",
	},
	{
		title: "Title (Z to A)",
		value: "title-asc",
	},
];
export default function SortResults() {
	const { setSortBy } = useMovies();
	return (
		<div className={styles.sort}>
			<label htmlFor="sort">Sort Results By</label>
			<select id="sort" onChange={(e) => setSortBy(e.target.value)}>
				{options.map((option) => {
					return (
						<option key={option.value} value={option.value}>
							{option.title}
						</option>
					);
				})}
			</select>
		</div>
	);
}
