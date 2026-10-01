import { duas } from "@/lib/quran-data";

export default function DuasPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">Duas</p>
        <h1 className="mt-2 text-4xl font-semibold text-slate-900">Daily supplications</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {duas.map((dua) => (
          <article key={dua.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">{dua.category}</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">{dua.title}</h2>
            <p className="mt-3 text-sm text-slate-600">Source: {dua.source}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
