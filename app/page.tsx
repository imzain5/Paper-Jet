import Converter from "@/components/Converter";
import AdSlot from "@/components/AdSlot";
import {
  Zap,
  Shield,
  Wand2,
  Globe2,
  Layers,
  ImageIcon,
  FileText,
  FileType2,
  Check,
  ArrowUpRight,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";

export default function Home() {
  return (
    <main>
      {/* ─────────────────────────── NAV ─────────────────────────── */}
      <nav className="sticky top-4 z-50 mx-auto max-w-6xl px-4">
        <div className="glass rounded-full px-5 py-2.5 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <span className="logo-mark">
              <FileType2 className="w-4 h-4 text-white" strokeWidth={2.5} />
            </span>
            <span className="font-semibold tracking-tight text-[15px]">PaperJet</span>
          </a>
          <div className="hidden md:flex items-center gap-7 text-sm text-bone-dim">
            <a href="#tools" className="hover:text-bone transition">Tools</a>
            <a href="#features" className="hover:text-bone transition">Features</a>
            <a href="#pricing" className="hover:text-bone transition">Pricing</a>
            <a href="#faq" className="hover:text-bone transition">FAQ</a>
          </div>
          <a href="#tools" className="btn-primary text-sm py-2 px-4">
            Open app
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>

      {/* ─────────────────────────── HERO ────────────────────────── */}
      <section className="px-4 pt-20 md:pt-32 pb-16">
        <div className="max-w-6xl mx-auto text-center">
          <span className="chip mb-6 reveal" style={{ animationDelay: "0ms" }}>
            <span className="chip-dot" />
            Now with on-device AI compression
          </span>

          <h1
            className="display text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] mb-6 reveal"
            style={{ animationDelay: "100ms" }}
          >
            Documents,
            <br />
            <span className="display-italic grad-text-warm">only better.</span>
          </h1>

          <p
            className="text-bone-dim text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed reveal"
            style={{ animationDelay: "260ms" }}
          >
            Convert anything to a beautiful PDF in your browser. Word, images,
            text — pixel-perfect, private, and unreasonably fast.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 justify-center reveal"
            style={{ animationDelay: "420ms" }}
          >
            <a href="#tools" className="btn-primary">
              Start converting
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a href="#features" className="btn-ghost">
              See what's inside
            </a>
          </div>

          <div
            className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-bone-dimmer reveal"
            style={{ animationDelay: "560ms" }}
          >
            <div className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-emerald-400" /> No signup
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-emerald-400" /> No uploads
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-emerald-400" /> No watermarks
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-emerald-400" /> Free forever
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── TRUST MARQUEE ────────────────── */}
      <section className="py-8 mb-4">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-bone-dimmer mb-6">
          Trusted by teams shipping at speed
        </p>
        <div className="marquee">
          <div className="marquee-track text-bone-dim text-2xl font-display italic">
            {[
              "Stripe", "Linear", "Vercel", "Notion", "Figma", "Arc",
              "Stripe", "Linear", "Vercel", "Notion", "Figma", "Arc",
            ].map((brand, i) => (
              <span key={i} className="opacity-50 hover:opacity-90 transition cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── THE CONVERTER (centerpiece) ─────────────── */}
      <section id="tools" className="px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="chip mb-4">The toolkit</span>
            <h2 className="display text-4xl md:text-6xl mb-3">
              Drop a file. <span className="display-italic grad-text">Get a PDF.</span>
            </h2>
            <p className="text-bone-dim max-w-xl mx-auto">
              Three modes, zero friction. Works offline. Files never touch a server.
            </p>
          </div>
          <Converter />
        </div>
      </section>

      {/* ───────────────────── INLINE AD ─────────────────────── */}
      <section className="px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <AdSlot layout="horizontal" />
        </div>
      </section>

      {/* ─────────────────── FEATURES GRID ───────────────────── */}
      <section id="features" className="px-4 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="chip mb-4">Why PaperJet</span>
            <h2 className="display text-4xl md:text-6xl mb-3">
              Built like a <span className="display-italic grad-text-warm">flagship product.</span>
            </h2>
            <p className="text-bone-dim max-w-xl mx-auto">
              Most PDF tools are bloated, ad-laden, and slow. We rebuilt the whole stack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: <Zap />,
                title: "Instant.",
                body: "Conversions run on your device's hardware. No round-trips, no queues, no waiting.",
                accent: "from-orange-400 to-pink-500",
              },
              {
                icon: <Shield />,
                title: "Private by design.",
                body: "Your files never leave the browser. We physically can't see them — and we like it that way.",
                accent: "from-emerald-400 to-teal-500",
              },
              {
                icon: <Wand2 />,
                title: "Beautifully typeset.",
                body: "Every PDF respects margins, headings, and rhythm. The output looks designed, not dumped.",
                accent: "from-violet-400 to-fuchsia-500",
              },
              {
                icon: <Globe2 />,
                title: "Works offline.",
                body: "Once loaded, PaperJet runs without an internet connection. Mid-flight? On the metro? Still works.",
                accent: "from-sky-400 to-blue-500",
              },
              {
                icon: <Layers />,
                title: "Batch-ready.",
                body: "Drop fifty images, get one PDF. Merge thirty PDFs in a single pass. Speed scales.",
                accent: "from-amber-400 to-orange-500",
              },
              {
                icon: <FileType2 />,
                title: "No watermarks. Ever.",
                body: "Your documents are yours. No 'PaperJet free trial' stamps. No 'powered by' anything.",
                accent: "from-rose-400 to-pink-500",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="glass-card p-7 group hover:bg-white/[0.06] transition-colors duration-500"
              >
                <div
                  className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${f.accent} text-white mb-5 shadow-lg`}
                >
                  {f.icon}
                </div>
                <h3 className="text-2xl display mb-2">{f.title}</h3>
                <p className="text-bone-dim text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── HOW IT WORKS ─────────────────── */}
      <section className="px-4 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="chip mb-4">Three steps. Three seconds.</span>
            <h2 className="display text-4xl md:text-6xl mb-3">
              From file <span className="display-italic grad-text">to PDF</span>, instantly.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "01", title: "Drop", body: "Drag any file in — Word, image, text, or another PDF." },
              { n: "02", title: "Pick", body: "Choose Convert, Merge, or Compress. We handle the rest." },
              { n: "03", title: "Done", body: "Your PDF downloads in seconds. Polished, private, perfect." },
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="glass-card p-8 h-full">
                  <div className="font-mono text-bone-dimmer text-sm mb-6">{s.n}</div>
                  <h3 className="display text-3xl mb-3">{s.title}.</h3>
                  <p className="text-bone-dim text-sm">{s.body}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10 w-8 h-8 rounded-full glass-hi items-center justify-center">
                    <ArrowUpRight className="w-3 h-3 rotate-45 text-bone-dim" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── STATS BAR ────────────────────── */}
      <section className="px-4 py-16">
        <div className="max-w-5xl mx-auto glass-card p-10 md:p-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { n: "2.4M+", l: "documents converted" },
              { n: "<1s", l: "average conversion" },
              { n: "0", l: "files uploaded to servers" },
              { n: "100%", l: "free, forever" },
            ].map((s, i) => (
              <div key={i}>
                <div className="display text-5xl md:text-6xl grad-text mb-1">{s.n}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-bone-dimmer">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── PRICING ─────────────────────── */}
      <section id="pricing" className="px-4 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="chip mb-4">Simple pricing</span>
            <h2 className="display text-4xl md:text-6xl mb-3">
              Free for everyone. <span className="display-italic grad-text-warm">Pro for power.</span>
            </h2>
            <p className="text-bone-dim max-w-xl mx-auto">
              Most people will never need to upgrade. That's the point.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="glass-card p-8">
              <div className="text-xs uppercase tracking-[0.2em] text-bone-dimmer mb-4">Starter</div>
              <div className="display text-5xl mb-1">Free</div>
              <p className="text-bone-dim text-sm mb-8">Forever. No card, no catch.</p>
              <ul className="space-y-3 text-sm mb-8">
                {[
                  "All converters · unlimited",
                  "Up to 50 files / batch",
                  "On-device processing",
                  "No watermarks",
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#tools" className="btn-ghost w-full">Open the app</a>
            </div>

            {/* Pro — featured */}
            <div className="glass-card p-8 grad-border relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="chip bg-white text-ink border-white">Most popular</span>
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-bone-dimmer mb-4">Pro</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="display text-5xl">$6</span>
                <span className="text-bone-dim">/ month</span>
              </div>
              <p className="text-bone-dim text-sm mb-8">For people who live in PDFs.</p>
              <ul className="space-y-3 text-sm mb-8">
                {[
                  "Everything in Starter",
                  "OCR for scanned PDFs",
                  "PDF → Word, Excel export",
                  "Encrypted PDF support",
                  "Cloud sync (Drive · Dropbox)",
                  "Priority email support",
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className="btn-primary w-full">Start 7-day trial</a>
            </div>

            {/* Team */}
            <div className="glass-card p-8">
              <div className="text-xs uppercase tracking-[0.2em] text-bone-dimmer mb-4">Team</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="display text-5xl">$18</span>
                <span className="text-bone-dim">/ seat</span>
              </div>
              <p className="text-bone-dim text-sm mb-8">For agencies, schools, ops.</p>
              <ul className="space-y-3 text-sm mb-8">
                {[
                  "Everything in Pro",
                  "Shared brand templates",
                  "API access · 10k calls/mo",
                  "SSO · SCIM · audit logs",
                  "Dedicated account manager",
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className="btn-ghost w-full">Talk to sales</a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── INLINE AD 2 ───────────────────── */}
      <section className="px-4 py-6">
        <div className="max-w-5xl mx-auto">
          <AdSlot layout="horizontal" />
        </div>
      </section>

      {/* ───────────────────── FAQ ───────────────────────── */}
      <section id="faq" className="px-4 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="chip mb-4">FAQ</span>
            <h2 className="display text-4xl md:text-6xl">
              Quick <span className="display-italic grad-text">answers.</span>
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Is it really free?",
                a: "Yes. The browser-based converters are free forever, with no signup, watermarks, or limits on basic use. Pro adds OCR, exports, and cloud sync — but most people will never need it.",
              },
              {
                q: "Where do my files go?",
                a: "Nowhere. PaperJet processes everything on your device using JavaScript and WebAssembly. The file you drop in never leaves your computer — we couldn't see it if we tried.",
              },
              {
                q: "What file types do you support?",
                a: "Images (PNG, JPG, WebP, GIF), Word (.docx), text (.txt, .md), and PDF. We're adding Excel, PowerPoint, and HTML soon.",
              },
              {
                q: "Does it work on mobile?",
                a: "Yes — PaperJet is fully responsive and works on iOS Safari and Android Chrome. Large file conversions may be slower on older phones.",
              },
              {
                q: "Can I use it offline?",
                a: "Once the page is loaded, yes. PaperJet is a Progressive Web App — install it from your browser's menu and it works without a connection.",
              },
              {
                q: "I'm a developer. Is there an API?",
                a: "Coming with the Team plan. Same engine, called from your backend. Drop us a line at hello@paperjet.app if you want early access.",
              },
            ].map((item, i) => (
              <details
                key={i}
                className="glass rounded-2xl p-6 group cursor-pointer"
              >
                <summary className="flex items-center justify-between font-medium list-none">
                  <span>{item.q}</span>
                  <span className="ml-4 text-bone-dim group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
                </summary>
                <p className="text-bone-dim text-sm mt-3 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── FINAL CTA ──────────────────── */}
      <section className="px-4 py-24">
        <div className="max-w-4xl mx-auto text-center glass-card p-12 md:p-20 grad-border">
          <h2 className="display text-5xl md:text-7xl mb-5">
            Your next PDF{" "}
            <span className="display-italic grad-text-warm">is one drop away.</span>
          </h2>
          <p className="text-bone-dim max-w-xl mx-auto mb-8">
            No signup. No upload. No nonsense. Just open the app.
          </p>
          <a href="#tools" className="btn-primary inline-flex">
            Open PaperJet
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ───────────────── FOOTER ────────────────── */}
      <footer className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="hairline mb-12" />
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <a href="#" className="flex items-center gap-2.5 mb-4">
                <span className="logo-mark">
                  <FileType2 className="w-4 h-4 text-white" strokeWidth={2.5} />
                </span>
                <span className="font-semibold tracking-tight">PaperJet</span>
              </a>
              <p className="text-bone-dim text-sm max-w-sm leading-relaxed mb-5">
                The PDF toolkit for modern teams. Built in browser, designed
                for speed, made with care.
              </p>
              <div className="flex gap-2">
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-lg flex items-center justify-center glass hover:bg-white/[0.08] transition"
                    aria-label="social link"
                  >
                    <Icon className="w-4 h-4 text-bone-dim" />
                  </a>
                ))}
              </div>
            </div>

            {[
              { h: "Product", l: ["Convert", "Merge", "Compress", "Pricing"] },
              { h: "Company", l: ["About", "Blog", "Privacy", "Terms"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-xs uppercase tracking-[0.2em] text-bone-dimmer mb-4">
                  {col.h}
                </h4>
                <ul className="space-y-3 text-sm">
                  {col.l.map((item, j) => (
                    <li key={j}>
                      <a href="#" className="text-bone-dim hover:text-bone transition">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="hairline mb-6" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-bone-dimmer">
            <p>© {new Date().getFullYear()} PaperJet Labs. All rights reserved.</p>
            <p>Made with care · Designed in 2026</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
