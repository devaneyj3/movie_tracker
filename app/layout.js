import Header from "@/components/Header";
import "./reset.css";
import AppProviders from "./AppProviders";
import Footer from "@/components/Footer/Footer";

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
					<Footer/>
				</AppProviders>
			</body>
		</html>
	);
}
