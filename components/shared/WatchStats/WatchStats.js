import { dateFormatter } from "@/utils/dateFormatter";
import styles from "./WatchStats.module.scss";

export default function WatchStats({ stats }) {
	if (!stats) {
		return null;
	}

	return (
		<div className={styles.watchStats}>
			<p className={styles.label}>Last watched</p>
			<p className={styles.date}>{dateFormatter(stats.mostRecent)}</p>
			<p className={styles.count}>
				Watched {stats.timesWatched}{" "}
				{stats.timesWatched === 1 ? "time" : "times"}
			</p>
		</div>
	);
}
