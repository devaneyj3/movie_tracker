import { TMDB } from "@api-wrappers/tmdb-wrapper";

const tmdb = new TMDB(process.env.NEXT_PUBLIC_TMDB_ACCESS);

export default tmdb