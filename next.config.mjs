import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
	sassOptions: {
		silenceDeprecations: ["legacy-js-api"],
		includePaths: [path.join(__dirname)],
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "image.tmdb.org",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
		],
	},
};

export default nextConfig;
