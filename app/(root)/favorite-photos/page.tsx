"use client";

import { useFavoriteStore } from "@/app/stores/favoriteStore";
import PhotoBanner from "@components/photo/PhotoBanner";
import PhotoGrid from "@components/photo/PhotoGrid";
import { IPhoto } from "@libs/interface";
import { Suspense, useEffect, useState } from "react";
import Loading from "@components/Loading";

// import dynamic from "next/dynamic";
// const PhotoGrid = dynamic(() => import("@components/photo/PhotoGrid"), {
// 	ssr: false,
// });

export default function FavoritePhotos() {
	const { favoriteImages } = useFavoriteStore();
	const [photos, setPhotos] = useState<IPhoto[]>([]);

	useEffect(() => {
		if (!favoriteImages) return;
		setPhotos([...favoriteImages].reverse());
	}, []);

	if (!favoriteImages || favoriteImages.length < 1) {
		return null;
	}

	return (
		<div
			className="favorite-photo-page py-5 lg:pb-10 flex flex-col gap-5 lg:gap-10"
			suppressHydrationWarning
		>
			<Suspense fallback={<Loading />}>
				<div className="bg-gray-100 relative flex-center w-[98%] m-auto min-h-72 rounded-3xl">
					<PhotoBanner
						photos={photos}
						className="w-full absolute left-1/2 -translate-x-1/2 top-0 bottom-0 z-0 opacity-90 "
					/>
					<div className="background-overlay absolute z-10 bg-gray-900/50 top-0 left-0 right-0 bottom-0"></div>

					<h1 className="relative z-20 bg-gradient-to-r from-amber-500 to-pink-500 leading-loose py-5 bg-clip-text text-transparent font-semibold text-3xl lg:text-5xl xl:text-7xl">
						<span>Favorite Photos: {favoriteImages.length} images</span>
					</h1>
				</div>

				<PhotoGrid photos={photos} isFavorite />
			</Suspense>
		</div>
	);
}
