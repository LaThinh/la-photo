import React from "react";
import { ImageSource, IPhoto } from "@/app/libs/interface";
import Image from "next/image";
import Link from "next/link";
import { LuDownload } from "react-icons/lu";
import { getPhotoOrientation } from "@libs/utils";
import Photographer from "./Photographer";

import dynamic from "next/dynamic";

const PhotoFavorite = dynamic(() => import("@components/photo/PhotoFavorite"), {
	ssr: false,
});

export default function PhotoCard({ photo, isFavorite }: { photo: IPhoto; isFavorite?: boolean }) {
	const source: ImageSource = photo?.urls
		? ImageSource.Unsplash
		: photo?.url
		? ImageSource.Pexels
		: ImageSource.Pixabay;

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

		case ImageSource.Unsplash:
			brandLogo = "/icons/unsplash.png";
			brandName = "Unsplash";
			break;
	}

	const photoOrient = getPhotoOrientation(photo);

	const pixabaySrc = isFavorite
		? photo?.previewURL?.replace("_150", "_1280")
		: photo?.webformatURL;

	const pexelSrc = photo?.src?.large ? photo.src.large.replace("&h=650&w=940", "&w=800") : null;

	const unsplashSrc = photo?.urls?.regular ? photo.urls.regular : null;

	return (
		<div className={`photo-card ${photoOrient} group`} data-animate="animate-fade-up">
			<div className="card-body relative min-h-36 bg-gray-300">
				<Link
					href={`/photo/${photo.id}${isFavorite ? "?isFavorite" : ""}`}
					prefetch={false}
				>
					<Image
						width={photo?.width || photo?.imageWidth || "200"}
						height={photo?.height || photo?.imageHeight || "200"}
						alt={photo?.alt || photo?.tags || "Photo Image"}
						src={pexelSrc || pixabaySrc || unsplashSrc || "/default.png"}
						className="main-photo min-h-36 object-cover"
					/>
				</Link>
				<div className="image-source absolute transition-all top-2 -left-16 group-hover:left-2 aspect-square">
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
							alt={""}
							className="rounded-full !aspect-square w-6 lg:w-8 xl:w-9 "
						/>
						<div className="brand-name hover:underline">{brandName}</div>
					</Link>
				</div>

				<PhotoFavorite
					photo={photo}
					className="absolute right-2 top-2 lg:transition-all lg:-right-20 lg:group-hover:right-2"
				/>

				<div className="image-download transition-all absolute right-2 z-50 -bottom-16 group-hover:bottom-2">
					<Link
						className="download"
						target="_blank"
						title="Download Image"
						download
						prefetch={false}
						href={photo?.largeImageURL || photo.src?.original || "/"}
					>
						<LuDownload />
					</Link>
				</div>
				{/* {photo?.tags && (
					<div
						className="tags absolute -bottom-48 group-hover:bottom-8 lg:group-hover:bottom-12 
					text-white text-[10px] lg:text-sm bg-slate-700/50 px-2 py-1"
					>
						{photo.tags}
					</div>
				)} */}
				<div
					className="tags absolute -right-72 transition-all group-hover:right-0 group-hover:bottom-10 lg:group-hover:bottom-12 
					text-white text-[11px] lg:text-sm bg-slate-700/50 px-2 py-1"
				>
					<span className="line-clamp-1">
						{photo?.alt || photo?.alt_description || photo?.tags}
					</span>
				</div>
			</div>
			<div className="card-footer transition-all absolute left-0 right-0 -bottom-20 group-hover:bottom-0">
				<div className="h-10 lg:h-12 flex items-center justify-between bg-slate-700/50 text-white backdrop-blur-sm px-2">
					<div className="photographer flex gap-2 items-center">
						{photo?.userImageURL && (
							<Image
								src={photo?.userImageURL}
								alt={photo?.user || "User Photo"}
								width="96"
								height="96"
								className="object-cover w-9 h-9 rounded-full"
							/>
						)}
						{photo?.user?.profile_image && (
							<Image
								src={photo.user.profile_image?.small}
								alt={photo.user?.name || "User Photo"}
								width="96"
								height="96"
								className="object-cover w-9 h-9 rounded-full"
							/>
						)}
						{photo?.avg_color && (
							<div
								className="color w-6 lg:w-8 aspect-square rounded-full"
								title={`Color: ${photo.avg_color}`}
								style={{ backgroundColor: photo.avg_color }}
							></div>
						)}
						<Photographer photo={photo} className="text-xs lg:text-sm xl:text-base" />
					</div>
					<div className="right-info mr-10  text-xs lg:text-sm flex items-center">
						{photo?.views && (
							<>
								<span className="hidden 2xl:block">Views:</span>
								<span className="">{photo.views}</span>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
