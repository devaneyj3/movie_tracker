"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";
import styles from "./UserButton.module.scss";
import { useAuth } from "@/context/authContext";
import { useSession } from "next-auth/react";

const UserButton = ({ isMobileMenu = false, setMenuOpen }) => {
	const logout = async () => {
		setSignedInUser(null);
		await signOut({ callbackUrl: "/" });
	};

	const navItems = [
		{ href: "/Profile", label: "Profile" },
		{ href: "/TVShows", label: "TV Shows" },
		{ href: "/People", label: "People" },
		{ href: "/Awards", label: "Awards" },
	];

	const [userSettingDropdown, setUserSettingsDropdown] = useState(false);
	const { data: session } = useSession();
	const { setSignedInUser } = useAuth();

	const closeMenu = () => {
		if (typeof setMenuOpen === "function") {
			setMenuOpen(false);
		}
	};

	function userBtnDropdown(e) {
		e.stopPropagation();
		setUserSettingsDropdown((open) => !open);
	}

	const containerClass = isMobileMenu
		? `${styles.userContainer} ${styles.userContainerMobile}`
		: styles.userContainer;

	if (!session) {
		return (
			<Button
				asChild
				variant="ghost"
				className={
					isMobileMenu ? styles.signInButtonMobile : styles.signInButton
				}
			>
				<Link href="/sign-in" onClick={closeMenu}>
					Login
				</Link>
			</Button>
		);
	}

	const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? "";

	return (
		<div className={containerClass} onClick={userBtnDropdown}>
			<Button
				variant="ghost"
				className={
					isMobileMenu ? styles.userAvatarMobile : styles.userAvatar
				}
			>
				{firstInitial}
			</Button>
			{userSettingDropdown && (
				<div
					className={
						isMobileMenu
							? styles.userSettingsDropdownMobile
							: styles.userSettingsDropdownOptions
					}
				>
					{navItems.map((option) => (
						<Link
							key={option.label}
							href={option.href}
							onClick={closeMenu}
						>
							{option.label}
						</Link>
					))}
					<button type="button" onClick={() => logout()}>
						Logout
					</button>
				</div>
			)}
		</div>
	);
};

export default UserButton;
