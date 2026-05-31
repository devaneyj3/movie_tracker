import { Header, Footer } from "@/components/shared/layout";
import "./reset.css";
import AppProviders from "./AppProviders";

export const metadata = {
	title: "Movie Tracker",
	description: "Track your movies",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body suppressHydrationWarning>
				<AppProviders>
					<Header />
					<main>{children}</main>
					<Footer />
				</AppProviders>
			</body>
		</html>
	);
}
