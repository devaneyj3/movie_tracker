"use client";
import React from "react";
import Link from "next/link";
import styles from "./NavDropdown.module.scss";

const NavDropdown = ({ label, href, closeMobileMenu = "" }) => {
	return (
		<div className={styles.options}>
			<Link
				className={styles.signedInOptions}
				href={`${href}`}
				onClick={() => closeMobileMenu(false)}>
				{label}
			</Link>
		</div>
	);
};

export default NavDropdown;
