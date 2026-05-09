import React from "react";
import Provider from "./Provider/Provider";
import styles from "./WhereToWatch.module.scss";

export default function WhereToWatch({ movieDetails }) {
	const whereToWatch = movieDetails["watch/providers"].results.US;
	return (
		<div className={styles.providers}>
			{whereToWatch.flatrate && (
				<Provider
					label="Stream"
					value={"flatrate"}
					whereToWatch={whereToWatch}
				/>
			)}
			{whereToWatch.buy && (
				<Provider label="Buy" value={"buy"} whereToWatch={whereToWatch} />
			)}
			{whereToWatch.rent && (
				<Provider label="Rent" value={"rent"} whereToWatch={whereToWatch} />
			)}
		</div>
	);
}
