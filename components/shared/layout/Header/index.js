"use client";

import { useState } from "react";
import styles from "./Header.module.scss";
import UserButton from "./UserButton";
import { Menu, X } from "lucide-react";
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
				<nav className={styles.mobileNav} aria-label="Mobile menu">
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
				</nav>
			</div>
		</header>
	);
};

export default Header;
