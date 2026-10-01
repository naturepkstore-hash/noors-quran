import Link from "next/link";
import { quranParas } from "@/lib/quran-data";

export default function QuranParaPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">Para wise</p>
        <h1 className="mt-2 text-4xl font-semibold text-slate-900">Read by Para</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {quranParas.map((para) => (
          <div key={para.number} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-emerald-700">Para {para.number}</span>
              <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">Progress 0%</span>
            </div>

            <h2 className="text-xl font-semibold text-slate-900">Juz {para.number}</h2>
            <p className="mt-2 text-sm text-slate-600">Starts at Surah {para.startSurahId} · Ayah {para.startAyah}</p>
            <p className="mt-2 text-sm text-slate-600">Ends at Surah {para.endSurahId} · Ayah {para.endAyah}</p>

            <Link href={`/quran/para/${para.number}`} className="mt-5 inline-flex rounded-full bg-emerald-800 px-4 py-2 text-sm font-medium text-white">
              Read Para
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
