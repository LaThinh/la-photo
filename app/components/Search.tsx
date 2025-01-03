"use client";

import React, { useEffect, useState } from "react";
import { IPhoto, ISearchResult } from "@/app/libs/interface";

import Image from "next/image";
import { keywords } from "@/app/libs/keyword";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import PhotoGrid from "@components/photo/PhotoGrid";
import { Button } from "@/components/ui/button";
import Loading from "./Loading";
import { CiGrid2V, CiGrid42 } from "react-icons/ci";
import PhotoList from "./photo/PhotoList";
const AnimationScript = dynamic(() => import("@components/AnimationScript"), { ssr: false });

export const revalidate = 3600;

export default function Search({ q, result }: { q?: string; result?: ISearchResult }) {
	const [search, setSearch] = useState(q || "");
	//const [pexelsResult, setPexelsResult] = useState<IPexelsResult>();
	//const [pixabayResult, setPixabayResult] = useState<IPixabayResult>();

	const [photos, setPhotos] = useState<IPhoto[]>(result?.photos || []);
	const [loading, setLoading] = useState(true);
	const [gridView, setGridView] = useState("list");
	// const [total, setTotal] = useState(result?.total || 0);

	const router = useRouter();

	const handleClickKeyword = (keyword: string) => {
		router.push(`/search/${encodeURIComponent(keyword || "")}`);
	};

	const handleSumbit = (event: any) => {
		event.preventDefault();
		setPhotos([]);
		router.push(`/search/${encodeURIComponent(search || "")}`);
		// handleSearch(search);
	};

	const handleChangeGridView = (view: string) => {
		setGridView(view);
	};

	// const handleSearch = async (query?: string) => {
	// 	//console.log("Handle Search " + query);
	// 	if (!query || query.length < 2) return;

	// 	setLoading(true);
	// 	setPhotos([]);
	// 	setTotal(0);

	// 	setSearch(query);

	// 	const resPexels = await fetch("/api/pexels/search", {
	// 		method: "POST",
	// 		body: JSON.stringify({ query }),
	// 		next: { revalidate: 3600 },
	// 	})
	// 		.then((r) => r.json())
	// 		.finally(() => setLoading(false));

	// 	const resPixabay = await fetch("/api/pixabay/search", {
	// 		method: "POST",
	// 		body: JSON.stringify({ query }),
	// 		next: { revalidate: 3600 },
	// 	})
	// 		.then((r) => r.json())
	// 		.finally(() => setLoading(false));

	// 	setPexelsResult(resPexels);
	// 	setPixabayResult(resPixabay);
	// 	setLoading(false);
	// };

	useEffect(() => {
		if (photos && photos.length > 0) {
			localStorage.setItem("jsonPhotos", JSON.stringify(photos));
		}
		setLoading(false);
	}, [photos]);

	// useEffect(() => {
	// 	if (!pexelsResult?.photos || !pixabayResult?.hits) {
	// 		return;
	// 	}
	// 	//if (photos.indexOf(pexelsResult?.photos[0], 0) >= 0) return;

	// 	setPhotos([...pexelsResult.photos, ...pixabayResult.hits]);
	// 	setTotal(pexelsResult.total_results + pixabayResult.total);
	// }, [pexelsResult, pixabayResult]);

	// useEffect(() => {
	// 	handleSearch(keyword);
	// }, [keyword]);

	return (
		<div className="search-page w-full">
			<div className="search-area relative w-full min-h-72 aspect-[21/3] flex flex-col items-center p-5 justify-center bg-slate-200">
				<div
					className="search-bg absolute left-1/2 w-full max-w-[2400px] -translate-x-1/2 top-0 bottom-0 z-0 
				bg-yellow-500 overflow-hidden  flex items-center"
				>
					{photos.length > 0 && (
						<>
							<Image
								src={
									photos[0].src?.landscape ||
									photos[0].webformatURL ||
									"/default.png"
								}
								width="3000"
								height="300"
								alt=""
								priority
								className="object-cover min-h-72 absolute z-10"
							/>
							<div className="background-overlay absolute z-20 bg-gray-900/50 top-0 left-0 right-0 bottom-0"></div>
						</>
					)}
				</div>
				<form
					// action={`/search?q=photo${search}`}
					onSubmit={handleSumbit}
					className="search-form relative  z-20 flex flex-col w-full max-w-[560px] gap-2 justify-center h-12"
				>
					<div className="field-row flex gap-0">
						<div className="form-control flex-1">
							<input
								type="text"
								id="search"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="What image are you looking for?"
								className="border bg-white w-full border-1 rounded-l-full rounded-r-none
								text-lg lg:text-xl h-12 px-5"
							/>
						</div>
						<Button
							type="submit"
							className="btn btn-primary h-full rounded-r-full min-w-32 text-xl hover:bg-green-700"
						>
							<span>Search</span>
						</Button>
					</div>

					<div className="field-row keywords flex gap-2 gap-y-1 flex-wrap text-white text-xs">
						{keywords.map((keyword, index) => (
							<div
								key={index}
								title={keyword}
								className="keyword cursor-pointer hover:underline text-nowrap"
								onClick={() => handleClickKeyword(keyword)}
							>
								{keyword}
							</div>
						))}
					</div>
				</form>
			</div>

			{loading && <Loading loadingText="Searching Photo" />}
			{!loading && photos.length > 0 && (
				<div className="search-results w-full mx-auto flex flex-col justify-center max-w-[2400px] mb-20">
					<div className="result-toolbar px-3 lg:px-5 min-h-14 lg:min-h-20 flex items-center justify-between">
						<h3 className="result static text-xl lg:text-2xl text-gray-600 w-full">
							{q && q.length > 0 ? (
								<span className="">
									Results for {`"${q}" :`} {photos.length}
									{"/"}
									{result?.total} Items
								</span>
							) : (
								"Welcome to La Photos"
							)}
						</h3>
						<div className="result-view flex items-center gap-2">
							<CiGrid2V
								className={`grid-view h-8 w-8 ${
									gridView === "list" ? "text-primary" : "cursor-pointer"
								}`}
								onClick={() => handleChangeGridView("list")}
							/>
							<CiGrid42
								className={`grid-view h-8 w-8 ${
									gridView === "grid" ? "text-primary" : "cursor-pointer"
								}`}
								onClick={() => handleChangeGridView("grid")}
							/>
						</div>
					</div>

					<div className="result-grid ">
						{photos &&
							photos.length > 0 &&
							(gridView == "grid" ? (
								<PhotoGrid photos={photos} />
							) : (
								<PhotoList photos={photos} />
							))}
					</div>
				</div>
			)}

			<AnimationScript />
		</div>
	);
}
