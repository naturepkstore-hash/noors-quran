import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, ArrowLeft, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { QuranReader } from "@/components/quran-reader";
import { getParaByNumber, quranSurahs, Verse } from "@/lib/quran-data";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ "para-number": string }>;
}): Promise<Metadata> {
  const { "para-number": paraNumberStr } = await params;
  const num = parseInt(paraNumberStr, 10);
  const para = getParaByNumber(num);

  return {
    title: `Para ${para.number} (${para.name} - ${para.urduName}) | NoorsQuran`,
    description: `Read Para ${para.number} (${para.urduName}) with full Arabic text, authentic Urdu translation, English translation and audio recitation.`,
  };
}

export default async function ParaDetailPage({
  params,
}: {
  params: Promise<{ "para-number": string }>;
}) {
  const { "para-number": paraNumberStr } = await params;
  const num = parseInt(paraNumberStr, 10);

  if (isNaN(num) || num < 1 || num > 30) {
    notFound();
  }

  const para = getParaByNumber(num);

  // Extract all verses belonging to this Para
  const paraVerses: Verse[] = [];

  for (let sId = para.startSurahId; sId <= para.endSurahId; sId++) {
    const surah = quranSurahs.find((s) => s.id === sId);
    if (!surah) continue;

    const startV = sId === para.startSurahId ? para.startAyah : 1;
    const endV = sId === para.endSurahId ? para.endAyah : surah.verses.length;

    const filtered = surah.verses.filter(
      (v) => v.verseNumber >= startV && v.verseNumber <= endV
    );
    paraVerses.push(...filtered);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Quran", href: "/quran" },
          { label: "Paras", href: "/quran/para" },
          { label: `Para ${para.number}` },
        ]}
      />

      <header className="mb-8 rounded-[2rem] border border-[#dfe7de] bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#0f4c3a] font-bold">
              Juz / Para {para.number}
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#17362b]">
              {para.name}
            </h1>
            <p className="mt-1 text-sm text-[#5d7068]">
              Starts at Surah {para.startSurahId} (Ayah {para.startAyah}) • Ends at Surah {para.endSurahId} (Ayah {para.endAyah})
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
            <div className="text-right" dir="rtl">
              <p className="text-4xl font-serif text-[#0f4c3a] font-bold">{para.urduName}</p>
            </div>
            <Link
              href={`/quran/pdf#page=${para.startPage}`}
              className="mt-2 inline-flex items-center gap-2 rounded-xl bg-[#0f4c3a] px-4 py-2 text-xs font-semibold text-white shadow hover:bg-[#155e48] transition"
            >
              <BookOpen size={14} />
              Read in Mushaf PDF (Page {para.startPage})
            </Link>
          </div>
        </div>

        {/* Navigation between Paras */}
        <div className="mt-6 flex items-center justify-between border-t border-[#f0f4f1] pt-4">
          {para.number > 1 ? (
            <Link
              href={`/quran/para/${para.number - 1}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f4c3a] hover:underline"
            >
              <ArrowLeft size={14} /> Previous Para ({para.number - 1})
            </Link>
          ) : (
            <div />
          )}

          {para.number < 30 ? (
            <Link
              href={`/quran/para/${para.number + 1}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f4c3a] hover:underline"
            >
              Next Para ({para.number + 1}) <ArrowRight size={14} />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </header>

      <QuranReader verses={paraVerses} surahName={`Para ${para.number} (${para.name})`} />
    </main>
  );
}
