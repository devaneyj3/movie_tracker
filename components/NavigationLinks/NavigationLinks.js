"use client";
import React from "react";
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
				href: "/Movies",
				label: "Popular",
			},
			{
				href: "/Movies",
				label: "Now Playing",
			},
			{
				href: "/Movies",
				label: "Upcoming",
			},
			{
				href: "/Movies",
				label: "Top Rated",
			},
		],
	},
	{
		href: "/TVShows",
		label: "TV Shows",
		dropdownItems: [
			{
				href: "/Movies",
				label: "Popular",
			},
			{
				href: "/Movies",
				label: "Airing Today",
			},
			{
				href: "/Movies",
				label: "On TV",
			},
			{
				href: "/Movies",
				label: "Top Rated",
			},
		],
	},
	{
		href: "/People",
		label: "People",
		dropdownItems: [
			{
				href: "/Movies",
				label: "Popular",
			},
		],
	},
	{
		href: "/Awards",
		label: "Awards",
		dropdownItems: [
			{
				href: "/Movies",
				label: "Popular",
			},
			{
				href: "/Movies",
				label: "Upcoming",
			},
		],
	},
	{
		href: "/More",
		label: "More",
		dropdownItems: [
			{
				href: "/Movies",
				label: "Discussions",
			},
			{
				href: "/Movies",
				label: "Leaderboard",
			},
		],
	},
];

const NavigationLinks = ({ className = "" }) => {
	return (
		<>
			<div className={styles.logoContainer}>
				<Link href="/">
					<Film className={styles.logoIcon} />
				</Link>
			</div>
			<ul className={`${styles.navLinks} ${className}`}>
				{navItems.map((nav, index) => {
					const { href, label, dropdownItems } = nav;
					console.log(dropdownItems);
					return (
						<div key={index}>
							<Link key={index} href={`${href}`}>
								{label}
							</Link>
							<div className={styles.movieDropdownOptions}>
								{dropdownItems.map((item) => {
									return (
										<NavDropdown
											key={item.label}
											label={item.label}
											href={item.href}
										/>
									);
								})}
							</div>
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
