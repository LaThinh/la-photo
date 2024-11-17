"use client";

import { IPhoto } from "@/app/libs/interface";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { LuDownloadCloud } from "react-icons/lu";
import PhotoTags from "./PhotoTags";
import { FaCameraRetro } from "react-icons/fa";
import Photographer from "./Photographer";
import { GrNext, GrPrevious } from "react-icons/gr";
import PhotoBrand from "./PhotoBrand";
import { useFavoriteStore } from "@/app/stores/favoriteStore";
import { useSearchParams } from "next/navigation";
import PhotoFavorite from "@components/photo/PhotoFavorite";
import { IoPause, IoPlay } from "react-icons/io5";

// import dynamic from "next/dynamic";

// const PhotoFavorite = dynamic(() => import("@components/photo/PhotoFavorite"), {
// 	ssr: false,
// });

export default function PhotoDetails({ photoId }: { photoId: string }) {
	const searchParams = useSearchParams();
	const paramFavorite = searchParams.get("isFavorite");

	const { favoriteImages } = useFavoriteStore();
	const [photo, setPhoto] = useState<IPhoto>();
	const [jsonData, setJsonData] = useState<IPhoto[]>([]);
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(false);

	const nextRef = useRef<HTMLButtonElement>(null);
	const prevRef = useRef<HTMLButtonElement>(null);

	const [isAutoplaying, setIsAutoplaying] = useState(false);

	useEffect(() => {
		if (paramFavorite != null) {
			console.log("Setting favorite");
			setJsonData(favoriteImages);
		} else {
			const storedData = localStorage.getItem("jsonPhotos");
			if (storedData) {
				console.log("Setting Local");
				setJsonData(JSON.parse(storedData));
			}
		}

		const handleKeyDown = (event: any) => {
			if (event.key === "ArrowRight" || event.key === "ArrowDown") {
				if (nextRef && nextRef.current) nextRef.current.click();
			} else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
				if (prevRef && prevRef.current) prevRef.current.click();
			}

			if (event.key === "p") {
				setIsAutoplaying(!isAutoplaying);
			}
		};

		const handleTouch = (event: TouchEvent) => {
			const deltaX = event.changedTouches[0].clientX - event.touches[0].clientX;

			if (deltaX > 10) {
				// Right swipe
				if (nextRef && nextRef.current) nextRef.current.click();
			} else if (deltaX < -10) {
				// Left swipe
				if (prevRef && prevRef.current) prevRef.current.click();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("touchmove", handleTouch);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("touchmove", handleTouch);
		};
	}, []);

	useEffect(() => {
		if (!jsonData || jsonData.length === 0) return;

		const photoIndex = jsonData.findIndex((p) => p.id.toString() === photoId);

		if (photoIndex >= 0) {
			setIndex(photoIndex);
		}
	}, [jsonData, photoId]);

	useEffect(() => {
		setLoading(false);
	}, [index]);

	useEffect(() => {
		setPhoto(jsonData[index]);
	}, [index, jsonData]);

	const handleClickNext = () => {
		setLoading(true);
		// console.log("handle Next" + index);
		let newIndex = index + 1;
		if (newIndex >= jsonData.length) {
			newIndex = 0;
		}
		setIndex(newIndex);
	};

	const handleClickPrev = () => {
		// console.log("handle Prev" + index);
		setLoading(true);

		let newIndex = index - 1;
		if (newIndex < 0) {
			newIndex = jsonData.length - 1;
		}
		setIndex(newIndex);
	};

	useEffect(() => {
		if (isAutoplaying) nextRef?.current?.click();

		const intervalId = setInterval(() => {
			if (isAutoplaying && nextRef) {
				nextRef?.current?.click();
			}
		}, 5000);

		return () => clearInterval(intervalId);
	}, [isAutoplaying]);

	return (
		<div className="photo-detail ">
			{photo && (
				<div className="photo-box flex gap-0 flex-col lg:flex-row">
					<div className="photo-image relative flex-1 flex justify-center lg:min-h-[50vh] 3xl:min-h-[70vh] bg-slate-900">
						<Image
							width={photo?.width || photo?.imageWidth || "700"}
							height={photo?.height || photo?.imageHeight || "700"}
							alt={photo?.alt || photo?.tags || "Photo Image"}
							src={
								photo?.src?.large2x ||
								(paramFavorite == null
									? photo?.largeImageURL
									: photo?.previewURL?.replace("_150", "_1280")) ||
								"/default.png"
							}
							className="bg-slate-300 min-h-36 object-cover h-full w-auto max-h-[70vh] lg:max-h-[98vh]"
						/>

						<Button
							className="prev p-0 rounded-full hover:bg-primary w-10 h-10 absolute left-2 top-1/2 z-20"
							variant={"ghost"}
							ref={prevRef}
							onClick={handleClickPrev}
						>
							<GrPrevious className="!w-6 !h-6 text-gray-300 drop-shadow-2xl !p-0" />
						</Button>

						<Button
							className="next p-0 rounded-full hover:bg-primary w-10 h-10 absolute right-2 top-1/2 z-20"
							variant={"ghost"}
							ref={nextRef}
							onClick={handleClickNext}
						>
							<GrNext className="!w-6 !h-6 text-gray-300 drop-shadow-2xl !p-0" />
						</Button>

						<div className="absolute z-50 bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
							<Button
								className="autoplay p-0 rounded-full hover:bg-primary min-w-12 px-4 h-10 
								bg-gray-700/30 text-white/70 hover:text-white"
								variant={"ghost"}
								onClick={() => setIsAutoplaying(!isAutoplaying)}
							>
								{isAutoplaying ? (
									<IoPause className="!w-6 !h-6 text-white drop-shadow-2xl !p-0" />
								) : (
									<IoPlay className="!w-6 !h-6 text-white drop-shadow-2xl !p-0" />
								)}
								<span className="">Autoplay</span>
							</Button>
						</div>
					</div>

					<div className="photo-info w-full lg:w-1/3 lg:max-w-[540px] flex flex-col gap-2 md:gap-3 lg:gap-5 p-3 lg:p-5">
						<h2 className="photo-title font-semibold font-Oswald text-xl lg:mt-4 lg:text-2xl xl:text-3xl capitalize">
							{photo?.alt || photo?.tags || "Photo Title"}
						</h2>

						<div className="photo-container flex-1 flex flex-col gap-3">
							<div className="photographer relative flex items-center gap-2 lg:gap-3">
								<div className="avatar w-8 lg:w-12 flex items-center justify-center aspect-square rounded-full">
									{photo?.userImageURL ? (
										<Image
											src={photo?.userImageURL}
											alt={photo?.user || "User Photo"}
											width="96"
											height="96"
											className="object-cover  aspect-square rounded-full"
										/>
									) : (
										<FaCameraRetro className="w-8 h-8" />
									)}
								</div>
								<Photographer
									photo={photo}
									showLink
									className="text-lg lg:text-xl xl:text-2xl"
								/>

								{!loading && (
									<PhotoFavorite
										photo={jsonData[index]}
										className="absolute right-0 top-0 z-20 bg-pink-500/10 [&>svg]:!text-pink-600
										 xl:w-12 xl:h-12 -xl:top-2
										"
									/>
								)}
							</div>

							{photo?.tags && <PhotoTags tags={photo?.tags} />}

							{photo?.views && (
								<div className="photo-static flex gap-4 lg:flex-col lg:mt-5 text-gray-700">
									{photo?.likes && (
										<div className="photo-likes ">Likes: {photo.likes}</div>
									)}

									{photo?.views && (
										<div className="photo-view ">Views: {photo.views}</div>
									)}

									{photo?.downloads && (
										<div className="photo-downloads ">
											Download: {photo.downloads}
										</div>
									)}
								</div>
							)}
						</div>

						<div className="photo-download flex justify-between items-center">
							<PhotoBrand photo={photo} />
							<Button asChild>
								<Link
									className="download bg-green-700 flex gap-3 !rounded-full text-xl !h-11 px-5"
									target="_blank"
									title="Download Image"
									download
									href={
										photo.src?.original ||
										photo?.largeImageURL + "?attachment=" ||
										"/"
									}
								>
									<LuDownloadCloud className="!w-5 !h-5" />
									<span>Download</span>
								</Link>
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
