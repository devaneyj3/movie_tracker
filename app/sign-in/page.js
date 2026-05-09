import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { Film } from "lucide-react";
import styles from "./signIn.module.scss";

export const metadata = {
	title: "Sign In",
};
export default async function SignInPage({ searchParams }) {
	const { callbackUrl } = await searchParams;
	return (
		<div className={styles.signInContainer}>
			<Card className={styles.signInCard}>
				<CardHeader className={styles.cardHeader}>
					<Link href="/" className={styles.logoLink}>
						<Film className={styles.logoIcon} />
					</Link>
					<CardTitle className={styles.cardTitle}>Sign In</CardTitle>
					<CardDescription className={styles.cardDescription}>
						Sign in to your account
					</CardDescription>
				</CardHeader>
				<CardContent className={styles.cardContent}>
					<form
						className={styles.signInForm}
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
						}}>
						<Button variant="default" className={styles.googleButton}>
							<span className={styles.buttonText}>Sign in with Google</span>
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
