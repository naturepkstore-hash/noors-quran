import { Metadata } from "next";
import Link from "next/link";
import { Download, BookOpen, Layers, BookText, Sparkles, ArrowLeft } from "lucide-react";
import { PdfMushafReader } from "@/components/pdf-mushaf-reader";
import { quranParas, quranSurahs } from "@/lib/quran-data";

export const metadata: Metadata = {
  title: "Read Full Quran PDF (Mushaf) | NoorsQuran",
  description:
    "Read the complete Quran Majeed PDF Mushaf online with clear 15-line script, easy page flipping, 30 Paras index, 114 Surahs navigation, and instant download.",
};

export default function FullQuranPdfPage() {
  const paraData = quranParas.map((p) => ({
    number: p.number,
    name: p.name,
    urduName: p.urduName,
    startPage: p.startPage,
  }));

  const surahData = quranSurahs.map((s) => ({
    id: s.id,
    name: s.name,
    transliteration: s.transliteration,
    urduName: s.urduName,
    totalVerses: s.totalVerses,
    slug: s.slug,
  }));

  return (
    <main className="bg-[#f7f4ee] min-h-screen py-8 lg:py-12">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Page Top Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#5d7a6c]">
              <Link href="/quran" className="hover:underline flex items-center gap-1">
                <ArrowLeft size={13} /> Quran
              </Link>
              <span>/</span>
              <span>Full Mushaf PDF</span>
            </div>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#17362b]">
              Full Quran Majeed PDF
            </h1>
            <p className="mt-1 text-sm text-[#5d7068]">
              Complete authentic Mushaf with 30 Paras, 114 Surahs index, zoom and offline download.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/quran/surah"
              className="inline-flex items-center gap-2 rounded-2xl border border-[#dfe7de] bg-white px-4 py-2.5 text-xs font-semibold text-[#17362b] shadow-sm hover:border-[#ccd9cf] hover:bg-[#faf8f5] transition"
            >
              <BookText size={15} className="text-[#0f4c3a]" />
              Digital Ayah View
            </Link>
            <a
              href="/api/quran-pdf?download=true"
              download="Quran-Pak-Full.pdf"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#0f4c3a] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#155e48] transition"
            >
              <Download size={15} />
              Download PDF (370 MB)
            </a>
          </div>
        </div>

        {/* The PDF Reader Component */}
        <PdfMushafReader paras={paraData} surahs={surahData} />

        {/* Feature Highlights below viewer */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-[#dfe7de] bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#edf6ef] text-[#0f4c3a] mb-4">
              <BookOpen size={18} />
            </div>
            <h3 className="text-base font-semibold text-[#17362b]">Original Mushaf Format</h3>
            <p className="mt-2 text-xs leading-5 text-[#5d7068]">
              Authentic printed Quran layout just like holding the physical Quran Majeed in your hands.
            </p>
          </div>

          <div className="rounded-3xl border border-[#dfe7de] bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#edf6ef] text-[#0f4c3a] mb-4">
              <Layers size={18} />
            </div>
            <h3 className="text-base font-semibold text-[#17362b]">All 30 Paras & 114 Surahs</h3>
            <p className="mt-2 text-xs leading-5 text-[#5d7068]">
              Easily jump to any Para or Surah instantly using the index tabs with page navigation.
            </p>
          </div>

          <div className="rounded-3xl border border-[#dfe7de] bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#edf6ef] text-[#0f4c3a] mb-4">
              <Sparkles size={18} />
            </div>
            <h3 className="text-base font-semibold text-[#17362b]">Offline Reading</h3>
            <p className="mt-2 text-xs leading-5 text-[#5d7068]">
              Download the full Quran PDF once and read offline anytime on your mobile, tablet or PC.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
