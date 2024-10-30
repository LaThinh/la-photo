import React from "react";
import { ImageSource, IPhoto } from "@lib/interface";
import Image from "next/image";
import Link from "next/link";

export default function PhotoCard({ photo }: { photo: IPhoto }) {
	const source: ImageSource = photo?.url ? ImageSource.Pexels : ImageSource.Pixabay;

	let brandLogo = "";
	let brandName = "";

	switch (source) {
		case ImageSource.Pexels:
			brandLogo = "/icons/pexels-logo.svg";
			brandName = "Pexels";
			break;
		case ImageSource.Pixabay:
			brandLogo = "/icons/pixabay-logo-vector.svg";
			brandName = "Pixabay";
			break;
	}

	return (
		<div className="photo-card group relative overflow-hidden">
			<div className="card-body relative min-h-20 bg-gray-300">
				<Image
					width={photo?.width || photo?.imageWidth || "200"}
					height={photo?.height || photo?.imageHeight || "200"}
					alt={photo?.alt || photo?.tags || "Photo Image"}
					src={photo?.src?.large || photo?.webformatURL || "/default.png"}
				/>
				<div className="image-source absolute transition-all top-2 -left-16 group-hover:left-1 aspect-square">
					<Link
						href={photo?.url || photo?.pageURL || "/"}
						title={`View in ${brandName}`}
						target="_blank"
						className="brand-logo"
					>
						<Image
							src={brandLogo}
							width={36}
							height={36}
							alt={brandName}
							className="rounded-full"
						/>
						<div className="brand-name hover:underline">{brandName}</div>
					</Link>
				</div>
				{photo?.tags && (
					<div className="tags absolute -bottom-48 group-hover:bottom-12 text-white bg-slate-700/50 px-2 py-1">
						{photo.tags}
					</div>
				)}
			</div>
			<div className="card-footer transition-all absolute left-0 right-0 -bottom-20 group-hover:bottom-0">
				<div className="h-12 flex items-center justify-between bg-slate-300/70 backdrop-blur-sm px-2">
					<strong>{photo?.photographer || photo?.user}</strong>

					{photo?.avg_color && (
						<div
							className="color w-8 h-8 rounded-full"
							title={`Color: ${photo.avg_color}`}
							style={{ backgroundColor: photo.avg_color }}
						></div>
					)}
				</div>
			</div>
		</div>
	);
}
