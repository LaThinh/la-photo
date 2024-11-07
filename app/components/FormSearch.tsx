"use client";
import { Button } from "@/components/ui/button";
import { keywords } from "@libs/keyword";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";

export default function FormSearch({ query }: { query?: string }) {
	const pathNames = usePathname();
	const [search, setSearch] = useState(query || "");
	const formRef = useRef(null);
	const router = useRouter();

	useEffect(() => {
		const arrNames = pathNames.split("/");
		if (arrNames && arrNames.length > 2 && arrNames[1] == "search") {
			setSearch(decodeURIComponent(arrNames[2]));
		}
		const headerSearch = document.querySelector("#header-search");
		headerSearch?.classList.add("hidden");
	}, []);

	useEffect(() => {
		const headerSearch = document.querySelector("#header-search");
		const observer = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (entry.isIntersecting) {
				// Element is in viewport
				headerSearch?.classList.add("hidden");
			} else {
				// Element is not in viewport
				headerSearch?.classList.remove("hidden");
			}
		});

		if (formRef.current) {
			headerSearch?.classList.add("hidden");

			observer.observe(formRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, [formRef]);

	const handleClickKeyword = (keyword: string) => {
		router.push(`/search/${encodeURIComponent(keyword || "")}`);
	};

	return (
		<div className="form-search w-full mx-auto max-w-[540px]">
			<form
				action={`/search/${encodeURIComponent(search || "")}`}
				className="search-form relative z-20 flex flex-col w-full gap-2 
                justify-center h-10 lg:h-12"
				ref={formRef}
			>
				<div className="field-row flex gap-0 items-center">
					<div className="form-control flex-1 h-full">
						<input
							type="text"
							id="search"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="What image are you looking for?"
							className="border bg-white w-full border-1 rounded-l-full rounded-r-none
								text-xs md:text-base lg:text-lg h-10 lg:h-12 px-5 focus-visible:outline-0 "
						/>
					</div>
					<Button
						type="submit"
						className="btn btn-primary h-10 lg:h-12 px-3 lg:px-6 rounded-r-full text-lg "
					>
						<IoMdSearch
							style={{ width: "24px", height: "24px" }}
							className="md:hidden"
						/>
						<span className="hidden md:flex">Search</span>
					</Button>
				</div>
			</form>
			<div className="field-row relative x-10 px-5 py-3 keywords flex gap-2 gap-y-1 flex-wrap text-white text-xs">
				{keywords.map((keyword, index) => (
					<div
						key={index}
						title={keyword}
						className="keyword cursor-pointer hover:underline text-nowrap"
						onClick={() => handleClickKeyword(keyword)}
					>
						{keyword}
					</div>
				))}
			</div>
		</div>
	);
}
