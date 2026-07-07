import Link from "next/link";
import { Film } from "lucide-react";
import styles from "./Footer.module.scss";
import {
	accountLinks,
	browseLinks,
	exploreLinks,
} from "../navLinks";

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<div className={styles.inner}>
				<div className={styles.grid}>
					<div className={styles.brand}>
						<Link href="/" className={styles.brandLink}>
							<Film className={styles.brandIcon} aria-hidden />
							<span className={styles.brandName}>MovieTracker</span>
						</Link>
						<p className={styles.tagline}>
							Track what you watch, build your watchlist, and discover your
							next favorite film.
						</p>
					</div>

					<nav className={styles.column} aria-label="Browse movies">
						<h2 className={styles.columnTitle}>Browse</h2>
						<ul className={styles.linkList}>
							{browseLinks.map(({ href, label }) => (
								<li key={href}>
									<Link href={href} className={styles.link}>
										{label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					<nav className={styles.column} aria-label="Explore">
						<h2 className={styles.columnTitle}>Explore</h2>
						<ul className={styles.linkList}>
							{exploreLinks.map(({ href, label }) => (
								<li key={href}>
									<Link href={href} className={styles.link}>
										{label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					<nav className={styles.column} aria-label="Account">
						<h2 className={styles.columnTitle}>Account</h2>
						<ul className={styles.linkList}>
							{accountLinks.map(({ href, label }) => (
								<li key={href}>
									<Link href={href} className={styles.link}>
										{label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>

				<div className={styles.bottom}>
					<p className={styles.copyright}>
						&copy; {year} MovieTracker. Built for movie lovers.
					</p>
					<p className={styles.credit}>Movie data provided by TMDB.</p>
				</div>
			</div>
		</footer>
	);
}
