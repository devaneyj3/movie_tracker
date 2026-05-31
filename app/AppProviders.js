import { auth } from "@/auth";
import { Providers } from "@/components/shared/layout";

export default async function AppProviders({ children }) {
	let session = null;
	try {
		session = await auth();
	} catch {
		session = null;
	}
	return <Providers session={session}>{children}</Providers>;
}
