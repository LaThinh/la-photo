import React from "react";

export default function Loading({ loadingText }: { loadingText?: string }) {
	return (
		<div className="loading w-full min-h-[50vh] h-auto flex flex-col gap-5 items-center justify-center ">
			<span className="loader"></span>
			<div className="label">{loadingText || ""}</div>
		</div>
	);
}
