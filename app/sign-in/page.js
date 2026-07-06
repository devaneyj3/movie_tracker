import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import styles from "./signIn.module.scss";

export const metadata = {
	title: "Sign In",
};

function GoogleIcon() {
	return (
		<svg
			className={styles.googleIcon}
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<path
				fill="#4285F4"
				d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
			/>
			<path
				fill="#34A853"
				d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
			/>
			<path
				fill="#FBBC05"
				d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
			/>
			<path
				fill="#EA4335"
				d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
			/>
		</svg>
	);
}

export default async function SignInPage({ searchParams }) {
	const { callbackUrl } = await searchParams;

	return (
		<div className={styles.page}>
			<div className={styles.backdrop} aria-hidden="true" />

			<div className={styles.content}>
				<div className={styles.copy}>
					<p className={styles.eyebrow}>MovieTracker</p>
					<h1 className={styles.title}>Your cinema journey starts here</h1>
					<p className={styles.subtitle}>
						Track what you&apos;ve watched, build your watchlist, and keep
						stats on every film.
					</p>

					<ul className={styles.features}>
						<li>Save movies to your watchlist</li>
						<li>Log watch dates and stats</li>
						<li>Sync across devices</li>
					</ul>
				</div>

				<div className={styles.signIn}>
					<form
						className={styles.form}
						action={async () => {
							"use server";
							try {
								await signIn("google", {
									redirectTo: callbackUrl ?? "/Profile",
								});
							} catch (error) {
								if (error instanceof AuthError) {
									return redirect(`/error?error=${error.type}`);
								}
								throw error;
							}
						}}
					>
						<button type="submit" className={styles.googleButton}>
							<GoogleIcon />
							<span>Continue with Google</span>
						</button>
					</form>

					<p className={styles.footer}>
						By continuing, you agree to use MovieTracker for personal movie
						tracking.
					</p>
				</div>
			</div>
		</div>
	);
}
