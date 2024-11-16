"use client";

import React from "react";
import { useFavoriteStore } from "@/app/stores/favoriteStore";
import Link from "next/link";
import { IoHeart } from "react-icons/io5";

export default function HeaderFavious() {
	const { favoriteImages } = useFavoriteStore();

	return (
		<div className="header-favious">
			<Link
				href="/favorite-photos/"
				title="View Favious Photo"
				className="flex items-center hover:text-primary"
			>
				<span className="hidden lg:block">Favious</span>
				<IoHeart className="w-9 h-9 text-red-600" />
				<span className="count flex-center text-xs text-white w-9 h-9 -ml-9 ">
					{favoriteImages.length}
				</span>
			</Link>
		</div>
	);
}
