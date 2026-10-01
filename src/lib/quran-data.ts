import fs from "fs";
import path from "path";

export type SurahType = "Makki" | "Madani";

export type Verse = {
  id: number;
  chapterId: number;
  verseNumber: number;
  text: string;
  transliteration: string;
  englishTranslation: string;
  urduTranslation: string;
  audioUrl?: string;
};

export type Surah = {
  id: number;
  name: string;
  englishName: string;
  urduName: string;
  transliteration: string;
  type: SurahType;
  totalVerses: number;
  slug: string;
  startPage?: number;
  verses: Verse[];
};

export type ParaInfo = {
  number: number;
  name: string;
  urduName: string;
  startSurahId: number;
  startAyah: number;
  endSurahId: number;
  endAyah: number;
  startPage: number;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");
}

interface RawChapter {
  id: number;
  name: string;
  transliteration: string;
  translation?: string;
  type: "meccan" | "medinan";
  total_verses: number;
  verses: Array<{
    id: number;
    text: string;
    translation?: string;
    transliteration?: string;
  }>;
}

// Load authentic translations
const distDir = path.join(process.cwd(), "node_modules", "quran-json", "dist");
const chaptersDir = path.join(distDir, "chapters");

let rawEnData: RawChapter[] = [];
let rawUrData: RawChapter[] = [];

try {
  const urPath = path.join(distDir, "quran_ur.json");
  if (fs.existsSync(urPath)) {
    rawUrData = JSON.parse(fs.readFileSync(urPath, "utf8"));
  }
} catch (e) {
  console.error("Could not load quran_ur.json", e);
}

try {
  const enPath = path.join(distDir, "quran_en.json");
  if (fs.existsSync(enPath)) {
    rawEnData = JSON.parse(fs.readFileSync(enPath, "utf8"));
  }
} catch (e) {
  console.error("Could not load quran_en.json", e);
}

const chapterFiles = fs
  .readdirSync(chaptersDir)
  .filter((file) => file.endsWith(".json") && file !== "index.json")
  .sort((a, b) => Number(a.replace(/\.json$/, "")) - Number(b.replace(/\.json$/, "")));

export const quranSurahs: Surah[] = chapterFiles.map((file) => {
  const chapter = JSON.parse(fs.readFileSync(path.join(chaptersDir, file), "utf8")) as RawChapter;
  const urChapter = rawUrData.find((c) => c.id === chapter.id);
  const enChapter = rawEnData.find((c) => c.id === chapter.id);

  return {
    id: chapter.id,
    name: chapter.name,
    englishName: enChapter?.translation ?? chapter.transliteration,
    urduName: urChapter?.translation ?? chapter.name,
    transliteration: chapter.transliteration,
    type: chapter.type === "meccan" ? "Makki" : "Madani",
    totalVerses: chapter.total_verses,
    slug: slugify(chapter.transliteration),
    verses: chapter.verses.map((verse, index) => {
      const urVerse = urChapter?.verses[index];
      const enVerse = enChapter?.verses[index];
      
      // Formatting padded 3-digit Surah and Ayah for audio recitations
      const sNum = String(chapter.id).padStart(3, "0");
      const aNum = String(verse.id).padStart(3, "0");

      return {
        id: verse.id,
        chapterId: chapter.id,
        verseNumber: verse.id,
        text: verse.text,
        transliteration: verse.transliteration || "",
        englishTranslation: enVerse?.translation || `Verse ${verse.id} of ${chapter.transliteration}`,
        urduTranslation: urVerse?.translation || `آیت ${verse.id} ${chapter.name}`,
        audioUrl: `https://everyayah.com/data/Alafasy_128kbps/${sNum}${aNum}.mp3`,
      };
    }),
  };
});

const verseData = quranSurahs.flatMap((surah) =>
  surah.verses.map((verse) => ({
    ...verse,
    chapterName: surah.name,
    chapterTransliteration: surah.transliteration,
  })),
);

export const quranAyahs = verseData;

export const quranSearchIndex = quranAyahs.map((ayah) => ({
  ...ayah,
  surah: quranSurahs.find((surah) => surah.id === ayah.chapterId) ?? quranSurahs[0],
}));

export const popularSurahs = [
  1, 2, 3, 18, 36, 55, 56, 67, 112, 113, 114,
].map((id) => quranSurahs.find((surah) => surah.id === id) as Surah).filter(Boolean);

