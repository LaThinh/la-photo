"use server";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

export const searchPhoto = async (query: string) => {
	"use cache";
	cacheLife("hours");

	console.log("Handle Search Action " + query);

	// const response = await fetch("/api/search", {
	// 	method: "POST",
	// 	body: JSON.stringify({ query }),
	// })
	// 	.then((r) => r.json())
	// 	.finally(() => setLoading(false));

	const pixabayRes = await fetch("/api/pixabay/search", {
		method: "POST",
		body: JSON.stringify({ query }),
	})
		.then((r) => r.json())
		.finally();

	// console.log(pixabayRes);

	// setSearchResult(response);
	return pixabayRes;

	// setPixabaySearchResult(pixabayRes);
};
