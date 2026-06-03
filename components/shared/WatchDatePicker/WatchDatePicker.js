"use client";

import React, { useEffect, useState } from "react";
import styles from "./WatchDatePicker.module.scss";
import { useMovies } from "@/context/moviesContest";
import {
	getTodayDateInputValue,
	parseDateInputValue,
} from "@/utils/dateInput";

export default function WatchDatePicker({ movie, open, onClose }) {
	const { markMovieAsWatched } = useMovies();
	const [date, setDate] = useState(getTodayDateInputValue());
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		if (open) {
			setDate(getTodayDateInputValue());
		}
	}, [open, movie?.id]);

	if (!open || !movie) {
		return null;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);
		try {
			await markMovieAsWatched(movie, parseDateInputValue(date));
			onClose();
		} catch (err) {
			console.error(err);
		} finally {
			setSaving(false);
		}
	};

	return (
		<div
			className={styles.backdrop}
			onClick={onClose}
			role="presentation"
		>
			<form
				className={styles.panel}
				onClick={(e) => e.stopPropagation()}
				onSubmit={handleSubmit}
			>
				<h3 className={styles.title}>Mark as watched</h3>
				<p className={styles.movieTitle}>{movie.title}</p>
				<label className={styles.label} htmlFor="watch-date">
					Date watched
				</label>
				<input
					id="watch-date"
					type="date"
					className={styles.dateInput}
					value={date}
					max={getTodayDateInputValue()}
					onChange={(e) => setDate(e.target.value)}
					required
				/>
				<div className={styles.actions}>
					<button
						type="button"
						className={styles.cancelBtn}
						onClick={onClose}
						disabled={saving}
					>
						Cancel
					</button>
					<button
						type="submit"
						className={styles.saveBtn}
						disabled={saving}
					>
						{saving ? "Saving…" : "Save"}
					</button>
				</div>
			</form>
		</div>
	);
}
