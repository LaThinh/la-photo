import React from "react";
import { IPhoto } from "@lib/interface";
import PhotoCard from "./PhotoCard";

export default function PhotoGrid({ photos }: { photos?: IPhoto[] }) {
	// console.log(photos);
	return (
		<div
			className="photo-grid md:px-5 columns-2 gap-1 [&>div]:mb-1 lg:columns-3 lg:gap-3 [&>div]:lg:mb-3
		2xl:columns-4 2xl:gap-4 [&>div]:2xl:mb-4 3xl:columns-5"
		>
			{photos &&
				photos.length > 0 &&
				photos.map((photo, index) => <PhotoCard key={index} photo={photo} />)}
		</div>
	);
}
