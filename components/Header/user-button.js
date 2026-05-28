"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";
import styles from "./UserButton.module.scss";
import { useAuth } from "@/context/authContext";
import { useSession } from "next-auth/react";

const UserButton = () => {
	const logout = async () => {
		// Set signedInUser to null immediately
		setSignedInUser(null);
		// Then sign out
		await signOut({ callbackUrl: "/" });

	}
	const navItems = [
		{
			href: '/Profile',
			label: 'Profile'
		},
		{
			href: '/TVShows',
			label: 'TV Shows'
		},
		{
			href: '/People',
			label: 'People'
		},
		{
			href: '/Awards',
			label: 'Awards'
		},
	]

	const [userSettingDropdown, setUserSettingsDropdown] = useState(false)
	const { data: session } = useSession();
	const { setSignedInUser } = useAuth();

	function userBtnDropdown(e) {
		e.stopPropagation()
		userSettingDropdown ? setUserSettingsDropdown(false) : setUserSettingsDropdown(true)
	}

	if (!session) {
		return (
			<Button asChild variant="ghost" className={styles.signInButton}>
				<Link href="/sign-in">
					Login
				</Link>
			</Button>
		);
	}
	const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? "";
	return (
		<div className={styles.userContainer}>
			<Button variant="ghost" className={styles.userAvatar} onMouseEnter={userBtnDropdown} onMouseLeave={userBtnDropdown}>
				{firstInitial}
			</Button>
			{userSettingDropdown && (
				<>
					<div className={styles.userSettingsDropdownOptions}>
						<>
							{navItems.map((option) => {
								return (
									<Link key={option.label} href={`${option.href}`}>{option.label}</Link>
								)
							})}
							<a onClick={() => logout()}>Logout</a>
						</>
					</div>
				</>
			)}
		</div>
	);
};

export default UserButton;
