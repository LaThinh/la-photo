"use client";

import SearchComponent from "@components/Search";
// import { IPhoto } from "@lib/interface";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function SearchPage() {
	//console.log(params);

	const searchParams = useSearchParams();

	const q = searchParams.get("q") || "";
	console.log(q);
	// const photos: IPhoto[] = [];

	return (
		<div>
			<SearchComponent q={q} />
		</div>
	);
}
