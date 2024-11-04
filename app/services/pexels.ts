import { createClient } from "pexels";

export const pexelsClient = createClient(process.env.PEXELS_API_KEY || "");

export const getSearchPexels = async (query: string) => {
	const response = await pexelsClient.photos.search({ query, per_page: 20 });
	return response;
};

export const revalidate = 3600; // invalidate every hour

export const getSearchCachePexels = async (query: string) => {
	// const response = await pexelsClient.photos.search({ query, per_page: 20 });

	const url = `https://api.pexels.com/v1/search?query=${query}&per_page=80`;

	const res = await fetch(url, {
		headers: {
			Authorization: process.env.PEXELS_API_KEY || "",
		},
		next: {
			revalidate: 3600,
		},
	});
	return res.json();
};
