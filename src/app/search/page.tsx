import { searchQuran } from "@/lib/quran-data";

export default function SearchPage() {
  const results = searchQuran("bismillah");

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">Search</p>
        <h1 className="mt-2 text-4xl font-semibold text-slate-900">Search the Quran</h1>
      </div>

      <form className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <input
          type="search"
          name="q"
          defaultValue="bismillah"
          placeholder="Search surahs, ayahs, translations..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-400"
        />
      </form>

      <div className="space-y-4">
        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
            No results found.
          </div>
        ) : (
          results.map((ayah) => (
            <article key={ayah.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-emerald-700">{ayah.chapterName} · Ayah {ayah.verseNumber}</p>
              <p className="mt-2 text-right text-2xl text-slate-900" dir="rtl">{ayah.text}</p>
              <p className="mt-3 text-sm text-slate-600">{ayah.englishTranslation}</p>
            </article>
          ))
        )}
      </div>
    </main>
  );
}
