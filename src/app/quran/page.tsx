import Link from "next/link";
import { BookOpen, BookText, Layers, Search } from "lucide-react";
import { QuranCard } from "@/components/quran-card";
import { quranSurahs } from "@/lib/quran-data";

export default function QuranPage() {
  return (
    <main className="bg-[#f7f4ee] min-h-screen py-10 lg:py-14">
      <div className="mx-auto max-w-[1180px] px-5 lg:px-8">
        {/* Top Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#5d7a6c]">
              Al-Quran Al-Kareem
            </span>
            <h1 className="mt-1.5 text-3xl sm:text-4xl font-bold text-[#17362b]">
              Read the Holy Quran
            </h1>
            <p className="mt-1 text-sm text-[#5d7068]">
              Read all 114 Surahs with Urdu & English translation, or view the complete printed Mushaf PDF.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-2xl border border-[#dfe7de] bg-white px-4 py-2.5 text-xs font-semibold text-[#17362b] shadow-sm hover:border-[#ccd9cf] transition"
            >
              <Search size={14} className="text-[#0f4c3a]" />
              Search Ayahs
            </Link>
            <Link
              href="/quran/pdf"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#0f4c3a] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#155e48] transition"
            >
              <BookOpen size={14} />
              Read Full Quran PDF
            </Link>
          </div>
        </div>

        {/* Quick Mode Switch Tabs */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Link
            href="/quran/pdf"
            className="group relative overflow-hidden rounded-2xl border border-[#d2dfd6] bg-gradient-to-br from-[#0f4c3a] to-[#1a5a47] p-5 text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                <BookOpen size={18} />
              </span>
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#9ae6b4]">
                PDF Mushaf
              </span>
            </div>
            <h2 className="mt-3 text-lg font-bold">Full Quran (15-Line PDF)</h2>
            <p className="mt-1 text-xs text-white/80">Original printed pages, 30 Paras index & offline download</p>
          </Link>

          <Link
            href="/quran/surah"
            className="group rounded-2xl border border-[#dfe7de] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#ccd9cf] hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf6ef] text-[#0f4c3a]">
                <BookText size={18} />
              </span>
              <span className="rounded-full bg-[#edf6ef] px-2.5 py-0.5 text-[10px] font-bold text-[#0f4c3a]">
                114 Surahs
              </span>
            </div>
            <h2 className="mt-3 text-lg font-bold text-[#17362b]">Surah-by-Surah</h2>
            <p className="mt-1 text-xs text-[#5d7068]">Read with authentic Urdu/English translations and recitation</p>
          </Link>

          <Link
            href="/quran/para"
            className="group rounded-2xl border border-[#dfe7de] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#ccd9cf] hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf6ef] text-[#0f4c3a]">
                <Layers size={18} />
              </span>
              <span className="rounded-full bg-[#edf6ef] px-2.5 py-0.5 text-[10px] font-bold text-[#0f4c3a]">
                30 Paras (Juz)
              </span>
            </div>
            <h2 className="mt-3 text-lg font-bold text-[#17362b]">Para-by-Para</h2>
            <p className="mt-1 text-xs text-[#5d7068]">Read Quran divided into 30 equal Juz sections</p>
          </Link>
        </div>

        {/* All Surahs Grid */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#17362b]">All 114 Surahs</h2>
          <span className="text-xs font-medium text-[#5d7068]">Complete Revelation</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {quranSurahs.map((surah) => (
            <QuranCard key={surah.id} surah={surah} />
          ))}
        </div>
      </div>
    </main>
  );
}
