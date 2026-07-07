"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./NavigationLinks.module.scss";
import NavDropdown from "./NavDropdown/NavDropdown";
import {
	navSections,
} from "../navLinks";

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
				{navSections.map((section) => {
					const { label, items } = section;
					const isOpen = mobileOpenLabel === label;

					return (
						<div key={label} className={styles.mobileSection}>
							<button
								type="button"
								className={styles.mobileSectionButton}
								aria-expanded={isOpen}
								onClick={() => toggleMobileSection(label)}
							>
								<span className={styles.mobileSectionLabel}>{label}</span>
								<span
									className={`${styles.mobileChevron} ${isOpen ? styles.mobileChevronOpen : ""}`}
									aria-hidden
								>
									›
								</span>
							</button>
							{isOpen && (
								<ul className={styles.mobileDropdown}>
									{items.map((item) => (
										<li key={item.href}>
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
						</div>
					);
				})}
			</nav>
		);
	}

	return (
		<nav className={styles.navRoot} aria-label="Main navigation">
			<ul className={styles.navLinks}>
				{navSections.map((section) => {
					const { label, items } = section;
					const isOpen = desktopOpenLabel === label;

					return (
						<li
							key={label}
							className={styles.navItem}
							onMouseEnter={() => setDesktopOpenLabel(label)}
							onMouseLeave={() => setDesktopOpenLabel(null)}
						>
							<button
								type="button"
								className={styles.navTrigger}
								aria-expanded={isOpen}
								aria-haspopup="true"
							>
								{label}
							</button>
							{isOpen && (
								<div className={styles.dropdownPanel} role="menu">
									{items.map((item) => (
										<NavDropdown
											key={item.href}
											label={item.label}
											href={item.href}
										/>
									))}
								</div>
							)}
						</li>
					);
				})}
				<li className={styles.navItem}>
					<Link href="/Profile" className={styles.navLink}>
						Profile
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavigationLinks;
