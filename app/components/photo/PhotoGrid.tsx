import React from "react";
import { IPhoto } from "@/app/libs/interface";
import PhotoCard from "@components/photo/PhotoCard";

// import dynamic from "next/dynamic";
// const AnimationScript = dynamic(() => import("@components/AnimationScript"), { ssr: false });

export default function PhotoGrid({
	photos,
	isFavorite,
}: {
	photos: IPhoto[];
	isFavorite?: boolean;
}) {
	// console.log(photos);
	return (
		<>
			<div
				className="photo-grid px-3 grid gap-2 lg:gap-3 grid-cols-3 sm:grid-cols-6 
			lg:grid-cols-9 2xl:grid-cols-12 2xl:gap-4"
			>
				{/* <div className="photo-grid px-3 grid gap-2 lg:gap-x-4 lg:gap-y-3 grid-cols-[minmax(0, 18fr)]"> */}
				{photos.length > 0 &&
					photos.map((photo, index) => (
						<PhotoCard key={index} photo={photo} isFavorite={isFavorite} />
					))}
			</div>

			{/* <AnimationScript /> */}
		</>
	);
}
