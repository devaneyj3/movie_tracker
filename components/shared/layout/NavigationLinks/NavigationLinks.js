"use client";

import React, { useState } from "react";
import { Film } from "lucide-react";
import Link from "next/link";
import styles from "./NavigationLinks.module.scss";
import NavDropdown from "./NavDropdown/NavDropdown";
import Image from "next/image";
import camera from "../../../../public/images/camera.png"

const navItems = [
	{
		href: "/Movies",
		label: "Movies",
		dropdownItems: [
			{ href: "/Movies/popular", label: "Popular" },
			{ href: "/Movies/now-playing", label: "Now Playing" },
			{ href: "/Movies/upcoming", label: "Upcoming" },
			{ href: "/Movies/top-rated", label: "Top Rated" },
		],
	},
	{
		href: "/TVShows",
		label: "TV Shows",
		dropdownItems: [
			{ href: "/Movies/popular", label: "Popular" },
			{ href: "/Movies/airing-today", label: "Airing Today" },
			{ href: "/Movies/on-the-air", label: "On TV" },
			{ href: "/Movies/top-rated", label: "Top Rated" },
		],
	},
	{
		href: "/People",
		label: "People",
		dropdownItems: [{ href: "/Movies/popular", label: "Popular" }],
	},
	{
		href: "/Awards",
		label: "Awards",
		dropdownItems: [
			{ href: "/Movies/popular", label: "Popular" },
			{ href: "/Movies/upcoming", label: "Upcoming" },
		],
	},
	{
		href: "/More",
		label: "More",
		dropdownItems: [
			{ href: "/Movies/discussions", label: "Discussions" },
			{ href: "/Movies/leaderbord", label: "Leaderboard" },
		],
	},
];

const NavigationLinks = ({ isMobileMenu = false, setMenuOpen }) => {
	const [desktopOpenLabel, setDesktopOpenLabel] = useState(null);
	const [mobileOpenLabel, setMobileOpenLabel] = useState(null);

	const closeMenu = () => {
		if (typeof setMenuOpen === "function") {
			setMenuOpen(false);
		}
	};

	const toggleMobileSection = (label) => {
		setMobileOpenLabel((current) => (current === label ? null : label));
	};

	if (isMobileMenu) {
		return (
			<nav className={styles.mobileMenuRoot} aria-label="Mobile navigation">
				<Link
					href="/"
					className={styles.mobileLogoLink}
					onClick={closeMenu}
				>
					<Image src={camera} alt="camera" className={styles.mobileLogoIcon} width={300} height={300} aria-hidden />
					<span>MovieTracker</span>
				</Link>

				<ul className={styles.mobileNavLinks}>
					{navItems.map((nav) => {
						const { label, dropdownItems } = nav;
						const isOpen = mobileOpenLabel === label;

						return (
							<li key={label} className={styles.mobileNavItem}>
								<button
									type="button"
									className={styles.mobileNavButton}
									aria-expanded={isOpen}
									onClick={() => toggleMobileSection(label)}
								>
									<span>{label}</span>
									<span
										className={`${styles.mobileChevron} ${isOpen ? styles.mobileChevronOpen : ""}`}
										aria-hidden
									>
										›
									</span>
								</button>
								{isOpen && (
									<ul className={styles.mobileDropdown}>
										{dropdownItems.map((item) => (
											<li key={item.label}>
												<NavDropdown
													label={item.label}
													href={item.href}
													isMobileMenu
													closeMobileMenu={closeMenu}
												/>
											</li>
										))}
									</ul>
								)}
							</li>
						);
					})}
				</ul>
			</nav>
		);
	}

	return (
		<>
			<div className={styles.logoContainer}>
				<Link href="/">
					<Image src={camera} alt="camera" className={styles.mobileLogoIcon} width={300} height={300} aria-hidden />
				</Link>
			</div>
			<ul className={styles.navLinks}>
				{navItems.map((nav) => {
					const { label, dropdownItems } = nav;
					const isOpen = desktopOpenLabel === label;

					return (
						<li
							key={label}
							className={styles.navItem}
							onMouseEnter={() => setDesktopOpenLabel(label)}
							onMouseLeave={() => setDesktopOpenLabel(null)}
						>
							<p className={styles.navLabel}>{label}</p>
							{isOpen && (
								<div className={styles.movieDropdownOptions}>
									{dropdownItems.map((item) => (
										<div
											className={styles.dropdownList}
											key={item.label}
										>
											<NavDropdown
												label={item.label}
												href={item.href}
											/>
										</div>
									))}
								</div>
							)}
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default NavigationLinks;
