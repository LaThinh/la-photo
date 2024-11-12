import Link from "next/link";
import React from "react";
import HeaderSearch from "./header/HeaderSearch";
import HeaderFavious from "./header/HeaderFavious";

export default function Header() {
	return (
		<header className="header sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-b-gray-300">
			<div className="w-full max-w-[1800px] mx-auto px-3 lg:px-5 h-14 lg:h-16 flex items-center justify-between">
				<div className="header-logo min-w-28 text-lg lg:text-2xl xl:text-3xl">
					<Link href="/" className="font-Oswald font-bold text-gradient py-2">
						<span className="bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">
							La Photo
						</span>
					</Link>
				</div>
				<HeaderSearch />
				<div className=" header-right lg:min-w-28">
					<HeaderFavious />
				</div>
			</div>
		</header>
	);
}
