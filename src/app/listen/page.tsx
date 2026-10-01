import Link from "next/link";
import { reciters } from "@/lib/quran-data";

export default function ListenPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">Listen</p>
        <h1 className="mt-2 text-4xl font-semibold text-slate-900">Quran recitation</h1>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Now playing</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Al-Fatihah</h2>
          </div>
          <Link href="/listen/reciters" className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
            Select reciter
          </Link>
        </div>

        <div className="space-y-4">
          <div className="h-2 rounded-full bg-slate-200">
            <div className="h-2 w-1/3 rounded-full bg-emerald-700" />
          </div>
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>00:30</span>
            <span>04:15</span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reciters.map((reciter) => (
          <div key={reciter.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-lg font-semibold text-slate-900">{reciter.name}</p>
            <p className="mt-2 text-sm text-slate-600">{reciter.language}</p>
            <button className="mt-4 rounded-full bg-emerald-800 px-4 py-2 text-sm font-medium text-white">Choose reciter</button>
          </div>
        ))}
      </div>
    </main>
  );
}
