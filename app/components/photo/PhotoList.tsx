import React from "react";
import { IPhoto } from "@/app/libs/interface";
import PhotoCard from "./PhotoCard";

export default function PhotoList({ photos }: { photos?: IPhoto[] }) {
	// console.log(photos);
	return (
		<div
			className="photo-grid md:px-5 columns-2 gap-1 [&>div]:mb-1 md:columns-3 lg:gap-3 [&>div]:lg:mb-3 lg:columns-4
		2xl:columns-5 2xl:gap-4 [&>div]:2xl:mb-4 3xl:columns-6"
		>
			{photos &&
				photos.length > 0 &&
				photos.map((photo, index) => <PhotoCard key={index} photo={photo} />)}
		</div>
	);
}
