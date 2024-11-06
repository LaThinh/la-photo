import { getSearchPhotos } from "@/app/services/photoSearch";
import SearchComponent from "@components/SearchComponent";
// import SearchComponent from "@components/Search";

import React from "react";

export default async function SearchResultPage({ params }: { params: Promise<{ query: string }> }) {
	//console.log(params);
	const query = (await params).query || "";
	const resultPhoto: any = await getSearchPhotos(query, 1);
	// console.log(resPhoto?.total);

	// const resPexels: any = await getSearchPexels(query, 1);
	// const resPixabay: any = await getSearchPixabay(query, 1);
	// const photos: IPhoto[] = [...resPexels.photos, ...resPixabay.hits];

	return (
		<div>
			<SearchComponent q={decodeURIComponent(query)} result={resultPhoto} />
		</div>
	);
}
