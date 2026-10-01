import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const remotePdfUrl =
    process.env.QURAN_PDF_URL ||
    "https://ia800708.us.archive.org/view_archive.php?archive=/16/items/Quran-15-Lines/Quran-15-Lines.zip&file=Quran-15-Lines.pdf";

  const filePath = path.join(process.cwd(), "full quran", "quran pak.pdf");

  if (!fs.existsSync(filePath)) {
    // If local file is not present (e.g. on Vercel deployment), redirect to the cloud PDF URL
    return NextResponse.redirect(remotePdfUrl, 307);
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = request.headers.get("range");

  // If download param requested, trigger attachment download
  const isDownload = request.nextUrl.searchParams.get("download") === "true";
  const disposition = isDownload
    ? 'attachment; filename="Quran-Pak-Full.pdf"'
    : 'inline; filename="Quran-Pak-Full.pdf"';

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;

    const fileStream = fs.createReadStream(filePath, { start, end });
    const readableStream = new ReadableStream({
      start(controller) {
        fileStream.on("data", (chunk) => controller.enqueue(chunk));
        fileStream.on("end", () => controller.close());
        fileStream.on("error", (err) => controller.error(err));
      },
      cancel() {
        fileStream.destroy();
      },
    });

    return new NextResponse(readableStream, {
      status: 206,
      headers: {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize.toString(),
        "Content-Type": "application/pdf",
        "Content-Disposition": disposition,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  const fileStream = fs.createReadStream(filePath);
  const readableStream = new ReadableStream({
    start(controller) {
      fileStream.on("data", (chunk) => controller.enqueue(chunk));
      fileStream.on("end", () => controller.close());
      fileStream.on("error", (err) => controller.error(err));
    },
    cancel() {
      fileStream.destroy();
    },
  });

  return new NextResponse(readableStream, {
    status: 200,
    headers: {
      "Content-Length": fileSize.toString(),
      "Content-Type": "application/pdf",
      "Content-Disposition": disposition,
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
