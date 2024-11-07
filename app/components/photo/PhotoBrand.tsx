import { ImageSource, IPhoto } from "@libs/interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PhotoBrand({ photo }: { photo: IPhoto }) {
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
		<div className="photo-brand">
			<Link
				href={photo?.url || photo?.pageURL || "/"}
				title={`View in ${brandName}`}
				target="_blank"
				className="brand-icon flex gap-2 lg:gap-3 items-center"
			>
				<Image
					src={brandLogo}
					width={36}
					height={36}
					alt={brandName}
					className="rounded-full aspect-square w-8 lg:w-9 xl:w-10"
				/>
				<div className="name text-lg lg:text-2xl hover:text-primary">{brandName}</div>
			</Link>
		</div>
	);
}
