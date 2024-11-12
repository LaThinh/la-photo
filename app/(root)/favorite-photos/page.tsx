"use client";

import { useFavoriteStore } from "@/app/stores/favoriteStore";
import PhotoGrid from "@components/photo/PhotoGrid";
import React from "react";

export default function FavoritePhotos() {
	const { favoriteImages } = useFavoriteStore();

	const photos = [...favoriteImages].reverse();

	return (
		<div className="favorite-photo-page py-5 lg:pb-10 flex flex-col gap-5 lg:gap-10">
			<div className="bg-gray-100 flex-center w-[98%] m-auto min-h-72 rounded-3xl">
				<h1 className="bg-gradient-to-r from-amber-500 to-pink-500 leading-loose py-5 bg-clip-text text-transparent font-semibold text-3xl lg:text-5xl xl:text-7xl">
					<span>Favorite Photos: {favoriteImages.length} images</span>
				</h1>
			</div>

			<PhotoGrid photos={photos} />
		</div>
	);
}
