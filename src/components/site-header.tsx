import Image from "next/image";
import Link from "next/link";
import { Search, UserRound } from "lucide-react";

const navItems = [
  ["/", "Home"],
  ["/quran/surah", "Surahs"],
  ["/quran/para", "Paras"],
  ["/quran/pdf", "Mushaf (PDF)"],
  ["/quran", "Daily Ayah"],
  ["/about", "About"],
  ["/search", "Search"],
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="mx-auto flex h-[58px] max-w-[1180px] items-center justify-between px-5 lg:px-8">
        <Link href="/" className="header-logo-link" aria-label="NoorsQuran home">
          <Image
            src="/images/quran.png"
            alt="NoorsQuran Logo"
            width={220}
            height={220}
            priority
            loading="eager"
            sizes="(max-width: 768px) 52px, (max-width: 1024px) 60px, 68px"
            className="header-logo-image"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map(([href, label]) => (
            <Link key={label} href={href} className={`nav-link ${label === "Home" ? "active" : ""}`}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/search" aria-label="Search" className="text-white">
            <Search size={17} />
          </Link>
          <Link href="/about" className="sign-in"><UserRound size={13} /> Sign In</Link>
        </div>
      </div>
    </header>
  );
}
