import Header from "@/components/Header";
import "./reset.css";
import AppProviders from "./AppProviders";

export const metadata = {
	title: "Movie Tracker",
	description: "Track your movies",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<AppProviders>
					<Header />
					<main>{children}</main>
				</AppProviders>
			</body>
		</html>
	);
}
