import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, BookText, Headphones, Search, Sparkles } from "lucide-react";
import { popularSurahs } from "@/lib/quran-data";

const featureCards = [
  {
    icon: BookOpen,
    title: "Full Quran PDF",
    description: "Read the authentic 15-line printed Mushaf Quran Majeed with 30 Paras & 114 Surahs index.",
    href: "/quran/pdf",
  },
  {
    icon: BookText,
    title: "Read Surahs",
    description: "Explore authentic Arabic text with Urdu & English translations and verse audio.",
    href: "/quran/surah",
  },
  {
    icon: Headphones,
    title: "Listen Daily",
    description: "Enjoy soothing recitations and absorb the message of the Quran with clarity and peace.",
    href: "/listen",
  },
];

const pathwayCards = [
  {
    title: "Daily ayah",
    text: "Begin each day with a single verse that brings focus, gratitude and guidance.",
    href: "/quran",
  },
  {
    title: "Search verses",
    text: "Look up specific themes, words and passages to deepen your understanding.",
    href: "/search",
  },
  {
    title: "Guided learning",
    text: "Grow spiritually through practical reflections and a steady reading routine.",
    href: "/about",
  },
];

export default function HomePage() {
  return (
    <main className="bg-[#f7f4ee] text-[#244239]">
      <section className="hero-overlay">
        <div className="mx-auto max-w-[1180px] px-5 py-10 lg:px-8 lg:py-14">
          <div className="hero-logo-wrap">
            <Image
              src="/images/quran.png"
              alt="NoorsQuran Logo"
              width={1200}
              height={1200}
              priority
              loading="eager"
              sizes="(max-width: 480px) 92vw, (max-width: 768px) 78vw, (max-width: 1200px) 68vw, 900px"
              className="hero-logo-image"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-12 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {featureCards.map(({ icon: Icon, title, description, href }) => (
            <Link
              key={title}
              href={href}
              className="journey-card group relative overflow-hidden rounded-[26px] border border-[#dfe7de] bg-white p-6 shadow-[0_18px_45px_rgba(22,54,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_24px_54px_rgba(22,54,42,0.08)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf5ee] text-[#0f4c3a]">
                <Icon size={20} />
              </div>
              <h2 className="text-xl font-semibold text-[#17362b]">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#5d7068]">{description}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0f4c3a]">
                Explore
                <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 pb-12 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#5d7a6c]">Popular surahs</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#17362b]">Begin with the most loved</h2>
          </div>
          <Link href="/quran/surah" className="hidden text-sm font-semibold text-[#0f4c3a] sm:inline-flex">
            View all surahs
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {popularSurahs.slice(0, 6).map((surah) => (
            <Link
              key={surah.id}
              href={`/quran/surah/${surah.slug}`}
              className="rounded-[24px] border border-[#dfe7de] bg-white p-5 shadow-[0_16px_35px_rgba(22,54,42,0.04)] transition hover:-translate-y-1 hover:border-[#ccd9cf] hover:shadow-[0_22px_48px_rgba(22,54,42,0.08)]"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#0f4c3a]">Surah {surah.id}</span>
                <span className="rounded-full bg-[#edf6ef] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#2b5c4a]">
                  {surah.type}
                </span>
              </div>

              <div className="text-right" dir="rtl">
                <p className="text-2xl font-semibold text-[#17362b]">{surah.name}</p>
              </div>

              <p className="mt-3 text-sm text-[#597167]">{surah.transliteration}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[#7a8e86]">{surah.totalVerses} verses</p>

              <div className="mt-5 flex items-center justify-between border-t border-[#e8ebea] pt-4 text-sm font-semibold text-[#0f4c3a]">
                <span>Read now</span>
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Full Quran Mushaf PDF Showcase Banner */}
      <section className="mx-auto max-w-[1180px] px-5 pb-12 lg:px-8">
        <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-[#0f4c3a] via-[#163f32] to-[#0a2920] p-7 md:p-10 text-white shadow-xl">
          <div className="relative z-10 grid gap-6 md:grid-cols-[1.3fr_0.7fr] md:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#9ae6b4] backdrop-blur-sm">
                <Sparkles size={13} /> Complete Quran Pak
              </span>
              <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight text-white">
                Read Full Quran Majeed (PDF Mushaf)
              </h2>
              <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-[#cde0d5]">
                Experience the authentic printed script with 30 Paras, 114 Surahs index, smooth page jumping, zoom control, and direct offline download.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/quran/pdf"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#f9f3e2] px-5 py-3 text-sm font-bold text-[#0f4c3a] shadow hover:bg-white transition"
                >
                  <BookOpen size={17} />
                  Open Mushaf PDF Reader
                </Link>
                <a
                  href="/api/quran-pdf?download=true"
                  download="Quran-Pak-Full.pdf"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition"
                >
                  Download PDF (370 MB)
                </a>
              </div>
            </div>

            <div className="hidden md:flex justify-end">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md text-right w-full max-w-xs" dir="rtl">
                <p className="text-2xl font-bold text-[#f9f3e2] font-serif leading-relaxed">
                  الْقُرْآنُ الْكَرِيمُ
                </p>
                <p className="mt-2 text-xs text-[#b8d5c4] leading-5">
                  کامل ۳۰ پارے اور ۱۱۴ سورتیں با آسانی پڑھیں اور محفوظ کریں۔
                </p>
                <div className="mt-4 border-t border-white/15 pt-3 flex justify-between text-[11px] text-[#e0eee6]">
                  <span>۳۰ پارے</span>
                  <span>۱۱۴ سورتیں</span>
                  <span>۶۰۴ صفحات</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 pb-16 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-[#dfe7de] bg-[#f3ead5] p-6 shadow-[0_18px_45px_rgba(22,54,42,0.04)]">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f4c3a] text-[#f9f3e2]">
                <BookText size={18} />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#547767]">Guided learning</p>
                <h3 className="mt-1 text-2xl font-semibold text-[#17362b]">A calmer way to study</h3>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {pathwayCards.map((card) => (
                <div key={card.title} className="rounded-[18px] border border-[#e7d9ad] bg-[#faf5e8] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-[#17362b]">{card.title}</p>
                      <p className="mt-2 text-sm leading-6 text-[#5d7068]">{card.text}</p>
                    </div>
                    <Link href={card.href} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0f4c3a] text-[#f5f0e4]">
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-[#dfe7de] bg-white p-6 shadow-[0_18px_45px_rgba(22,54,42,0.04)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5d7a6c]">Why NoorsQuran</p>
                <h3 className="mt-2 text-2xl font-semibold text-[#17362b]">Designed for daily remembrance</h3>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ebf7ee] text-[#0f4c3a]">
                <Search size={18} />
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-[18px] bg-[#f8f5ef] p-4">
                <p className="text-sm font-medium text-[#17362b]">Easy navigation</p>
                <p className="mt-2 text-sm leading-6 text-[#5d7068]">Jump between surahs, paras and daily offerings with a clean, distraction-free reading flow.</p>
              </div>
              <div className="rounded-[18px] bg-[#f8f5ef] p-4">
                <p className="text-sm font-medium text-[#17362b]">Beautiful recitation</p>
                <p className="mt-2 text-sm leading-6 text-[#5d7068]">Listen with clarity and enjoy a thoughtful experience built for better focus and understanding.</p>
              </div>
              <div className="rounded-[18px] bg-[#f8f5ef] p-4">
                <p className="text-sm font-medium text-[#17362b]">Faith-centred experience</p>
                <p className="mt-2 text-sm leading-6 text-[#5d7068]">Turn your daily routine into a sincere practice of learning, remembrance and reflection.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