export const quranParas: ParaInfo[] = [
  { number: 1, name: "Alif Lam Meem", urduName: "الم", startSurahId: 1, startAyah: 1, endSurahId: 2, endAyah: 141, startPage: 1 },
  { number: 2, name: "Sayaqool", urduName: "سیقول", startSurahId: 2, startAyah: 142, endSurahId: 2, endAyah: 252, startPage: 22 },
  { number: 3, name: "Tilka-r-Rusul", urduName: "تلک الرسل", startSurahId: 2, startAyah: 253, endSurahId: 3, endAyah: 92, startPage: 42 },
  { number: 4, name: "Lan Tanaloo", urduName: "لن تنالوا", startSurahId: 3, startAyah: 93, endSurahId: 4, endAyah: 23, startPage: 62 },
  { number: 5, name: "Wal Muhsanat", urduName: "والمحصنات", startSurahId: 4, startAyah: 24, endSurahId: 4, endAyah: 147, startPage: 82 },
  { number: 6, name: "La Yuhibbullah", urduName: "لا یحب اللہ", startSurahId: 4, startAyah: 148, endSurahId: 5, endAyah: 81, startPage: 102 },
  { number: 7, name: "Wa Iza Sami'oo", urduName: "واذا سمعوا", startSurahId: 5, startAyah: 82, endSurahId: 6, endAyah: 110, startPage: 122 },
  { number: 8, name: "Wa Law Annana", urduName: "ولو اننا", startSurahId: 6, startAyah: 111, endSurahId: 7, endAyah: 87, startPage: 142 },
  { number: 9, name: "Qalal Mala'u", urduName: "قال الملا", startSurahId: 7, startAyah: 88, endSurahId: 8, endAyah: 40, startPage: 162 },
  { number: 10, name: "Wa A'lamoo", urduName: "واعلموا", startSurahId: 8, startAyah: 41, endSurahId: 9, endAyah: 92, startPage: 182 },
  { number: 11, name: "Ya'tadhiroon", urduName: "یعتذرون", startSurahId: 9, startAyah: 93, endSurahId: 11, endAyah: 5, startPage: 202 },
  { number: 12, name: "Wa Ma Min Da'abbatin", urduName: "وما من دابۃ", startSurahId: 11, startAyah: 6, endSurahId: 12, endAyah: 52, startPage: 222 },
  { number: 13, name: "Wa Ma Ubri'oo", urduName: "وما ابری", startSurahId: 12, startAyah: 53, endSurahId: 14, endAyah: 52, startPage: 242 },
  { number: 14, name: "Rubama", urduName: "ربما", startSurahId: 15, startAyah: 1, endSurahId: 16, endAyah: 128, startPage: 262 },
  { number: 15, name: "Subhana-llazee", urduName: "سبحن الذی", startSurahId: 17, startAyah: 1, endSurahId: 18, endAyah: 74, startPage: 282 },
  { number: 16, name: "Qala Alam", urduName: "قال الم", startSurahId: 18, startAyah: 75, endSurahId: 20, endAyah: 135, startPage: 302 },
  { number: 17, name: "Iqtaraba", urduName: "اقترب", startSurahId: 21, startAyah: 1, endSurahId: 22, endAyah: 78, startPage: 322 },
  { number: 18, name: "Qad Aflaha", urduName: "قد افلح", startSurahId: 23, startAyah: 1, endSurahId: 25, endAyah: 20, startPage: 342 },
  { number: 19, name: "Wa Qalallazeena", urduName: "وقال الذین", startSurahId: 25, startAyah: 21, endSurahId: 27, endAyah: 55, startPage: 362 },
  { number: 20, name: "Amman Khalaqa", urduName: "امن خلق", startSurahId: 27, startAyah: 56, endSurahId: 29, endAyah: 45, startPage: 382 },
  { number: 21, name: "Utlu Ma Oohiya", urduName: "اتل ما اوحی", startSurahId: 29, startAyah: 46, endSurahId: 33, endAyah: 30, startPage: 402 },
  { number: 22, name: "Wa Man Yaqnut", urduName: "ومن یقنت", startSurahId: 33, startAyah: 31, endSurahId: 36, endAyah: 27, startPage: 422 },
  { number: 23, name: "Wa Maliya", urduName: "وما لی", startSurahId: 36, startAyah: 28, endSurahId: 39, endAyah: 31, startPage: 442 },
  { number: 24, name: "Fa Man Azlamu", urduName: "فمن اظلم", startSurahId: 39, startAyah: 32, endSurahId: 41, endAyah: 46, startPage: 462 },
  { number: 25, name: "Ilaihi Yuraddu", urduName: "الیہ یرد", startSurahId: 41, startAyah: 47, endSurahId: 45, endAyah: 37, startPage: 482 },
  { number: 26, name: "Ha'a Meem", urduName: "حم", startSurahId: 46, startAyah: 1, endSurahId: 51, endAyah: 30, startPage: 502 },
  { number: 27, name: "Qala Fama Khatbukum", urduName: "قال فما خطبکم", startSurahId: 51, startAyah: 31, endSurahId: 57, endAyah: 29, startPage: 522 },
  { number: 28, name: "Qad Sami'a-llahu", urduName: "قد سمع اللہ", startSurahId: 58, startAyah: 1, endSurahId: 66, endAyah: 12, startPage: 542 },
  { number: 29, name: "Tabaraka-llazee", urduName: "تبارک الذی", startSurahId: 67, startAyah: 1, endSurahId: 77, endAyah: 50, startPage: 562 },
  { number: 30, name: "Amma Yatasa'aloon", urduName: "عم یتساءلون", startSurahId: 78, startAyah: 1, endSurahId: 114, endAyah: 6, startPage: 582 },
];

