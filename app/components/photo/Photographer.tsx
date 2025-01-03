import React from "react";
import { IPhoto } from "@libs/interface";
import Link from "next/link";

export default function Photographer({
	photo,
	showLink,
	className,
}: {
	photo: IPhoto;
	showLink?: boolean;
	className?: string;
}) {
	return (
		<div className={`photographer ${showLink ? "hover:text-primary" : ""} ${className}`}>
			{photo?.user_id &&
				(showLink ? (
					<Link
						href={`https://pixabay.com/users/${photo.user}-${photo.user_id}`}
						title={`View Photographer ${photo.user} in Pixabay`}
						target="_blank"
					>
						{photo.user}
					</Link>
				) : (
					<>{photo.user}</>
				))}

			{photo?.user &&
				photo.user?.name &&
				(showLink ? (
					<Link
						href={`https://unsplash.com/@${photo.user?.username}`}
						title={`View Photographer ${photo.user.name} in Unsplash`}
						target="_blank"
					>
						{photo.user.name}
					</Link>
				) : (
					<>{photo.user.name}</>
				))}

			{photo?.photographer &&
				photo?.photographer_url &&
				(showLink ? (
					<Link
						href={photo.photographer_url}
						title={`View Photographer ${photo.photographer} in Pexels`}
						target="_blank"
					>
						{photo.photographer}
					</Link>
				) : (
					<>{photo.photographer}</>
				))}
		</div>
	);
}
