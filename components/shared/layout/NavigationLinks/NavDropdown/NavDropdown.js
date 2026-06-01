"use client";

import React from "react";
import Link from "next/link";
import styles from "./NavDropdown.module.scss";

const NavDropdown = ({
	label,
	href,
	isMobileMenu = false,
	closeMobileMenu,
}) => {
	return (
		<div
			className={`${styles.options} ${isMobileMenu ? styles.optionsMobile : ""}`}
		>
			<Link
				className={`${styles.signedInOptions} ${isMobileMenu ? styles.signedInOptionsMobile : ""}`}
				href={href}
				onClick={() => closeMobileMenu?.()}
			>
				{label}
			</Link>
		</div>
	);
};

export default NavDropdown;
