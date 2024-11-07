"use client";

import { IPhoto } from "@libs/interface";
import Image from "next/image";
import React from "react";

export default function PhotoBanner({
	photos,
	className,
}: {
	photos: IPhoto[];
	className?: string;
}) {
	if (!photos || photos.length < 2) return null;

	const randomIndex = (length: number) => {
		const maxLength = Math.min(length, 50);
		return Math.floor(Math.random() * maxLength);
	};

	const photoIndex = randomIndex(photos.length - 1);

	const photo: IPhoto = photos[photoIndex];

	return (
		<div className={`search-bg bg-yellow-500 overflow-hidden  flex items-center ${className}`}>
			<Image
				src={photo.src?.landscape || photo.webformatURL || "/default.png"}
				width="3000"
				height="500"
				alt={photo?.alt || photo?.tags || "Banner"}
				priority
				className="object-cover min-h-80 z-10"
			/>
			<div className="background-overlay absolute z-20 bg-gray-900/50 top-0 left-0 right-0 bottom-0"></div>
			<div
				className="background-info absolute z-20 right-5 bottom-2 text-white"
				id={`background-index-${photoIndex}`}
			>
				{`Photo by:`} {photo?.photographer || photo?.user || photoIndex}
			</div>
		</div>
	);
}
