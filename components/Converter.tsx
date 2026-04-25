"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  Upload,
  FileText,
  ImageIcon,
  FileType2,
  Loader2,
  Check,
  X,
  Download,
  ArrowRight,
  Sparkles,
  Layers,
} from "lucide-react";
import {
  detectKind,
  humanSize,
  imagesToPdf,
  docxToPdf,
  textToPdf,
  mergePdfs,
  compressPdf,
  downloadBlob,
  type SupportedKind,
} from "@/lib/converters";

type Mode = "auto" | "merge" | "compress";

interface QueueItem {
  id: string;
  file: File;
  kind: SupportedKind | null;
}

const MODE_LABEL: Record<Mode, { title: string; sub: string; icon: React.ReactNode }> = {
  auto: {
    title: "Convert to PDF",
    sub: "Auto-detects images, Word, and text",
    icon: <Sparkles className="w-4 h-4" />,
  },
  merge: {
    title: "Merge PDFs",
    sub: "Combine multiple PDFs into one",
    icon: <Layers className="w-4 h-4" />,
  },
  compress: {
    title: "Compress PDF",
    sub: "Slim down a PDF file",
    icon: <FileType2 className="w-4 h-4" />,
  },
};

const KIND_ICON: Record<SupportedKind, React.ReactNode> = {
  image: <ImageIcon className="w-4 h-4" />,
  docx: <FileText className="w-4 h-4" />,
  txt: <FileText className="w-4 h-4" />,
  pdf: <FileType2 className="w-4 h-4" />,
};

const KIND_LABEL: Record<SupportedKind, string> = {
  image: "Image",
  docx: "Word",
  txt: "Text",
  pdf: "PDF",
};

