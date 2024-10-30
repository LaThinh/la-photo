import Link from "next/link";
import React from "react";

export default function Header() {
	return (
		<header className="header sticky top-0 z-50 bg-white/70 backdrop-blur-lg">
			<div className="container px-3 lg:px-5 h-20 flex items-center">
				<div className="header-logo text-xl lg:text-3xl">
					<Link href="/">La Photo</Link>
				</div>
			</div>
		</header>
	);
}
