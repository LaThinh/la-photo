import React from "react";

export default function PhotoTags({ tags }: { tags: string }) {
	const arrTags = tags.split(",");
	if (!tags || arrTags.length < 1) return;

	const handleClickTag = (tag: string) => {
		const url = `../search/${encodeURIComponent(tag.trim())}`;
		// router.push(`/search/${encodeURIComponent(tag.trim())}`);

		if (typeof window !== "undefined") {
			window.location.href = url;
		}
	};

	return (
		<div className="tags flex gap-2 flex-wrap">
			{arrTags.map((tag, index) => (
				<div
					key={index}
					onClick={() => handleClickTag(tag)}
					className="tag border border-gray-400 px-3 py-1 rounded-full cursor-pointer hover:bg-slate-700 hover:text-white"
				>
					<span className="capitalize text-sm">{tag}</span>
				</div>
			))}
		</div>
	);
}
