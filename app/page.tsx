import SearchComponent from "./components/Search";

export default async function Home() {
	return (
		<div className="homepage flex flex-col gap-8 row-start-2 items-center sm:items-start">
			<SearchComponent />
		</div>
	);
}
