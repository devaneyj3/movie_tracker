/**
 * Groups watched movie entries by the month of their most recent watch date.
 * Months are sorted newest → oldest. Entries without dates go under "Unknown".
 */
export function groupWatchedByMonth(watchedMovies = []) {
	const groups = new Map();

	for (const entry of watchedMovies) {
		const dates = entry?.watchDates ?? [];
		const mostRecent = dates.length
			? [...dates].sort(
					(a, b) => new Date(b.dateWatched) - new Date(a.dateWatched),
				)[0]?.dateWatched
			: null;

		const date = mostRecent ? new Date(mostRecent) : null;
		const isValid = date && !Number.isNaN(date.getTime());

		const key = isValid
			? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
			: "unknown";

		const label = isValid
			? date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
			: "Unknown date";

		if (!groups.has(key)) {
			groups.set(key, { key, label, sortValue: isValid ? date.getTime() : 0, movies: [] });
		}

		groups.get(key).movies.push(entry);
	}

	return [...groups.values()].sort((a, b) => b.sortValue - a.sortValue);
}