export default function Converter() {
  const [mode, setMode] = useState<Mode>("auto");
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ name: string; size: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const accept = useMemo(() => {
    if (mode === "merge" || mode === "compress") return ".pdf,application/pdf";
    return ".pdf,.png,.jpg,.jpeg,.webp,.gif,.docx,.txt,.md,image/*,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain";
  }, [mode]);

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      setError(null);
      setDone(null);
      const arr = Array.from(files);
      const items: QueueItem[] = arr.map((f) => ({
        id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 7)}`,
        file: f,
        kind: detectKind(f),
      }));

      if (mode === "merge" || mode === "compress") {
        const filtered = items.filter((i) => i.kind === "pdf");
        if (filtered.length === 0) {
          setError("This mode only accepts PDF files.");
          return;
        }
        setQueue(mode === "compress" ? [filtered[0]] : (q) => [...q, ...filtered]);
        return;
      }

      const filtered = items.filter((i) => i.kind !== null);
      if (filtered.length === 0) {
        setError("Unsupported file type. Try images, Word, text, or PDF.");
        return;
      }
      setQueue((q) => [...q, ...filtered]);
    },
    [mode]
  );

  const removeItem = (id: string) => {
    setQueue((q) => q.filter((i) => i.id !== id));
  };

  const clear = () => {
    setQueue([]);
    setDone(null);
    setError(null);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  const handleConvert = async () => {
    if (queue.length === 0) return;
    setBusy(true);
    setError(null);
    setDone(null);

    try {
      let blob: Blob;
      let outName: string;

      if (mode === "merge") {
        blob = await mergePdfs(queue.map((q) => q.file));
        outName = "paperjet-merged.pdf";
      } else if (mode === "compress") {
        const f = queue[0].file;
        blob = await compressPdf(f);
        outName = f.name.replace(/\.pdf$/i, "") + "-compressed.pdf";
      } else {
        // auto convert
        const kinds = new Set(queue.map((q) => q.kind));
        if (kinds.size > 1 && !(kinds.has("image") && kinds.size === 1)) {
          // Mixed types — handle one at a time would need zip; for now require uniform
          if (queue.length > 1 && !queue.every((q) => q.kind === "image")) {
            throw new Error("Mixed file types — please convert one type at a time, or use only images for batching.");
          }
        }

        const first = queue[0];
        if (first.kind === "image") {
          blob = await imagesToPdf(queue.map((q) => q.file));
          outName = queue.length > 1 ? "paperjet-images.pdf" : first.file.name.replace(/\.[^.]+$/, "") + ".pdf";
        } else if (first.kind === "docx") {
          blob = await docxToPdf(first.file);
          outName = first.file.name.replace(/\.docx$/i, ".pdf");
        } else if (first.kind === "txt") {
          blob = await textToPdf(first.file);
          outName = first.file.name.replace(/\.(txt|md)$/i, ".pdf");
        } else if (first.kind === "pdf") {
          // already a PDF in auto mode — pass through
          blob = first.file;
          outName = first.file.name;
        } else {
          throw new Error("Unsupported file type.");
        }
      }

      downloadBlob(blob, outName);
      setDone({ name: outName, size: blob.size });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Conversion failed.";
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  const ctaDisabled = busy || queue.length === 0 || (mode === "merge" && queue.length < 2);

  return (
    <div className="glass-card p-6 md:p-8">
      {/* Mode tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(MODE_LABEL) as Mode[]).map((m) => {
          const active = mode === m;
          return (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                clear();
              }}
              className={`group flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                active
                  ? "bg-white text-ink shadow-lg shadow-white/20"
                  : "bg-white/[0.04] text-bone-dim hover:bg-white/[0.08] hover:text-bone border border-white/[0.08]"
              }`}
            >
              <span className={active ? "text-ink" : "text-bone-dim group-hover:text-bone"}>
                {MODE_LABEL[m].icon}
              </span>
              <span className="font-medium">{MODE_LABEL[m].title}</span>
            </button>
          );
        })}
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`dropzone rounded-2xl px-6 py-14 md:py-20 cursor-pointer text-center transition-all ${
          dragging ? "dragging" : "hover:border-white/30 hover:bg-white/[0.02]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={mode !== "compress"}
          accept={accept}
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) addFiles(e.target.files);
            e.currentTarget.value = "";
          }}
        />

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass-hi mb-5">
          <Upload className="w-7 h-7 text-bone" strokeWidth={1.5} />
        </div>

        <h3 className="text-2xl md:text-3xl display mb-2">
          Drop your files{" "}
          <span className="display-italic grad-text-warm">or click to browse</span>
        </h3>
        <p className="text-bone-dim text-sm md:text-base max-w-md mx-auto">
          {MODE_LABEL[mode].sub}. Files never leave your browser — every conversion happens locally.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-bone-dimmer">
          {mode === "auto" && (
            <>
              <span className="chip">PNG · JPG · WebP</span>
              <span className="chip">DOCX</span>
              <span className="chip">TXT · MD</span>
            </>
          )}
          {mode === "merge" && <span className="chip">PDF · multiple files</span>}
          {mode === "compress" && <span className="chip">PDF · single file</span>}
        </div>
      </div>

      {/* Queue */}
      {queue.length > 0 && (
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs uppercase tracking-[0.2em] text-bone-dimmer">
              {queue.length} file{queue.length === 1 ? "" : "s"} ready
            </p>
            <button
              onClick={clear}
              className="text-xs text-bone-dim hover:text-bone transition"
            >
              Clear all
            </button>
          </div>
          {queue.map((item, idx) => (
            <div
              key={item.id}
              className="glass rounded-xl p-3 flex items-center gap-3 animate-fade-up"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/[0.05] text-bone-dim flex-shrink-0">
                {item.kind && KIND_ICON[item.kind]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{item.file.name}</div>
                <div className="text-xs text-bone-dimmer">
                  {item.kind && KIND_LABEL[item.kind]} · {humanSize(item.file.size)}
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-bone-dim hover:text-bone hover:bg-white/[0.05] transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Status / error */}
      {error && (
        <div className="mt-4 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-sm">
          {error}
        </div>
      )}

      {done && (
        <div className="mt-4 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-sm flex items-center gap-2">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span className="flex-1 truncate">
            <strong className="font-medium">{done.name}</strong> · {humanSize(done.size)}
          </span>
          <span className="text-xs text-emerald-300/70">downloaded</span>
        </div>
      )}

      {/* CTA */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleConvert}
          disabled={ctaDisabled}
          className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {busy ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Converting…
            </>
          ) : (
            <>
              {mode === "auto" && "Convert to PDF"}
              {mode === "merge" && "Merge PDFs"}
              {mode === "compress" && "Compress PDF"}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
        {done && (
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="btn-ghost"
          >
            <Download className="w-4 h-4" />
            Saved
          </a>
        )}
      </div>

      {/* Privacy badge */}
      <div className="mt-5 pt-5 border-t border-white/[0.06] flex items-center gap-2 text-xs text-bone-dimmer">
        <span className="chip-dot" />
        <span>100% on-device · zero uploads · zero tracking of your files</span>
      </div>
    </div>
  );
}
