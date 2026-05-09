import Header from "@/components/Header";
import "./reset.css";
import AppProviders from "./AppProviders";
import Searchbar from "@/components/Header/Searchbar/Searchbar";
import styles from './layout.module.scss'
import Hero from "@/components/Hero/Hero";

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
					<Searchbar />
					<Hero />
					<main className={styles.main}>{children}</main>
				</AppProviders>
			</body>
		</html>
	);
}
