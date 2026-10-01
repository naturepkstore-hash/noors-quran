"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Download,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  BookText,
  FileText,
} from "lucide-react";

interface ParaItem {
  number: number;
  name: string;
  urduName: string;
  startPage: number;
}

interface SurahItem {
  id: number;
  name: string;
  transliteration: string;
  urduName: string;
  totalVerses: number;
  slug: string;
}

interface PdfMushafReaderProps {
  paras: ParaItem[];
  surahs: SurahItem[];
}

export function PdfMushafReader({ paras, surahs }: PdfMushafReaderProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"reader" | "paras" | "surahs">("reader");
  const [viewTheme, setViewTheme] = useState<"cream" | "white" | "dark">("cream");
  const containerRef = useRef<HTMLDivElement>(null);

  const totalQuranPages = 604; // Standard 15-line / 13-line Mushaf page count

  const handlePageChange = (newPage: number) => {
    const validPage = Math.max(1, Math.min(totalQuranPages, newPage));
    setCurrentPage(validPage);
    setActiveTab("reader");
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error("Fullscreen error:", err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.error("Exit fullscreen error:", err);
      });
      setIsFullscreen(false);
    }
  };

  const pdfUrl = `/api/quran-pdf#page=${currentPage}&zoom=${zoomLevel}`;

  const bgStyles = {
    cream: "bg-[#f4ebd0] border-[#d8c7a1]",
    white: "bg-white border-slate-200",
    dark: "bg-[#16221d] border-[#253d33] text-white",
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col rounded-3xl border shadow-2xl transition-colors duration-300 overflow-hidden ${
        bgStyles[viewTheme]
      } ${isFullscreen ? "fixed inset-0 z-50 rounded-none h-screen w-screen" : "min-h-[85vh]"}`}
    >
      {/* Top Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 bg-black/5 px-4 py-3 sm:px-6 backdrop-blur-md">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-black/10 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab("reader")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTab === "reader"
                ? "bg-[#0f4c3a] text-white shadow-sm"
                : "text-[#17362b] hover:bg-black/5"
            }`}
          >
            <BookOpen size={14} />
            <span>Mushaf View</span>
          </button>
          <button
            onClick={() => setActiveTab("paras")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTab === "paras"
                ? "bg-[#0f4c3a] text-white shadow-sm"
                : "text-[#17362b] hover:bg-black/5"
            }`}
          >
            <Layers size={14} />
            <span>30 Paras</span>
          </button>
          <button
            onClick={() => setActiveTab("surahs")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTab === "surahs"
                ? "bg-[#0f4c3a] text-white shadow-sm"
                : "text-[#17362b] hover:bg-black/5"
            }`}
          >
            <FileText size={14} />
            <span>114 Surahs</span>
          </button>
        </div>

        {/* Page Jumping & Navigator */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/80 text-[#0f4c3a] shadow-sm hover:bg-white disabled:opacity-40"
            title="Previous Page"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1 rounded-xl shadow-sm text-xs font-medium text-slate-800">
            <span>Page</span>
            <input
              type="number"
              min={1}
              max={totalQuranPages}
              value={currentPage}
              onChange={(e) => handlePageChange(parseInt(e.target.value) || 1)}
              className="w-12 bg-transparent text-center font-bold text-[#0f4c3a] outline-none"
            />
            <span className="text-slate-400">/ {totalQuranPages}</span>
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalQuranPages}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/80 text-[#0f4c3a] shadow-sm hover:bg-white disabled:opacity-40"
            title="Next Page"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Quick Tools: Zoom, Theme, Download, Fullscreen */}
        <div className="flex items-center gap-2">
          {/* Zoom */}
          <div className="hidden sm:flex items-center gap-1 bg-white/80 px-2 py-1 rounded-xl shadow-sm">
            <button
              onClick={() => setZoomLevel((z) => Math.max(50, z - 15))}
              className="p-1 text-slate-600 hover:text-[#0f4c3a]"
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <span className="text-[11px] font-medium text-slate-700 w-9 text-center">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(200, z + 15))}
              className="p-1 text-slate-600 hover:text-[#0f4c3a]"
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
          </div>

          {/* Color Themes */}
          <div className="flex items-center gap-1 bg-white/80 p-1 rounded-xl shadow-sm">
            <button
              onClick={() => setViewTheme("cream")}
              className={`h-5 w-5 rounded-full border border-amber-300 bg-[#f7eed4] ${
                viewTheme === "cream" ? "ring-2 ring-[#0f4c3a]" : ""
              }`}
              title="Warm Cream Mushaf"
            />
            <button
              onClick={() => setViewTheme("white")}
              className={`h-5 w-5 rounded-full border border-slate-300 bg-white ${
                viewTheme === "white" ? "ring-2 ring-[#0f4c3a]" : ""
              }`}
              title="Pure White"
            />
            <button
              onClick={() => setViewTheme("dark")}
              className={`h-5 w-5 rounded-full border border-slate-700 bg-[#16221d] ${
                viewTheme === "dark" ? "ring-2 ring-emerald-400" : ""
              }`}
              title="Dark Mode"
            />
          </div>

          {/* Download Original PDF */}
          <a
            href="/api/quran-pdf?download=true"
            download="Quran-Pak-Full.pdf"
            className="flex items-center gap-1.5 bg-[#0f4c3a] text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow hover:bg-[#155e48] transition"
            title="Download Full Quran PDF (370MB)"
          >
            <Download size={14} />
            <span className="hidden md:inline">Download</span>
          </a>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/80 text-slate-700 shadow-sm hover:bg-white"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Reading Mode"}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex flex-col min-h-[700px] w-full bg-[#1b2a24]/10">
        {activeTab === "reader" && (
          <div className="relative w-full h-full flex-1 min-h-[720px] flex flex-col">
            <iframe
              src={pdfUrl}
              className="w-full h-full flex-1 border-0 min-h-[720px]"
              title="Full Quran PDF Reader"
            />

            {/* Bottom Floating Quick Bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl border border-slate-200/80 z-20">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="flex items-center gap-1 text-xs font-semibold text-[#0f4c3a] hover:underline disabled:opacity-40"
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <div className="h-4 w-px bg-slate-200" />
              <span className="text-xs font-bold text-slate-800">
                Quran Majeed — Page {currentPage}
              </span>
              <div className="h-4 w-px bg-slate-200" />
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalQuranPages}
                className="flex items-center gap-1 text-xs font-semibold text-[#0f4c3a] hover:underline disabled:opacity-40"
              >
                Next <ChevronRight size={16} />
              </button>
              <div className="h-4 w-px bg-slate-200" />
              <a
                href="/api/quran-pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-[#0f4c3a]"
                title="Open in new window"
              >
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        )}

        {/* 30 Paras Fast Jump Tab */}
        {activeTab === "paras" && (
          <div className="p-6 overflow-y-auto max-h-[780px] grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {paras.map((para) => (
              <button
                key={para.number}
                onClick={() => handlePageChange(para.startPage)}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#0f4c3a] hover:bg-[#edf6ef] transition text-left group"
              >
                <div>
                  <span className="text-xs font-bold text-[#0f4c3a] block">Para {para.number}</span>
                  <span className="text-sm font-semibold text-slate-800 group-hover:text-[#0f4c3a]">
                    {para.name}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Start Page: {para.startPage}
                  </span>
                </div>
                <div className="text-right font-semibold text-lg text-[#0f4c3a]" dir="rtl">
                  {para.urduName}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* 114 Surahs Fast Jump Tab */}
        {activeTab === "surahs" && (
          <div className="p-6 overflow-y-auto max-h-[780px] grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {surahs.map((surah) => (
              <div
                key={surah.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white/90 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#0f4c3a] transition"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#edf6ef] text-[11px] font-bold text-[#0f4c3a]">
                      {surah.id}
                    </span>
                    <span className="text-sm font-semibold text-slate-800">
                      {surah.transliteration}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                    <span>{surah.urduName}</span>
                    <span>•</span>
                    <span>{surah.totalVerses} Ayahs</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/quran/surah/${surah.slug}`}
                    className="p-1.5 text-xs text-slate-600 hover:text-[#0f4c3a] bg-slate-100 rounded-lg hover:bg-slate-200"
                    title="Read Digital Verses & Audio"
                  >
                    <BookText size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
