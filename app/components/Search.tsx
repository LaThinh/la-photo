"use client";

import React, { useEffect, useState } from "react";
import { IPexelsResult, IPhoto, IPixabayResult } from "@lib/interface";
import PhotoGrid from "./PhotoGrid";
import Image from "next/image";
import { keywords } from "../lib/keyword";

export const revalidate = 3600;

export default function SearchComponent({
	q,
	defaultPhotos,
}: {
	q?: string;
	defaultPhotos?: IPhoto[];
}) {
	const [query, setQuery] = useState(q);
	const [pexelsResult, setPexelsResult] = useState<IPexelsResult>();
	const [pixabayResult, setPixabayResult] = useState<IPixabayResult>();

	const [photos, setPhotos] = useState<IPhoto[]>(defaultPhotos || []);
	const [keyword, setKeyword] = useState("");
	const [loading, setLoading] = useState(false);
	const [total, setTotal] = useState(0);

	// useEffect(() => {
	// 	const getCurated = async () => {
	// 		const resCurated = await fetch("/api/pexels/curated", {
	// 			method: "GET",
	// 			next: { revalidate: 3600, tags: ["curated"] },
	// 		})
	// 			.then((r) => r.json())
	// 			.finally(() => setLoading(false));

	// 		setPhotos(resCurated.photos);
	// 	};
	// 	getCurated();
	// }, []);

	const handleClickKeyword = (keyword: string) => {
		setQuery(keyword);
		setKeyword(keyword);
	};

	const handleSearch = async (event?: any) => {
		//console.log("Handle Search " + query);
		if (!query || query.length < 2) return;

		if (event) {
			event.preventDefault();
		}
		setLoading(true);
		setPhotos([]);
		setTotal(0);

		const resPexels = await fetch("/api/pexels/search", {
			method: "POST",
			body: JSON.stringify({ query }),
			next: { revalidate: 3600 },
		})
			.then((r) => r.json())
			.finally(() => setLoading(false));

		const resPixabay = await fetch("/api/pixabay/search", {
			method: "POST",
			body: JSON.stringify({ query }),
			next: { revalidate: 3600 },
		})
			.then((r) => r.json())
			.finally(() => setLoading(false));

		setPexelsResult(resPexels);
		setPixabayResult(resPixabay);
		setLoading(false);
	};

	useEffect(() => {
		if (!pexelsResult?.photos || !pixabayResult?.hits) {
			return;
		}
		//if (photos.indexOf(pexelsResult?.photos[0], 0) >= 0) return;

		setPhotos([...pexelsResult.photos, ...pixabayResult.hits]);
		setTotal(pexelsResult.total_results + pixabayResult.total);
	}, [pexelsResult, pixabayResult]);

	useEffect(() => {
		if (keyword != "") {
			setTimeout(function () {
				handleSearch();
			}, 2000);
		}
	}, [keyword]);

	return (
		<div className="search-page w-full">
			<div className="search-area relative w-full min-h-72 flex flex-col items-center p-5 justify-center bg-slate-200">
				<div
					className="search-bg absolute left-1/2 w-full max-w-[2400px] -translate-x-1/2 top-0 bottom-0 z-0 
				bg-yellow-500 overflow-hidden  flex items-center"
				>
					{photos.length > 0 && (
						<Image
							src={
								photos[0].src?.landscape || photos[0].webformatURL || "/default.png"
							}
							width="3000"
							height="300"
							alt=""
							priority
							className="object-cover min-h-72"
						/>
					)}
				</div>
				<form
					onSubmit={handleSearch}
					className="search-form relative z-20 flex flex-col w-full max-w-[560px] gap-2 justify-center h-12"
				>
					<div className="field-row flex gap-2">
						<div className="form-control flex-1">
							<input
								type="text"
								id="search"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								placeholder="What image are you looking for?"
								className="border bg-white w-full border-1 text-lg lg:text-xl rounded-xl h-12 px-3"
							/>
						</div>
						<button
							type="submit"
							className="btn btn-primary bg-green-600 text-white font-bold px-5 py-1 rounded-xl hover:opacity-90"
						>
							Search
						</button>
					</div>

					<div className="field-row keywords flex gap-2 gap-y-1 flex-wrap text-white text-xs">
						{keywords.map((keyword, index) => (
							<a
								key={index}
								className="keyword cursor-pointer hover:underline text-nowrap"
								onClick={() => handleClickKeyword(keyword)}
							>
								{keyword}
							</a>
						))}
					</div>
				</form>
			</div>

			<div className="search-results w-full mx-auto  max-w-[2400px] mb-20">
				{loading && (
					<div className="loading w-full mx-auto flex items-center justify-center min-h-96 min-w-96 ">
						<span className="loader"></span>
					</div>
				)}
				{photos.length > 0 && (
					<>
						<div className="result-static min-h-14 lg:min-h-20 flex items-center">
							<h3 className="text-lg lg:text-xl text-gray-500 w-full text-center font-semibold">
								{total > 0 ? (
									<span className="">
										Results for {`"${query}" :`} {photos.length}
										{"/"}
										{total} Items
									</span>
								) : (
									"Welcome to La Photos"
								)}
							</h3>
						</div>

						<div className="result-grid">
							{photos && photos.length > 0 && <PhotoGrid photos={photos} />}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
