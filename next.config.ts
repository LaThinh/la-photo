import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		unoptimized: true,
	},

	// experimental: {
	// 	staleTimes: {
	// 		dynamic: 3600,
	// 	},
	// 	cacheLife: {
	// 		SearchComponent: {
	// 			stale: 3600, // 1 hour
	// 			revalidate: 900, // 15 minutes
	// 			expire: 86400, // 1 day
	// 		},
	// 	},
	// },

	experimental: {
		serverActions: {
			allowedOrigins: ["*.laquocthinh.com"],
		},
	},

	reactStrictMode: true,
};

export default nextConfig;
