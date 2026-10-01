import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, ArrowLeft, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { QuranReader } from "@/components/quran-reader";
import { getMetadataForSurah, getSurahBySlug, quranSurahs } from "@/lib/quran-data";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: Promise<{ "surah-slug": string }> }): Promise<Metadata> {
  return params.then(({ "surah-slug": slug }) => {
    const metadata = getMetadataForSurah(slug);
    return {
      title: metadata.title,
      description: metadata.description,
    };
  });
}

export default async function SurahDetailPage({ params }: { params: Promise<{ "surah-slug": string }> }) {
  const { "surah-slug": slug } = await params;
  const surah = getSurahBySlug(slug);

  if (!surah) {
    notFound();
  }

  const currentIndex = quranSurahs.findIndex((s) => s.id === surah.id);
  const prevSurah = currentIndex > 0 ? quranSurahs[currentIndex - 1] : null;
  const nextSurah = currentIndex < quranSurahs.length - 1 ? quranSurahs[currentIndex + 1] : null;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Quran", href: "/quran" },
          { label: "Surahs", href: "/quran/surah" },
          { label: surah.transliteration },
        ]}
      />

      <header className="mb-8 rounded-[2rem] border border-[#dfe7de] bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#edf6ef] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0f4c3a]">
                Surah {surah.id}
              </span>
              <span className="rounded-full bg-[#f3ead5] px-2.5 py-0.5 text-xs font-medium text-[#17362b]">
                {surah.type}
              </span>
            </div>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#17362b]">{surah.transliteration}</h1>
            <p className="mt-1 text-sm text-[#5d7068]">
              {surah.englishName} • {surah.totalVerses} Ayahs
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
            <div className="text-right" dir="rtl">
              <p className="text-4xl font-serif text-[#0f4c3a] font-bold">{surah.name}</p>
            </div>
            <Link
              href="/quran/pdf"
              className="mt-2 inline-flex items-center gap-2 rounded-xl bg-[#0f4c3a] px-4 py-2 text-xs font-semibold text-white shadow hover:bg-[#155e48] transition"
            >
              <BookOpen size={14} />
              Read in Full Mushaf PDF
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-3 text-xs sm:text-sm text-[#5d7068] sm:grid-cols-4">
          <div className="rounded-2xl bg-[#faf8f5] p-3 border border-[#f0ebe0]">
            <span className="block font-bold text-[#17362b]">Urdu Name</span>
            <span className="text-sm font-semibold">{surah.urduName}</span>
          </div>
          <div className="rounded-2xl bg-[#faf8f5] p-3 border border-[#f0ebe0]">
            <span className="block font-bold text-[#17362b]">English Meaning</span>
            <span className="text-sm font-semibold">{surah.englishName}</span>
          </div>
          <div className="rounded-2xl bg-[#faf8f5] p-3 border border-[#f0ebe0]">
            <span className="block font-bold text-[#17362b]">Total Verses</span>
            <span className="text-sm font-semibold">{surah.totalVerses}</span>
          </div>
          <div className="rounded-2xl bg-[#faf8f5] p-3 border border-[#f0ebe0]">
            <span className="block font-bold text-[#17362b]">Recitation</span>
            <span className="text-sm font-semibold text-[#0f4c3a]">Available (Alafasy)</span>
          </div>
        </div>

        {/* Previous / Next Surah Navigation */}
        <div className="mt-6 flex items-center justify-between border-t border-[#f0f4f1] pt-4">
          {prevSurah ? (
            <Link
              href={`/quran/surah/${prevSurah.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f4c3a] hover:underline"
            >
              <ArrowLeft size={14} /> Previous ({prevSurah.transliteration})
            </Link>
          ) : (
            <div />
          )}

          {nextSurah ? (
            <Link
              href={`/quran/surah/${nextSurah.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f4c3a] hover:underline"
            >
              Next ({nextSurah.transliteration}) <ArrowRight size={14} />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </header>

      <QuranReader verses={surah.verses} surahName={surah.transliteration} />
    </main>
  );
}
