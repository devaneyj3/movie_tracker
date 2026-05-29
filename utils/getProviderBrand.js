/** TMDB provider_id → CSS module class slug (see Provider.module.scss) */
const BY_PROVIDER_ID = {
	8: "netflix",
	9: "amazon-prime",
	10: "amazon-video",
	2: "apple-tv",
	350: "apple-tv-plus",
	337: "disney-plus",
	15: "hulu",
	384: "max",
	1899: "max",
	531: "paramount-plus",
	386: "peacock",
	73: "tubi",
	283: "crunchyroll",
	43: "starz",
	258: "showtime",
	1796: "netflix-ads",
	526: "amc-plus",
	1853: "peacock-premium",
	1794: "starz-amazon",
	207: "roku",
	238: "youtube",
	188: "youtube-premium",
	192: "youtube-tv",
	3: "google-play",
	68: "microsoft",
	7: "vudu",
};

const BY_NAME = {
	netflix: "netflix",
	"netflix basic with ads": "netflix",
	hulu: "hulu",
	"disney plus": "disney-plus",
	"disney+": "disney-plus",
	"amazon prime video": "amazon-prime",
	"prime video": "amazon-prime",
	"apple tv": "apple-tv",
	"apple tv plus": "apple-tv-plus",
	"apple tv+": "apple-tv-plus",
	"hbo max": "max",
	max: "max",
	"paramount plus": "paramount-plus",
	"paramount+": "paramount-plus",
	peacock: "peacock",
	"peacock premium": "peacock",
	tubi: "tubi",
	crunchyroll: "crunchyroll",
	starz: "starz",
	showtime: "showtime",
	"google play movies": "google-play",
	"youtube premium": "youtube-premium",
	"youtube tv": "youtube-tv",
};

export function getProviderBrandClass(provider) {
	const byId = BY_PROVIDER_ID[provider?.provider_id];
	if (byId) return byId;

	const nameKey = provider?.provider_name?.toLowerCase().trim();
	if (nameKey && BY_NAME[nameKey]) return BY_NAME[nameKey];

	return "default";
}
