"use client";
import React, { useState } from "react";
import { Film } from "lucide-react";
import Link from "next/link";
import styles from "./NavigationLinks.module.scss";
import NavDropdown from "./NavDropdown/NavDropdown";

const navItems = [
	{
		href: "/Movies",
		label: "Movies",
		dropdownItems: [
			{
				href: "/Movies/popular",
				label: "Popular",
			},
			{
				href: "/Movies/now-playing",
				label: "Now Playing",
			},
			{
				href: "/Movies/upcoming",
				label: "Upcoming",
			},
			{
				href: "/Movies/top-rated",
				label: "Top Rated",
			},
		],
	},
	{
		href: "/TVShows",
		label: "TV Shows",
		dropdownItems: [
			{
				href: "/Movies/popular",
				label: "Popular",
			},
			{
				href: "/Movies/airing-today",
				label: "Airing Today",
			},
			{
				href: "/Movies/on-the-air",
				label: "On TV",
			},
			{
				href: "/Movies/top-rated",
				label: "Top Rated",
			},
		],
	},
	{
		href: "/People",
		label: "People",
		dropdownItems: [
			{
				href: "/Movies/popular",
				label: "Popular",
			},
		],
	},
	{
		href: "/Awards",
		label: "Awards",
		dropdownItems: [
			{
				href: "/Movies/popular",
				label: "Popular",
			},
			{
				href: "/Movies/upcoming",
				label: "Upcoming",
			},
		],
	},
	{
		href: "/More",
		label: "More",
		dropdownItems: [
			{
				href: "/Movies/discussions",
				label: "Discussions",
			},
			{
				href: "/Movies/leaderbord",
				label: "Leaderboard",
			},
		],
	},
];

const NavigationLinks = ({ className = "" }) => {
	const [currentLabelPicked, setCurrentLabelPicked] = useState(null)


	return (
		<>
			<div className={styles.logoContainer}>
				<Link href="/">
					<Film className={styles.logoIcon} />
				</Link>
			</div>
			<ul className={`${styles.navLinks} ${className}`}>
				{navItems.map((nav, index) => {
					const { label, dropdownItems } = nav;
					return (
						<div key={index}>
							<p key={index} onMouseEnter={() => setCurrentLabelPicked(label)} onMouseLeave={() => setCurrentLabelPicked(null)}>
								{label}
							</p>
							{currentLabelPicked === label && <div className={styles.movieDropdownOptions}>
								{dropdownItems.map((item) => {
									return (
										<div className={styles.dropdownList} key={item.label}>
											<NavDropdown
												label={item.label}
												href={item.href}
											/>
										</div>
									);
								})}
							</div>}
						</div>
					);
				})}
				{/* {signedInUser && (
				<Button asChild variant="ghost" className={styles.navButton}>
				<Link href="/MovieList">Movie List</Link>
				</Button>
				)}
				<Button asChild variant="ghost" className={styles.navButton}>
				<Link href="/TVShows">TV Shows</Link>
				</Button> */}
			</ul>
		</>
	);
};

export default NavigationLinks;
