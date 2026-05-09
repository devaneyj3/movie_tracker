"use client";
import React from "react";
import { Button } from "../ui/button";
import { UserIcon, LogOut, List } from "lucide-react";

import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
} from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";
import styles from "./UserButton.module.scss";
import { useAuth } from "@/context/authContext";
import { useSession } from "next-auth/react";

const UserButton = () => {
	const { data: session } = useSession();
	const { setSignedInUser } = useAuth();

	if (!session) {
		return (
			<Button asChild variant="ghost" className={styles.signInButton}>
				<Link href="/sign-in">
					<UserIcon />
					Sign In
				</Link>
			</Button>
		);
	}
	const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? "";
	return (
		<div className={styles.userContainer}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className={styles.userAvatar}>
						{firstInitial}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className={styles.dropdownContent} align="end">
					<DropdownMenuLabel className={styles.dropdownLabel}>
						<div className={styles.userInfo}>
							<div className={styles.userName}>{session.user?.name}</div>
							<div className={styles.userEmail}>{session.user?.email}</div>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuItem className={styles.dropdownItem}>
						<Button className={styles.dropdownButton} variant="ghost" asChild>
							<Link href="/Profile">
								<UserIcon />
								Profile
							</Link>
						</Button>
					</DropdownMenuItem>
					<DropdownMenuItem className={styles.dropdownItem}>
						<Button className={styles.dropdownButton} variant="ghost" asChild>
							<Link href="/MovieList">
								<List />
								Movie List
							</Link>
						</Button>
					</DropdownMenuItem>
					<DropdownMenuItem className={styles.dropdownItem}>
						<Button
							className={styles.dropdownButton}
							variant="ghost"
							onClick={async () => {
								// Set signedInUser to null immediately
								setSignedInUser(null);
								// Then sign out
								await signOut({ callbackUrl: "/" });
							}}>
							<LogOut />
							Sign Out
						</Button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default UserButton;
