import React from "react";
import { IPexelPhoto } from "@lib/interface";
import Image from "next/image";

export default function PhotoCard({ photo }: { photo: IPexelPhoto }) {
	//const source: ImageSource = photo?.url ? ImageSource.Pexels : ImageSource.Pixabay;

	return (
		<div className="photo-card group relative overflow-hidden">
			<div className="card-body relative">
				<Image
					width={photo.width}
					height={photo.height}
					alt={photo.alt || "Photo Image"}
					src={photo?.src?.large || "/default.png"}
				/>
			</div>
			<div className="card-footer transition-all absolute left-0 right-0 -bottom-20 group-hover:bottom-0">
				<div className="h-12 flex items-center justify-between bg-slate-200/80 backdrop-blur-sm px-2">
					<strong>{photo.photographer}</strong>

					<div
						className="color w-8 h-8 rounded-full"
						style={{ backgroundColor: photo.avg_color }}
					></div>
				</div>
			</div>
		</div>
	);
}
