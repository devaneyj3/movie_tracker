"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import styles from "./NavigationLinks.module.scss";

const navItems = [
	{
		href: '/Movies',
		label: 'Movies'
	},
	{
		href: '/TVShows',
		label: 'TV Shows'
	},
	{
		href: '/People',
		label: 'People'
	},
	{
		href: '/Awards',
		label: 'Awards'
	},
	{
		href: '/More',
		label: 'More'
	},
	// {
	// 	href: '/sign-in',
	// 	label: 'Login'
	// }
]

const NavigationLinks = ({ className = "" }) => {
	return (
		<ul className={`${styles.navLinks} ${className}`}>
			{navItems.map((nav, index) => {
				const { href, label } = nav
				return (
						<Link key={index} href={`${href}`}>{label}</Link>
				)
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
	);
};

export default NavigationLinks;
