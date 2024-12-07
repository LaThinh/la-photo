"use client";

import { EPhotoOrientation, IPhoto } from "@libs/interface";
import { extractDate, getPhotoOrientation } from "@libs/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Photographer from "./Photographer";

export default function PhotoBanner({
	photos,
	className,
}: {
	photos: IPhoto[];
	className?: string;
}) {
	const randomIndex = () => {
		if (!photos || photos.length < 1) return 0;
		const length = photos.length - 1;

		const maxLength = Math.min(length, 100);
		return Math.floor(Math.random() * maxLength);
	};

	const [photo, setPhoto] = useState<IPhoto>();
	const [index, setIndex] = useState(randomIndex());

	useEffect(() => {
		const photoIndex = photos[index];
		if (getPhotoOrientation(photoIndex) != EPhotoOrientation.Landscape) {
			const newIndex = randomIndex();
			setIndex(newIndex);
		} else {
			setPhoto(photoIndex);
		}
	}, [index]);

	if (!photo) return <></>;

	return (
		<div
			className={`search-bg bg-yellow-500 overflow-hidden flex items-center ${className}`}
			data-index={index}
		>
			<Image
				src={
					photo.src?.landscape ||
					photo?.previewURL?.replace("_150", "_1280") ||
					photo?.urls?.full ||
					"/default.png"
				}
				width="3000"
				height="500"
				alt={photo?.alt || photo?.tags || "Banner"}
				priority
				className="object-cover min-h-80 z-10"
			/>
			<div className="background-overlay absolute z-10 bg-gray-900/50 top-0 left-0 right-0 bottom-0"></div>
			<div
				className="background-info absolute z-20 left-5 right-5 bottom-2 flex justify-between items-center text-white"
				id={`background-index-${index}`}
			>
				<div className="photo-date date text-xs text-gray-200">
					{photo?.previewURL && <div>Date: {extractDate(photo.previewURL)}</div>}
					{photo?.created_at && <div>Date: {photo.created_at} </div>}
				</div>
				<div className="photographer-info flex gap-1">
					{`Photo by:`}
					<Photographer
						photo={photo}
						showLink
						className="hover:text-white hover:underline"
					/>
				</div>
			</div>
		</div>
	);
}
