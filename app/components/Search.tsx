"use client";

import React, { useEffect, useState } from "react";
import { IPexelsResult, IPhoto, IPixabayResult } from "@lib/interface";
import PhotoGrid from "./PhotoGrid";
import Image from "next/image";
import { keywords } from "@lib/keyword";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const AnimationScript = dynamic(() => import("@components/AnimationScript"), { ssr: false });

export const revalidate = 3600;

export default function SearchComponent({
	q,
	defaultPhotos,
}: {
	q?: string;
	defaultPhotos?: IPhoto[];
}) {
	const [search, setSearch] = useState(q);
	const [pexelsResult, setPexelsResult] = useState<IPexelsResult>();
	const [pixabayResult, setPixabayResult] = useState<IPixabayResult>();

	const [photos, setPhotos] = useState<IPhoto[]>(defaultPhotos || []);
	const [keyword, setKeyword] = useState("");
	const [loading, setLoading] = useState(false);
	const [total, setTotal] = useState(0);

	const router = useRouter();

	const handleClickKeyword = (keyword: string) => {
		// setQuery(keyword);
		setKeyword(keyword);
	};

	const handleSumbit = (event: any) => {
		event.preventDefault();
		router.push(`/search/${encodeURIComponent(search || "")}`);
		handleSearch(search);
	};

	const handleSearch = async (query?: string) => {
		//console.log("Handle Search " + query);
		if (!query || query.length < 2) return;

		setLoading(true);
		setPhotos([]);
		setTotal(0);

		setSearch(query);

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

	// useEffect(() => {
	// 	if (q) {
	// 		handleSearch(q);
	// 	}
	// }, [q]);

	useEffect(() => {
		if (photos && photos.length > 0) {
			localStorage.setItem("jsonPhotos", JSON.stringify(photos));
		}
	}, [photos]);

	useEffect(() => {
		if (!pexelsResult?.photos || !pixabayResult?.hits) {
			return;
		}
		//if (photos.indexOf(pexelsResult?.photos[0], 0) >= 0) return;

		setPhotos([...pexelsResult.photos, ...pixabayResult.hits]);
		setTotal(pexelsResult.total_results + pixabayResult.total);
	}, [pexelsResult, pixabayResult]);

	useEffect(() => {
		handleSearch(keyword);
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
					// action={`/search?q=photo${search}`}
					onSubmit={handleSumbit}
					className="search-form relative z-20 flex flex-col w-full max-w-[560px] gap-2 justify-center h-12"
				>
					<div className="field-row flex gap-2">
						<div className="form-control flex-1">
							<input
								type="text"
								id="search"
								value={search || ""}
								onChange={(e) => setSearch(e.target.value)}
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

			<div className="search-results w-full mx-auto  max-w-[2400px] mb-20">
				{loading && (
					<div className="loading w-full mx-auto flex items-center justify-center min-h-96 min-w-96 ">
						<span className="loader"></span>
					</div>
				)}
				{photos.length > 0 && (
					<>
						<div className="result-static min-h-14 lg:min-h-20 flex items-center">
							<h3 className="text-xl lg:text-2xl text-gray-600 w-full text-center font-semibold">
								{total > 0 ? (
									<span className="">
										Results for {`"${search}" :`} {photos.length}
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

			<AnimationScript />
		</div>
	);
}
