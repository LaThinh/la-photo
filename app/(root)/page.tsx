import { getSearchPhotos } from "../services/photoSearch";
import SearchComponent from "@components/SearchComponent";

export default async function Home() {
	const query = "Landscape Paris";
	// const client = createClient(process.env.PEXELS_API_KEY || "");
	// const response: any = await client.photos.search({ query, per_page: 100 });
	// const photos: IPhoto[] = response?.photos || [];
	const result: any = await getSearchPhotos(query, 1);

	return (
		<div className="homepage flex flex-col gap-8 row-start-2 items-center sm:items-start">
			{/* <SearchComponent result={result} /> */}
			<SearchComponent result={result} />
		</div>
	);
}
