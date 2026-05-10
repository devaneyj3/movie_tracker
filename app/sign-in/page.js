import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import styles from "./signIn.module.scss";

export const metadata = {
	title: "Sign In",
};
export default async function SignInPage({ searchParams }) {
	const { callbackUrl } = await searchParams;
	return (
		<div className={styles.signInContainer}>
			<h1>
				Login to your account
			</h1>
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
		</div>
	);
}
