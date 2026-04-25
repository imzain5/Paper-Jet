/**
 * PaperJet conversion engine
 * Everything runs client-side. No server, no upload, no cost.
 * That's why ad revenue is pure margin on Vercel's free tier.
 */

export type SupportedKind = "image" | "docx" | "txt" | "pdf";

export const ACCEPTED_MIME: Record<SupportedKind, string[]> = {
  image: ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"],
  docx: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  txt: ["text/plain", "text/markdown"],
  pdf: ["application/pdf"],
};

export function detectKind(file: File): SupportedKind | null {
  const name = file.name.toLowerCase();
  if (file.type.startsWith("image/")) return "image";
  if (name.endsWith(".docx")) return "docx";
  if (name.endsWith(".txt") || name.endsWith(".md")) return "txt";
  if (name.endsWith(".pdf") || file.type === "application/pdf") return "pdf";
  return null;
}

export function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

/* ----------------------------- IMAGE → PDF ----------------------------- */
export async function imagesToPdf(files: File[]): Promise<Blob> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 24;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const dataUrl = await readAsDataURL(file);
    const img = await loadImage(dataUrl);

    // Fit image inside page with aspect ratio preserved
    const maxW = pageW - margin * 2;
    const maxH = pageH - margin * 2;
    const ratio = Math.min(maxW / img.width, maxH / img.height);
    const w = img.width * ratio;
    const h = img.height * ratio;
    const x = (pageW - w) / 2;
    const y = (pageH - h) / 2;

    if (i > 0) doc.addPage();
    const fmt = file.type.includes("png") ? "PNG" : file.type.includes("webp") ? "WEBP" : "JPEG";
    doc.addImage(dataUrl, fmt, x, y, w, h, undefined, "FAST");
  }

  return doc.output("blob");
}

/* ----------------------------- DOCX → PDF ------------------------------ */
export async function docxToPdf(file: File): Promise<Blob> {
  const [{ default: mammoth }, { jsPDF }] = await Promise.all([
    import("mammoth/mammoth.browser"),
    import("jspdf"),
  ]);

  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  const text = result.value;

  return textToPdfInternal(text, file.name.replace(/\.docx$/i, ""));
}

/* ----------------------------- TEXT → PDF ------------------------------ */
export async function textToPdf(file: File): Promise<Blob> {
  const text = await file.text();
  return textToPdfInternal(text, file.name.replace(/\.(txt|md)$/i, ""));
}

async function textToPdfInternal(text: string, title: string): Promise<Blob> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 56;
  const maxLineW = pageW - margin * 2;
  const fontSize = 11;
  const lineHeight = fontSize * 1.55;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(fontSize);
  doc.setTextColor(20, 20, 20);

  // Title header
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(title || "Document", margin, margin + 8);
  doc.setFontSize(fontSize);
  doc.setFont("helvetica", "normal");

  let y = margin + 40;
  const lines = doc.splitTextToSize(text, maxLineW) as string[];

  for (const line of lines) {
    if (y > pageH - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(line, margin, y);
    y += lineHeight;
  }

  return doc.output("blob");
}

/* ----------------------------- MERGE PDFs ------------------------------ */
export async function mergePdfs(files: File[]): Promise<Blob> {
  const { PDFDocument } = await import("pdf-lib");
  const out = await PDFDocument.create();

  for (const file of files) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const src = await PDFDocument.load(bytes);
    const pages = await out.copyPages(src, src.getPageIndices());
    pages.forEach((p) => out.addPage(p));
  }

  const merged = await out.save();
  return new Blob([merged as BlobPart], { type: "application/pdf" });
}

/* ----------------------------- COMPRESS PDF ----------------------------- */
export async function compressPdf(file: File): Promise<Blob> {
  const { PDFDocument } = await import("pdf-lib");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const doc = await PDFDocument.load(bytes);
  // Re-save with object stream optimization. Real compression would
  // re-encode images server-side; this strips redundant objects.
  const out = await doc.save({ useObjectStreams: true });
  return new Blob([out as BlobPart], { type: "application/pdf" });
}

/* ------------------------------ HELPERS -------------------------------- */
function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 800);
}
