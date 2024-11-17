"use client";

import { useFavoriteStore } from "@/app/stores/favoriteStore";
import { cn } from "@/lib/utils";
import { IPhoto } from "@libs/interface";
import React, { useEffect, useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

export default function PhotoFavorite({ photo, className }: { photo: IPhoto; className?: string }) {
	const { favoriteImages, addFavorite, removeFavorite } = useFavoriteStore();
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		if (!favoriteImages) return;

		const index = favoriteImages.findIndex((image: IPhoto) => image.id === photo.id);
		if (index >= 0) setIsFavorite(true);
	}, [favoriteImages]);

	const toggleFavorite = () => {
		if (isFavorite) {
			removeFavorite(photo);
		} else {
			addFavorite(photo);
		}
		setIsFavorite(!isFavorite);
	};

	return (
		<button
			onClick={toggleFavorite}
			className={cn(
				"photo-favorite w-9 h-9 2xl:w-10 2xl:h-10 flex justify-center items-center p-1 rounded-full bg-white/30",
				className
			)}
			title={`Add Photo ${photo.id} to Favorite`}
		>
			{/* {isFavorite ? "❤️" : "🤍"} */}
			{isFavorite ? (
				<IoHeart className="w-6 h-6 2xl:w-8 2xl:h-8 text-red-600" />
			) : (
				<IoHeartOutline className="w-6 h-6 2xl:w-8 2xl:h-8 text-gray-700 hover:text-pink-600" />
			)}
		</button>
	);
}