export function getSurahBySlug(slug: string) {
  return quranSurahs.find((surah) => surah.slug === slug) ?? quranSurahs[0];
}

export function getSurahById(id: number) {
  return quranSurahs.find((surah) => surah.id === id) ?? quranSurahs[0];
}

export function getParaByNumber(number: number) {
  return quranParas.find((para) => para.number === number) ?? quranParas[0];
}

export function getDailyAyah() {
  const dayIndex = new Date().getUTCDate();
  return quranAyahs[dayIndex % quranAyahs.length];
}

export function searchQuran(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return quranSearchIndex
    .filter((ayah) => {
      return (
        ayah.text.toLowerCase().includes(normalized) ||
        ayah.transliteration.toLowerCase().includes(normalized) ||
        ayah.englishTranslation.toLowerCase().includes(normalized) ||
        ayah.urduTranslation.toLowerCase().includes(normalized) ||
        ayah.chapterName.toLowerCase().includes(normalized) ||
        ayah.chapterTransliteration.toLowerCase().includes(normalized)
      );
    })
    .slice(0, 40);
}

export const reciters = [
  { id: "alafasy", name: "Mishary Rashid Alafasy", language: "Arabic" },
  { id: "abdul-basit", name: "Abdul Basit (Murattal)", language: "Arabic" },
  { id: "abdullah-basfar", name: "Abdullah Basfar", language: "Arabic" },
  { id: "mahmood-khaleel-al-husary", name: "Mahmood Khaleel Al-Husary", language: "Arabic" },
];

export const duas = [
  { id: "morning", title: "Morning", category: "Morning", source: "Sahih Muslim and Sunnah collections" },
  { id: "evening", title: "Evening", category: "Evening", source: "Sunnah references" },
  { id: "travel", title: "Travel", category: "Travel", source: "Verified Sunnah sources" },
  { id: "protection", title: "Protection", category: "Protection", source: "Authentic supplications" },
  { id: "forgiveness", title: "Forgiveness", category: "Forgiveness", source: "Hadith references" },
  { id: "daily-life", title: "Daily Life", category: "Daily life", source: "Sunnah and authentic compilations" },
];

export const allahNames = [
  { arabic: "ٱللّٰه", transliteration: "Allah", meaning: "The Greatest Name; God" },
  { arabic: "ٱلرَّحْمَـٰن", transliteration: "Ar-Rahman", meaning: "The Most Compassionate" },
  { arabic: "ٱلرَّحِيم", transliteration: "Ar-Rahim", meaning: "The Most Merciful" },
  { arabic: "ٱلْمَلِك", transliteration: "Al-Malik", meaning: "The King" },
  { arabic: "ٱلْقُدُّوس", transliteration: "Al-Quddus", meaning: "The Pure" },
  { arabic: "ٱلسَّلَام", transliteration: "As-Salam", meaning: "The Source of Peace" },
  { arabic: "ٱلْمُؤْمِن", transliteration: "Al-Mu'min", meaning: "The Giver of Security" },
  { arabic: "ٱلْمُهَيْمِن", transliteration: "Al-Muhaymin", meaning: "The Guardian" },
  { arabic: "ٱلْعَزِيز", transliteration: "Al-Aziz", meaning: "The Almighty" },
  { arabic: "ٱلْجَبَّار", transliteration: "Al-Jabbar", meaning: "The Compeller" },
];

export function getMetadataForSurah(slug: string) {
  const surah = getSurahBySlug(slug);
  return {
    title: `Surah ${surah.transliteration} Read Online With Urdu & English Translation | NoorsQuran`,
    description: `Read Surah ${surah.transliteration} (${surah.name}) online with authentic Arabic text, full Urdu translation, English translation and audio recitation.`,
  };
}
