// "use client";

import { getSearchCachePexels } from "@/app/services/pexels";
import SearchComponent from "@components/Search";
import { IPhoto } from "@lib/interface";
// import { IPhoto } from "@lib/interface";
// import { useSearchParams } from "next/navigation";
import React from "react";

export default async function SearchResultPage({ params }: { params: Promise<{ query: string }> }) {
	//console.log(params);
	const query = (await params).query || "";

	console.log(query);

	// const resPexels = await fetch("@api/pexels/search", {
	// 	method: "POST",
	// 	body: JSON.stringify({ query }),
	// 	next: { revalidate: 3600 },
	// }).then((r) => r.json());

	const resPexels: any = await getSearchCachePexels(query);

	// const resPixabay = await fetch("@api/pixabay/search", {
	// 	method: "POST",
	// 	body: JSON.stringify({ query }),
	// 	next: { revalidate: 3600 },
	// }).then((r) => r.json());

	// const photos: IPhoto[] = [...resPexels.photos, ...resPixabay.hits];

	const photos: IPhoto[] = [...resPexels?.photos];

	// if (resPexels && resPexels?.photos) {
	// 	photos = [...resPexels.photos];
	// }

	// const searchParams = useSearchParams();

	// const q = searchParams.get("q") || "";
	// console.log(q);
	// const photos: IPhoto[] = [];

	return (
		<div>
			<SearchComponent defaultPhotos={photos} />
		</div>
	);
}
