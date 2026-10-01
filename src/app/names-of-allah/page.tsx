import { allahNames } from "@/lib/quran-data";

export default function AllahNamesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">Names of Allah</p>
        <h1 className="mt-2 text-4xl font-semibold text-slate-900">99 beautiful names</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {allahNames.map((name, index) => (
          <article key={`${name.transliteration}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{index + 1}</p>
            <p className="mt-3 text-right text-4xl text-slate-900" dir="rtl">{name.arabic}</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">{name.transliteration}</p>
            <p className="mt-2 text-sm text-slate-600">{name.meaning}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
