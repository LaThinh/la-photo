import Link from "next/link";
import React from "react";
import HeaderSearch from "./HeaderSearch";

export default function Header() {
	return (
		<header className="header sticky top-0 z-50 bg-white/70 backdrop-blur-lg shadow-lg">
			<div className="w-full max-w-[1800px] mx-auto px-3 lg:px-5 h-14 lg:h-16 flex items-center justify-between">
				<div className="header-logo min-w-28 text-lg lg:text-2xl">
					<Link href="/" className="font-Oswald font-bold text-gradient py-2">
						La Photo
					</Link>
				</div>
				{/* <div
					id="header-search"
					className="flex header-search flex-1 justify-center items-center"
				>
					<FormSearch />
				</div> */}
				<HeaderSearch />
				<div className=" header-right lg:min-w-28"></div>
			</div>
		</header>
	);
}
