import Link from "next/link";
import { Headphones } from "lucide-react";
import type { Surah } from "@/lib/quran-data";

type QuranCardProps = {
  surah: Surah;
};

export function QuranCard({ surah }: QuranCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-emerald-700">{surah.id}</span>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">{surah.type}</span>
      </div>

      <div className="mb-4 text-right" dir="rtl">
        <p className="text-2xl font-semibold text-slate-900">{surah.name}</p>
      </div>

      <div className="space-y-2 text-sm text-slate-600">
        <p><span className="font-medium text-slate-800">Transliteration:</span> {surah.transliteration}</p>
        <p><span className="font-medium text-slate-800">English:</span> {surah.englishName}</p>
        <p><span className="font-medium text-slate-800">Urdu:</span> {surah.urduName}</p>
        <p><span className="font-medium text-slate-800">Ayahs:</span> {surah.totalVerses}</p>
      </div>

      <div className="mt-5 flex gap-2">
        <Link href={`/quran/surah/${surah.slug}`} className="flex-1 rounded-full bg-emerald-800 px-4 py-2 text-center text-sm font-medium text-white hover:bg-emerald-700">
          Read
        </Link>
        <Link href={`/listen/surah/${surah.slug}`} className="flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-emerald-200 hover:text-emerald-800">
          <Headphones size={15} />
        </Link>
      </div>
    </div>
  );
}
