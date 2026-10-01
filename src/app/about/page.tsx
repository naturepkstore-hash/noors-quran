export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">About</p>
      <h1 className="mt-2 text-4xl font-semibold text-slate-900">A peaceful Quran experience</h1>
      <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
        <p>
          NoorsQuran is designed to help people read, listen, search and reflect on the Quran in a respectful and dignified environment.
        </p>
        <p>
          The site is built around the core reading experience and keeps the Quran text, translations and source metadata separate so they can be validated and expanded responsibly.
        </p>
      </div>
    </main>
  );
}
