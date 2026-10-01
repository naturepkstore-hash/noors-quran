"use client";

import { useState, useRef } from "react";
import {
  Bookmark,
  Check,
  Copy,
  Pause,
  Play,
  Share2,
  SlidersHorizontal,
} from "lucide-react";
import type { Verse } from "@/lib/quran-data";

type QuranReaderProps = {
  verses: Verse[];
  surahName: string;
};

export function QuranReader({ verses, surahName }: QuranReaderProps) {
  const [playingAyahId, setPlayingAyahId] = useState<number | null>(null);
  const [copiedAyahId, setCopiedAyahId] = useState<number | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [showUrdu, setShowUrdu] = useState<boolean>(true);
  const [showEnglish, setShowEnglish] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("large");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = (verse: Verse) => {
    if (playingAyahId === verse.id) {
      if (audioRef.current) {
        audioRef.current.pause();
        setPlayingAyahId(null);
      }
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (verse.audioUrl) {
      const audio = new Audio(verse.audioUrl);
      audioRef.current = audio;
      setPlayingAyahId(verse.id);

      audio.play().catch((err) => {
        console.error("Audio play error:", err);
        setPlayingAyahId(null);
      });

      audio.onended = () => {
        setPlayingAyahId(null);
      };
    }
  };

  const handleCopy = (verse: Verse) => {
    const textToCopy = `${verse.text}\n\n${verse.urduTranslation ? `اردو ترجمہ: ${verse.urduTranslation}\n` : ""}${verse.englishTranslation ? `English: ${verse.englishTranslation}\n` : ""}(${surahName}, Ayah ${verse.verseNumber})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAyahId(verse.id);
    setTimeout(() => setCopiedAyahId(null), 2500);
  };

  const handleBookmark = (verseId: number) => {
    setBookmarkedIds((prev) =>
      prev.includes(verseId) ? prev.filter((id) => id !== verseId) : [...prev, verseId]
    );
  };

  const handleShare = async (verse: Verse) => {
    const shareData = {
      title: `${surahName} - Ayah ${verse.verseNumber}`,
      text: `${verse.text}\n${verse.urduTranslation}\n${verse.englishTranslation}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (e) {
        console.error("Share failed", e);
      }
    } else {
      handleCopy(verse);
    }
  };

  const arabicSizeClasses = {
    normal: "text-2xl leading-[2.2] sm:text-3xl",
    large: "text-3xl leading-[2.4] sm:text-4xl",
    xlarge: "text-4xl leading-[2.6] sm:text-5xl",
  };

  return (
    <div className="space-y-6">
      {/* Reader Toolbar / Customizer */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#dfe7de] bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#17362b]">
          <SlidersHorizontal size={15} className="text-[#0f4c3a]" />
          <span>Display Settings:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Translation Toggles */}
          <div className="flex items-center gap-1.5 bg-[#f5f8f5] p-1 rounded-xl text-xs">
            <button
              onClick={() => setShowUrdu(!showUrdu)}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                showUrdu
                  ? "bg-[#0f4c3a] text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              اردو ترجمہ
            </button>
            <button
              onClick={() => setShowEnglish(!showEnglish)}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                showEnglish
                  ? "bg-[#0f4c3a] text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              English
            </button>
          </div>

          {/* Font Size */}
          <div className="flex items-center gap-1 bg-[#f5f8f5] p-1 rounded-xl text-xs">
            <button
              onClick={() => setFontSize("normal")}
              className={`px-2.5 py-1 rounded-lg font-medium ${
                fontSize === "normal" ? "bg-white text-[#0f4c3a] shadow-xs font-bold" : "text-slate-600"
              }`}
            >
              A-
            </button>
            <button
              onClick={() => setFontSize("large")}
              className={`px-2.5 py-1 rounded-lg font-medium ${
                fontSize === "large" ? "bg-white text-[#0f4c3a] shadow-xs font-bold" : "text-slate-600"
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize("xlarge")}
              className={`px-2.5 py-1 rounded-lg font-medium ${
                fontSize === "xlarge" ? "bg-white text-[#0f4c3a] shadow-xs font-bold" : "text-slate-600"
              }`}
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* Verses List */}
      {verses.map((verse) => {
        const isPlaying = playingAyahId === verse.id;
        const isCopied = copiedAyahId === verse.id;
        const isBookmarked = bookmarkedIds.includes(verse.id);

        return (
          <article
            key={verse.id}
            id={`ayah-${verse.verseNumber}`}
            className={`rounded-3xl border transition-all p-5 sm:p-7 shadow-sm ${
              isPlaying
                ? "border-[#0f4c3a] bg-[#f7fbf8] ring-2 ring-[#0f4c3a]/20"
                : "border-[#dfe7de] bg-white hover:border-[#ccd9cf]"
            }`}
          >
            {/* Header: Action buttons & Ayah number */}
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-[#f0f4f1] pb-3.5">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <button
                  onClick={() => handlePlayAudio(verse)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    isPlaying
                      ? "bg-[#0f4c3a] text-white"
                      : "border border-[#dfe7de] bg-[#edf6ef] text-[#0f4c3a] hover:bg-[#dfeee1]"
                  }`}
                  aria-label={`Play ayah ${verse.verseNumber}`}
                >
                  {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                  <span>{isPlaying ? "Playing" : "Listen"}</span>
                </button>

                <button
                  onClick={() => handleBookmark(verse.id)}
                  className={`rounded-full border p-2 transition ${
                    isBookmarked
                      ? "border-amber-400 bg-amber-50 text-amber-600"
                      : "border-[#dfe7de] bg-[#faf8f5] text-slate-500 hover:text-[#0f4c3a]"
                  }`}
                  aria-label={`Bookmark ayah ${verse.verseNumber}`}
                  title="Bookmark"
                >
                  <Bookmark size={14} className={isBookmarked ? "fill-amber-500 text-amber-500" : ""} />
                </button>

                <button
                  onClick={() => handleCopy(verse)}
                  className="rounded-full border border-[#dfe7de] bg-[#faf8f5] p-2 text-slate-500 hover:text-[#0f4c3a] transition"
                  aria-label={`Copy ayah ${verse.verseNumber}`}
                  title="Copy Verse with Translations"
                >
                  {isCopied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                </button>

                <button
                  onClick={() => handleShare(verse)}
                  className="rounded-full border border-[#dfe7de] bg-[#faf8f5] p-2 text-slate-500 hover:text-[#0f4c3a] transition"
                  aria-label={`Share ayah ${verse.verseNumber}`}
                  title="Share Verse"
                >
                  <Share2 size={14} />
                </button>
              </div>

              <span className="rounded-full bg-[#edf6ef] px-3.5 py-1 text-xs font-bold text-[#0f4c3a]">
                Ayah {verse.verseNumber}
              </span>
            </div>

            {/* Arabic Text */}
            <p
              className={`text-right font-serif font-medium text-[#17362b] ${arabicSizeClasses[fontSize]}`}
              dir="rtl"
            >
              {verse.text}
            </p>

            {/* Transliteration */}
            {verse.transliteration && (
              <p className="mt-4 text-xs italic text-[#597167]">
                {verse.transliteration}
              </p>
            )}

            {/* Urdu & English Translations */}
            {(showUrdu || showEnglish) && (
              <div className="mt-5 space-y-3.5 border-t border-[#f0f4f1] pt-4">
                {showUrdu && verse.urduTranslation && (
                  <div className="text-right" dir="rtl">
                    <p className="text-base sm:text-lg leading-relaxed text-[#1e3c31]">
                      {verse.urduTranslation}
                    </p>
                  </div>
                )}

                {showEnglish && verse.englishTranslation && (
                  <div className="text-left" dir="ltr">
                    <p className="text-sm sm:text-base leading-relaxed text-[#41564f]">
                      {verse.englishTranslation}
                    </p>
                  </div>
                )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
