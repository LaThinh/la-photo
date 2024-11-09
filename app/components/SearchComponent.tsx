"use client";

import React, { useEffect, useRef, useState } from "react";
import { IPhoto, ISearchResult } from "@/app/libs/interface";

import dynamic from "next/dynamic";
import PhotoGrid from "@components/photo/PhotoGrid";
import Loading from "./Loading";
import { CiGrid2V, CiGrid42 } from "react-icons/ci";
import PhotoList from "./photo/PhotoList";
import FormSearch from "./FormSearch";
import { useSearchParams } from "next/navigation";
import { actionSearchPhoto } from "../action/searchPhoto";
import { Button } from "@/components/ui/button";

const AnimationScript = dynamic(() => import("@components/AnimationScript"), { ssr: false });
const PhotoBanner = dynamic(() => import("@components/photo/PhotoBanner"), {
	ssr: false,
});

export const revalidate = 3600;

export default function SearchComponent({ q, result }: { q?: string; result?: ISearchResult }) {
	// const [search, setSearch] = useState(q || "");
	const searchParams = useSearchParams();
	const [page, setPage] = useState(1);

	const [photos, setPhotos] = useState<IPhoto[]>(result?.photos || []);
	const [loading, setLoading] = useState(true);
	const [gridView, setGridView] = useState("list");
	const formRef = useRef(null);

	const [loadMore, setLoadMore] = useState(false);

	const handleChangeGridView = (view: string) => {
		setGridView(view);
	};

	const getResultPage = async (page: number) => {
		setLoadMore(true);
		const result = await actionSearchPhoto(q || "", page);
		const newPhotos = result.photos;

		setPhotos([...photos, ...newPhotos]);
		setLoadMore(false);
	};

	const handleLoadMore = () => {
		setPage(page + 1);
	};

	useEffect(() => {
		if (page > 1) {
			console.log("use Effect Page " + page);
			getResultPage(page);
		}
	}, [page]);

	useEffect(() => {
		if (photos.length < 0 && result && result?.photos.length > 0) {
			setPhotos(result.photos);
			setLoading(false);
		}
		const pageParam = searchParams.get("page");
		if (pageParam) setPage(Number(pageParam));
	}, [result]);

	useEffect(() => {
		const pageParam = searchParams.get("page");
		if (pageParam) {
			const currentPage = Number(pageParam);
			if (q && currentPage > 1) {
				getResultPage(currentPage);
			}
		}
	}, [searchParams]);

	useEffect(() => {
		if (photos && photos.length > 0) {
			localStorage.setItem("jsonPhotos", JSON.stringify(photos));
		}
		setLoading(false);
	}, [photos]);

	useEffect(() => {
		const headerSearch = document.querySelector("#header-search");
		const observer = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (entry.isIntersecting) {
				// Element is in viewport
				headerSearch?.classList.add("hidden");
			} else {
				// Element is not in viewport
				headerSearch?.classList.remove("hidden");
			}
		});

		if (formRef.current) {
			headerSearch?.classList.add("hidden");

			observer.observe(formRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, [formRef]);

	return (
		<div className="search-page w-full">
			<div className="search-area relative w-full min-h-72 lg:min-h-80 aspect-[21/4] flex flex-col items-center p-5 justify-center bg-slate-200">
				<div
					className="search-bg absolute left-1/2 w-full max-w-[2700px] -translate-x-1/2 top-0 bottom-0 z-0 
					bg-yellow-500 overflow-hidden flex items-center"
					suppressHydrationWarning
				>
					<PhotoBanner
						photos={photos}
						className="w-full absolute left-1/2 -translate-x-1/2 top-0 bottom-0 z-0 "
					/>
				</div>
				<FormSearch query={q} />
			</div>

			{loading && <Loading loadingText={`Searching Photo ${q}`} />}
			{!loading && photos.length > 0 && (
				<div className="search-results w-full mx-auto flex flex-col justify-center max-w-[2400px] mb-20">
					<div className="result-toolbar sticky top-14 lg:top-16 z-20 bg-white/70 backdrop-blur-lg px-3 lg:px-5 min-h-12 lg:min-h-16 flex items-center justify-between">
						<h3 className="result static text:base md:text-xl lg:text-2xl text-gray-600 w-full">
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
								<>
									<PhotoGrid photos={photos} />

									<div className="load-more flex m-auto justify-center mt-10 items-center">
										<Button
											className="load-more rounded-full px-10 py-3 text-lg lg:text-xl lg:py-5"
											onClick={handleLoadMore}
											disabled={loadMore}
										>
											{!loadMore
												? `Loadmore page ${page + 1}`
												: `Loading page ${page} ...`}
										</Button>
									</div>
								</>
							) : (
								<PhotoList photos={photos} />
							))}
					</div>
				</div>
			)}

			{!loading && photos.length == 0 && (
				<div className="no-results container min-h-72 flex justify-center items-center">
					<h4 className="text-xl">No Results for {`"${q}"`}</h4>
				</div>
			)}

			<AnimationScript />
		</div>
	);
}
