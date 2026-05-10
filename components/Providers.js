"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/authContext";
import {  MoviesProvider } from "@/context/moviesContest";

export default function Providers({ children, session }) {
	return (
		<SessionProvider session={session}>
			<AuthProvider>
				<MoviesProvider>{children}</MoviesProvider>
				</AuthProvider>
		</SessionProvider>
	);
}
