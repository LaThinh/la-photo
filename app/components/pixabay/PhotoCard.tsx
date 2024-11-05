import React from "react";
import { IPixabayPhoto } from "@/app/libs/interface";
import Image from "next/image";

export default function PixabayPhotoCard({ photo }: { photo: IPixabayPhoto }) {
	return (
		<div className="photo-card group relative overflow-hidden">
			<div className="card-body relative">
				<Image
					width={photo.imageWidth}
					height={photo.imageHeight}
					alt={photo.tags}
					src={photo.webformatURL}
				/>
			</div>
			<div className="card-footer transition-all absolute left-0 right-0 -bottom-20 group-hover:bottom-0">
				<div className="h-12 flex items-center justify-between bg-slate-200/80 backdrop-blur-sm px-2">
					<strong>{photo.user}</strong>

					{/* <div
						className="color w-8 h-8 rounded-full"
						style={{ backgroundColor: photo.avg_color }}
					></div> */}
				</div>
			</div>
		</div>
	);
}
