"use client";

import { useState } from "react";
import styles from "./Header.module.scss";
import UserButton from "./user-button";
import { EllipsisVertical, X } from "lucide-react";
import NavigationLinks from "../NavigationLinks/NavigationLinks";

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const closeMenu = () => setMenuOpen(false);

	return (
		<header className={styles.header}>
			<div className={styles.headerContainer}>
				<div className={styles.menu}>
					<div className={styles.menuContainer}>
						<NavigationLinks />
						<div className={styles.signIn}>
							<UserButton />
						</div>
					</div>
				</div>
				<nav className={styles.mobileNav}>
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
							<EllipsisVertical
								className={styles.menuIcon}
								aria-hidden
							/>
						)}
					</button>
					{menuOpen && (
						<>
							<button
								type="button"
								className={styles.backdrop}
								onClick={closeMenu}
								aria-label="Close menu"
							/>
							<div className={styles.mobileMenuPanel}>
								<h2 className={styles.mobileMenuTitle}>Menu</h2>
								<NavigationLinks className={styles.mobileLinksContainer} setMenuOpen={setMenuOpen} />
								<UserButton setMenuOpen={setMenuOpen} />
							</div>
						</>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Header;
