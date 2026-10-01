import Link from "next/link";
import { Bookmark, Headphones, Share2, Sparkles } from "lucide-react";
import { getDailyAyah, getSurahById } from "@/lib/quran-data";

export function DailyAyah() {
  const ayah = getDailyAyah();
  const surah = getSurahById(ayah.chapterId);

  return (
    <section className="rounded-[2rem] border border-emerald-800/10 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-emerald-700">Daily Ayah</p>
            <h3 className="text-lg font-semibold text-slate-900">Reflection of the day</h3>
          </div>
        </div>
        <button className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-700" aria-label="Bookmark this ayah">
          <Bookmark size={18} />
        </button>
      </div>

      <div className="space-y-6">
        <p className="text-right text-3xl leading-loose text-slate-900 sm:text-4xl" dir="rtl">
          {ayah.text}
        </p>

        <div className="space-y-2 border-l border-emerald-200 pl-4">
          <p className="text-sm font-medium text-emerald-700">{surah.englishName} · Ayah {ayah.verseNumber}</p>
          <p className="text-sm text-slate-600">{ayah.englishTranslation}</p>
          <p className="text-sm text-slate-600">{ayah.urduTranslation}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href={`/quran/surah/${surah.slug}`} className="inline-flex items-center gap-2 rounded-full bg-emerald-800 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
            <Headphones size={16} />
            Listen
          </Link>
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
            <Share2 size={16} />
            Share
          </button>
        </div>
      </div>
    </section>
  );
}
