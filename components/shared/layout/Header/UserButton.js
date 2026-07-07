"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import styles from "./UserButton.module.scss";
import { useAuth } from "@/context/authContext";

const UserButton = ({ isMobileMenu = false, setMenuOpen }) => {
	const [userSettingDropdown, setUserSettingsDropdown] = useState(false);
	const { data: session } = useSession();
	const { setSignedInUser } = useAuth();

	const closeMenu = () => {
		if (typeof setMenuOpen === "function") {
			setMenuOpen(false);
		}
	};

	const logout = async () => {
		setSignedInUser(null);
		await signOut({ callbackUrl: "/" });
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
			<Link
				href="/sign-in"
				className={
					isMobileMenu ? styles.signInButtonMobile : styles.signInButton
				}
				onClick={closeMenu}
			>
				Sign In
			</Link>
		);
	}

	const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? "";

	return (
		<div className={containerClass} onClick={userBtnDropdown}>
			<button
				type="button"
				className={
					isMobileMenu ? styles.userAvatarMobile : styles.userAvatar
				}
				aria-expanded={userSettingDropdown}
				aria-label="Account menu"
			>
				{firstInitial}
			</button>
			{userSettingDropdown && (
				<div
					className={
						isMobileMenu
							? styles.userSettingsDropdownMobile
							: styles.userSettingsDropdownOptions
					}
					role="menu"
				>
					<Link href="/Profile" onClick={closeMenu} role="menuitem">
						Profile
					</Link>
					<button type="button" onClick={() => logout()} role="menuitem">
						Logout
					</button>
				</div>
			)}
		</div>
	);
};

export default UserButton;
