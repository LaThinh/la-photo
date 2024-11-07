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

export default function PhotoDetails({ photoId }: { photoId: string }) {
	const [photo, setPhoto] = useState<IPhoto>();
	const [jsonData, setJsonData] = useState<IPhoto[]>([]);
	const [index, setIndex] = useState(0);

	const nextRef = useRef<HTMLButtonElement>(null);
	const prevRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const photoIndex = jsonData.findIndex((p) => p.id.toString() === photoId);

		if (photoIndex >= 0) {
			setIndex(photoIndex);
		}
	}, [jsonData, photoId]);

	useEffect(() => {
		setPhoto(jsonData[index]);
	}, [index, jsonData]);

	const handleClickNext = () => {
		// console.log("handle Next" + index);
		let newIndex = index + 1;
		if (newIndex >= jsonData.length) {
			newIndex = 0;
		}
		setIndex(newIndex);
	};

	const handleClickPrev = () => {
		// console.log("handle Prev" + index);
		let newIndex = index - 1;
		if (newIndex < 0) {
			newIndex = jsonData.length - 1;
		}
		setIndex(newIndex);
	};

	useEffect(() => {
		const storedData = localStorage.getItem("jsonPhotos");
		if (storedData) {
			setJsonData(JSON.parse(storedData));
		}

		const handleKeyDown = (event: any) => {
			if (event.key === "ArrowRight" || event.key === "ArrowDown") {
				if (nextRef && nextRef.current) nextRef.current.click();
			} else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
				if (prevRef && prevRef.current) prevRef.current.click();
			}
		};

		const handleTouch = (event: TouchEvent) => {
			const deltaX = event.changedTouches[0].clientX - event.touches[0].clientX;

			if (deltaX > 30) {
				// Right swipe
				if (nextRef && nextRef.current) nextRef.current.click();
			} else if (deltaX < -30) {
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

	return (
		<div className="photo-detail ">
			{photo && (
				<div className="photo-box flex gap-0 flex-col lg:flex-row">
					<div className="photo-image relative flex-1 flex justify-center lg:min-h-[50vh] bg-slate-900">
						<Image
							width={photo?.width || photo?.imageWidth || "700"}
							height={photo?.height || photo?.imageHeight || "700"}
							alt={photo?.alt || photo?.tags || "Photo Image"}
							src={photo?.src?.large2x || photo?.largeImageURL || "/default.png"}
							className="bg-slate-300 min-h-36 object-cover h-full w-auto max-h-[70vh] lg:max-h-[98vh]"
						/>

						<Button
							className="prev p-0 rounded-full hover:bg-primary w-12 h-12 absolute left-2 top-1/2 z-20"
							variant={"ghost"}
							ref={prevRef}
							onClick={handleClickPrev}
						>
							<GrPrevious className="!w-8 !h-8 text-gray-300 drop-shadow-2xl !p-0" />
						</Button>

						<Button
							className="next p-0 rounded-full hover:bg-primary w-12 h-12 absolute right-2 top-1/2 z-20"
							variant={"ghost"}
							ref={nextRef}
							onClick={handleClickNext}
						>
							<GrNext className="!w-8 !h-8 text-gray-300 drop-shadow-2xl !p-0" />
						</Button>
					</div>

					<div className="photo-info w-full lg:w-1/3 lg:max-w-[540px] flex flex-col gap-5 p-3 lg:p-5">
						<h2 className="photo-title font-semibold font-Oswald text-xl lg:mt-4 lg:text-2xl xl:text-3xl capitalize">
							{photo?.alt || photo?.tags || "Photo Title"}
						</h2>

						<div className="photo-container flex-1 flex flex-col gap-3">
							<div className="photographer flex items-center gap-2 lg:gap-3">
								<div className="avatar w-12 h-12 flex items-center justify-center aspect-square rounded-full">
									{photo?.userImageURL ? (
										<Image
											src={photo?.userImageURL}
											alt={photo?.user || "User Photo"}
											width="96"
											height="96"
											className="object-cover rounded-full"
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
							</div>

							{photo?.tags && <PhotoTags tags={photo?.tags} />}
						</div>

						<div className="photo-download flex justify-between">
							<PhotoBrand photo={photo} />
							<Button asChild>
								<Link
									className="download bg-green-700 flex gap-3 !rounded-full text-xl !h-12 px-7"
									target="_blank"
									title="Download Image"
									download
									href={photo?.largeImageURL || photo.src?.original || "/"}
								>
									<LuDownloadCloud className="!w-7 !h-7" />
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
