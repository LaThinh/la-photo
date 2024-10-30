import Link from "next/link";
import React from "react";

export default function Header() {
	return (
		<header className="header sticky top-0 z-50 bg-white/70 backdrop-blur-lg">
			<div className="container px-3 lg:px-5 h-14 lg:h-16 flex items-center">
				<div className="header-logo text-lg lg:text-2xl">
					<Link href="/" className="font-playWrite font-bold text-gradient py-2">
						La Photo
					</Link>
				</div>
			</div>
		</header>
	);
}
