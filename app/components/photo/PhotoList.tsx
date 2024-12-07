import React from "react";
import { IPhoto } from "@/app/libs/interface";
import PhotoCard from "./PhotoCard";

export default function PhotoList({ photos }: { photos?: IPhoto[] }) {
	// console.log(photos);
	return (
		<div
			className="photo-grid columns-2 gap-1 [&>div]:mb-1
			md:columns-3
			xl:columns-4 xl:px-2 xl:gap-2 [&>div]:xl:mb-2
			2xl:columns-5 2xl:gap-3 [&>div]:2xl:mb-3
			3xl:columns-6"
		>
			{photos &&
				photos.length > 0 &&
				photos.map((photo, index) => <PhotoCard key={index} photo={photo} />)}
		</div>
	);
}
