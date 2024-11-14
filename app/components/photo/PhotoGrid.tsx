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
			<div className="photo-grid px-3 grid gap-2 lg:gap-x-4 lg:gap-y-3 grid-cols-3 md:grid-cols-6 lg:grid-cols-9 2xl:grid-cols-12 2xl:gap-x-6 2xl:gap-y-5">
				{photos.length > 0 &&
					photos.map((photo, index) => (
						<PhotoCard key={index} photo={photo} isFavorite={isFavorite} />
					))}
			</div>

			{/* <AnimationScript /> */}
		</>
	);
}
