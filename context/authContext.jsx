"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";

export const authContext = createContext({});

function userFromSession(session) {
	if (!session?.user) return null;
	return {
		id: session.user.id,
		name: session.user.name,
		email: session.user.email,
		phone: session.user.phone,
		address: session.user.address,
		city: session.user.city,
		state: session.user.state,
		zip: session.user.zip,
		image: session.user.image,
		profileComplete: session.user.profileComplete,
	};
}

export const AuthProvider = ({ children }) => {
	const { data: session, status } = useSession();
	const [signedInUser, setSignedInUser] = useState(() => userFromSession(session));
	const [isLoading, setIsLoading] = useState(() => status === "loading");

	useEffect(() => {
		if (status === "loading") {
			setIsLoading(true);
			return;
		}

		setSignedInUser(userFromSession(session));
		setIsLoading(false);
	}, [session, status]);

	async function update(id, address, city, state, zip, phone) {
		const res = await fetch("/api/user", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id, address, city, state, zip, phone }),
		});
		const user = await res.json();

		// Update local state with new user data
		setSignedInUser((prev) => ({
			...prev,
			...user,
			profileComplete: true,
		}));

		return user;
	}

	// Memoize the context value to prevent infinite re-renders
	const contextValue = useMemo(
		() => ({
			signedInUser,
			setSignedInUser,
			update,
			isLoading,
		}),
		[signedInUser, isLoading]
	);

	return (
		<authContext.Provider value={contextValue}>{children}</authContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(authContext);
};
