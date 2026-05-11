import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./utils/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
	// PrismaAdapter defaults to database sessions, which queries Prisma on every auth().
	// JWT keeps sessions in the cookie and matches the jwt/session callbacks below.
	// The adapter still persists User/Account on sign-in (OAuth still needs a working DATABASE_URL).
	session: { strategy: "jwt" },
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	adapter: PrismaAdapter(prisma),
	pages: {
		signIn: "/sign-in",
	},
	callbacks: {
		async jwt({ token, user }) {
			// This runs when user first signs in (user is defined)
			if (user) {
				// Store user data in JWT token
				token.id = user.id;
				token.phone = user.phone;
				token.address = user.address;
				token.city = user.city;
				token.state = user.state;
				token.zip = user.zip;
				token.profileComplete = user.profileComplete;
			}
			return token;
		},
		async session({ session, token }) {
			// This runs on every session check, but uses JWT data (no database query)
			if (token) {
				session.user.id = token.id;
				session.user.phone = token.phone;
				session.user.address = token.address;
				session.user.city = token.city;
				session.user.state = token.state;
				session.user.zip = token.zip;
				session.user.profileComplete = token.profileComplete;
			}
			return session;
		},
	},
});
