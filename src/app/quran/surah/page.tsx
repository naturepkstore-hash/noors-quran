import Link from "next/link";
import { QuranCard } from "@/components/quran-card";
import { quranSurahs } from "@/lib/quran-data";

export default function QuranSurahPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">Surah wise</p>
          <h1 className="mt-2 text-4xl font-semibold text-slate-900">All Surahs</h1>
        </div>
        <Link href="/quran" className="text-sm font-medium text-emerald-800">Back to Quran</Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {quranSurahs.map((surah) => (
          <QuranCard key={surah.id} surah={surah} />
        ))}
      </div>
    </main>
  );
}
