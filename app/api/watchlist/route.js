import { getWatchList } from "@/utils/watchListQueries";

export const dynamic = "force-dynamic";

export async function GET() {
	const data = await getWatchList();
	return Response.json({ data });
}