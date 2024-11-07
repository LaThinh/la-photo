"use client";

import React, { useEffect, useRef, useState } from "react";
import { IPhoto, ISearchResult } from "@/app/libs/interface";

import dynamic from "next/dynamic";
import PhotoGrid from "@components/photo/PhotoGrid";
import Loading from "./Loading";
import { CiGrid2V, CiGrid42 } from "react-icons/ci";
import PhotoList from "./photo/PhotoList";
import FormSearch from "./FormSearch";

const AnimationScript = dynamic(() => import("@components/AnimationScript"), { ssr: false });
const PhotoBanner = dynamic(() => import("@components/photo/PhotoBanner"), {
	ssr: false,
});

export const revalidate = 3600;

export default function SearchComponent({ q, result }: { q?: string; result?: ISearchResult }) {
	// const [search, setSearch] = useState(q || "");
	const [photos, setPhotos] = useState<IPhoto[]>(result?.photos || []);
	const [loading, setLoading] = useState(true);
	const [gridView, setGridView] = useState("list");
	const formRef = useRef(null);

	const handleChangeGridView = (view: string) => {
		setGridView(view);
	};

	useEffect(() => {
		if (photos.length < 0 && result && result?.photos.length > 0) {
			setPhotos(result.photos);
			setLoading(false);
		}
	}, [result]);

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
