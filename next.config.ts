import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		// remotePatterns: [
		//   {
		//     protocol: 'https',
		//     hostname: 'assets.example.com',
		//     port: '',
		//     pathname: '/account123/**',
		//   },
		// ],
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

	reactStrictMode: true,
};

export default nextConfig;
