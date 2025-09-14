import Link from "next/link";
import Image from "next/image";

const MinimalNavbar = () => (
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
        <Link href="/about" className="font-spaceGrotesk font-bold text-white hover:text-yellow-200">
          About
        </Link>
      </div>
    </nav>
  </header>
);

export default MinimalNavbar;
