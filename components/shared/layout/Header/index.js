"use client";

import { useState } from "react";
import Link from "next/link";
import { Film, Menu, Search, X } from "lucide-react";
import styles from "./Header.module.scss";
import UserButton from "./UserButton";
import NavigationLinks from "../NavigationLinks/NavigationLinks";

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const closeMenu = () => setMenuOpen(false);

	return (
		<>
			<header className={styles.header}>
				<div className={styles.inner}>
					<Link href="/" className={styles.brand}>
						<Film className={styles.brandIcon} aria-hidden />
						<span className={styles.brandName}>MovieTracker</span>
					</Link>

					<div className={styles.desktopNav}>
						<NavigationLinks />
					</div>

					<div className={styles.actions}>
						<Link
							href="/Search"
							className={styles.searchLink}
							aria-label="Search"
						>
							<Search className={styles.searchIcon} aria-hidden />
						</Link>
						<UserButton />
					</div>

					<nav className={styles.mobileNav} aria-label="Mobile menu">
						<Link
							href="/Search"
							className={styles.mobileSearchLink}
							aria-label="Search"
						>
							<Search className={styles.searchIcon} aria-hidden />
						</Link>
						<button
							type="button"
							className={styles.menuToggle}
							onClick={() => setMenuOpen((open) => !open)}
							aria-expanded={menuOpen}
							aria-label={menuOpen ? "Close menu" : "Open menu"}
						>
							{menuOpen ? (
								<X className={styles.menuIcon} aria-hidden />
							) : (
								<Menu className={styles.menuIcon} aria-hidden />
							)}
						</button>
					</nav>
				</div>
			</header>

			{menuOpen && (
				<>
					<button
						type="button"
						className={styles.backdrop}
						onClick={closeMenu}
						aria-label="Close menu"
					/>
					<div className={styles.mobileMenuPanel}>
						<div className={styles.mobileMenuHeader}>
							<h2 className={styles.mobileMenuTitle}>Menu</h2>
							<button
								type="button"
								className={styles.menuClose}
								onClick={closeMenu}
								aria-label="Close menu"
							>
								<X className={styles.menuIcon} aria-hidden />
							</button>
						</div>
						<NavigationLinks
							isMobileMenu
							setMenuOpen={setMenuOpen}
						/>
						<div className={styles.mobileMenuFooter}>
							<UserButton
								isMobileMenu
								setMenuOpen={setMenuOpen}
							/>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Header;
