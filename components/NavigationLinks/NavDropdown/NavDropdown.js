"use client";
import React from "react";
import Link from "next/link";
import styles from "./NavDropdown.module.scss";

const NavDropdown = ({ label, href }) => {
	return (
		<div className={styles.options}>
			<Link
				className={styles.signedInOptions}
				href={`${href}`}>
				{label}
			</Link>
		</div>
	);
};

export default NavDropdown;
