import Link from "next/link";
import { BookOpen, Camera, Mail, Play } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="mx-auto max-w-[1180px] px-5 py-8 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.4fr_0.8fr_0.8fr_1.3fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="footer-logo">
                <BookOpen size={16} />
              </span>
              <div>
                <strong className="block text-[17px] font-black leading-none tracking-[-0.04em] text-white">NoorsQuran</strong>
                <small className="mt-1 block text-[8px] uppercase tracking-[0.12em] text-[#a6c1b1]">Light of the Quran</small>
              </div>
            </Link>

            <p className="mt-5 max-w-[260px] text-[11px] leading-5 text-white/70">
              NoorsQuran is your companion on the journey of faith. Read, listen and understand the message of Allah.
            </p>

            <div className="mt-5 flex items-center gap-2.5">
              {[
                "f",
                <Play key="play" size={12} />,
                <Camera key="camera" size={12} />,
                "X",
                <Mail key="mail" size={12} />,
              ].map((item, index) => (
                <span key={index} className="footer-social">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <div className="footer-links">
              <Link href="/">Home</Link>
              <Link href="/quran/surah">Surahs</Link>
              <Link href="/quran/para">Paras</Link>
              <Link href="/quran">Daily Ayah</Link>
              <Link href="/about">About Us</Link>
              <Link href="/search">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="footer-heading">Resources</h3>
            <div className="footer-links">
              <Link href="/quran">Quran Reading</Link>
              <Link href="/listen">Audio Recitations</Link>
              <Link href="/search">Translation</Link>
              <Link href="/about">Tafseer</Link>
              <Link href="/about">Islamic Articles</Link>
              <Link href="/about">FAQs</Link>
            </div>
          </div>

          <div>
            <h3 className="footer-heading">Stay Connected</h3>
            <p className="text-[10px] text-white/60">Get daily ayah, reminders and updates.</p>

            <div className="mt-3 flex overflow-hidden rounded-[10px] border border-[#427d68] bg-[#d8e7de]/10 shadow-inner">
              <input
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-[11px] text-white placeholder:text-[#d7e8df] placeholder:opacity-80 outline-none"
                placeholder="Your email address"
                aria-label="Your email address"
              />
              <button className="footer-subscribe">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-[11px] text-white/80">
              <span className="footer-badge">N</span>
              <span>NoorsQuran. All rights reserved.</span>
            </div>

            <nav className="flex items-center gap-2.5 text-[11px] text-white/75">
              <Link href="/quran" className="hover:text-white">Quran</Link>
              <span className="text-white/35">•</span>
              <Link href="/about" className="hover:text-white">Guidance</Link>
              <span className="text-white/35">•</span>
              <Link href="/about" className="hover:text-white">Peace</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
