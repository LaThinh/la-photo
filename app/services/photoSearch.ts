import { createClient } from "pexels";

export const pexelsClient = createClient(process.env.PEXELS_API_KEY || "");
export const pixabayAPIKey = process.env.PIXABAY_API_KEY || "";
export const pixabayAPI = `https://pixabay.com/api/?key=${pixabayAPIKey}`;

// export const getSearchPexels = async (query: string) => {
// 	const response = await pexelsClient.photos.search({ query, per_page: 20 });
// 	return response;
// };

export const revalidate = 3600; // invalidate every hour

export const getSearchPexels = async (query: string, page?: number) => {
	// const q = encodeURIComponent(query);
	const p = page || 1;
	const url = `https://api.pexels.com/v1/search?query=${query}&per_page=80&page=${p}`;

	console.log(url);

	const res = await fetch(url, {
		headers: {
			Authorization: "t9rK44ewElcEocAAOOZIAzT4tZLuloBLWNWwfJoKOMAoGPw10XpGyAat",
		},
		next: {
			revalidate: 3600,
		},
	});

	return res.json();
};

export const getSearchPixabay = async (query: string, page?: number) => {
	// const q = encodeURIComponent(query);
	const p = page || 1;
	const url = `${pixabayAPI}&q=${query}&image_type=photo&per_page=100&page=${p}&min_width=200&min_height=200`;
	const res = await fetch(url, {
		next: {
			revalidate: 3600,
		},
	});

	return res.json();
};

export const getSearchPhotos = async (query: string, page?: number) => {
	const resPexels = await getSearchPexels(query, page);
	const resPixabay = await getSearchPixabay(query, page);
	console.log("Search Query '" + decodeURIComponent(query + "'"));
	// console.log(resPexels);
	// console.log(resPixabay);

	const photoResults = {
		total: resPexels?.total_results + resPixabay?.total,
		photos: [...resPexels?.photos, ...resPixabay?.hits],
	};

	// console.log(photoResults);

	return photoResults;
};
