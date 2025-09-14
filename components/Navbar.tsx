"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton } from '@clerk/nextjs';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { usePathname } from "next/navigation";

const navItems = [
	{ src: "/safety-score", name: "Safety Score" },
	{ src: "/sos", name: "SOS" },
	{ src: "/track", name: "Track" },
	{ src: "/safety-map", name: "Safety Map", highlight: true }, // Highlighted Safety Map option
];

const Navbar = () => {
	const pathname = usePathname() || "";

	// Hide navbar on sign-in and sign-up pages
	if (pathname === "/sign-in" || pathname.startsWith("/sign-in/") || pathname === "/sign-up" || pathname.startsWith("/sign-up/")) {
		return null;
	}

	return (
		<header className="w-full bg-gradient-to-r from-purple-600 via-pink-400 to-yellow-300 shadow-2xl sticky top-0 z-50 animate-gradient-x">
			<nav className="flex justify-between items-center px-6 md:px-20 py-4">
				<Link href="/" className="flex items-center gap-2">
					<Image
						src="/assets/images/toursafe.png"
						alt="TourSafe Logo"
						width={60}
						height={60}
						priority
						className="object-contain drop-shadow-lg hover:scale-110 transition-transform duration-200"
					/>
					<span className="text-2xl font-extrabold text-white tracking-wide ml-2">
						TourSafe
					</span>
				</Link>

				<div className="flex items-center gap-5">
					{navItems.map((item) => (
						<Link
							key={item.name}
							href={item.src}
							className="font-spaceGrotesk font-bold"
						>
							<div
								className={`active:scale-105 rounded-lg px-4 py-2 transition-all duration-300 shadow-lg cursor-pointer
                  ${item.highlight ?
										'bg-gradient-to-r from-green-400 via-yellow-300 to-red-500 text-white border-4 border-white animate-pulse scale-110 font-extrabold drop-shadow-2xl' :
										'hover:bg-yellow-200 hover:text-purple-700'}
                `}
							>
								{item.name}
							</div>
						</Link>
					))}

					<SignedIn>
						<UserButton
							appearance={{
								elements: {
									avatarBox: "w-8 h-8"
								}
							}}
						/>
					</SignedIn>
					<SignedOut>
						<Link href="/sign-in">
							<div className="bg-white text-purple-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-bold transition-colors duration-200">
								Sign In
							</div>
						</Link>
					</SignedOut>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
