# PaperJet — Documents, only better.

A premium, glass-aesthetic PDF SaaS. Convert images, Word, and text to PDFs — entirely client-side. Zero servers, zero file uploads, zero hosting cost on Vercel's free tier.

That last part matters: because every conversion runs in the user's browser, **AdSense revenue is pure margin**. No compute bills to chip away at it.

---

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** with custom design tokens
- **jsPDF** + **pdf-lib** + **mammoth.js** for in-browser PDF generation
- **Lucide** for icons
- **Instrument Serif** + **Geist** fonts for that editorial-meets-tech feel

---

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## Deploy to Vercel

**Option 1 — CLI (fastest):**
```bash
npm i -g vercel
vercel
```

**Option 2 — Git push:**
1. Push this folder to a fresh GitHub repo
2. Go to https://vercel.com/new
3. Import the repo → Vercel auto-detects Next.js → Deploy

The site is fully static-friendly. First deploy is free; you only start paying if you outgrow the free tier (which is generous: 100GB bandwidth/mo).

---

## Hooking up Google AdSense

The `<AdSlot />` component is in `components/AdSlot.tsx`. It renders a tasteful glass placeholder until you wire your real publisher details.

**Step 1 — Get approved.** Apply at https://www.google.com/adsense. Your site needs to be live, have a privacy policy, and have some traffic. Approval can take days to weeks.

**Step 2 — Add the script.** Uncomment the AdSense script in `app/layout.tsx` and replace `ca-pub-XXXXXXXXXXXXXXXX` with your publisher ID.

**Step 3 — Wire the slots.** In each `<AdSlot />` call on `app/page.tsx`, pass your real `client` and `slot` props:

```tsx
<AdSlot
  layout="horizontal"
  client="ca-pub-1234567890123456"
  slot="9876543210"
/>
```

That's it. AdSense's auto-format will fill the slots responsively.

**Pro tip on placement.** The current page has two horizontal in-feed ads — one after the converter, one before the FAQ. These are the highest-CTR positions because users have already engaged. Don't add more — AdSense penalises ad-heavy layouts in approval.

---

## Adding more conversion types

Open `lib/converters.ts`. The pattern is:
1. Read the file with `FileReader` or `arrayBuffer()`
2. Convert to a target format (HTML, raw text, image data, etc.)
3. Hand it to `jsPDF` or `pdf-lib` to render the PDF
4. Return a `Blob`

Easy adds: PowerPoint (use `pptxjs`), Excel (use `xlsx` + `jsPDF`), HTML pages (use `html2canvas` — already in deps).

---

## Customising the brand

- **Name & metadata**: `app/layout.tsx`
- **Colors & aurora**: `app/globals.css` (look for `--aurora-*` variables)
- **Fonts**: swap the Google Font imports in `app/layout.tsx`
- **Copy**: all in `app/page.tsx` — clearly sectioned

---

## Project structure

```
paperjet/
├── app/
│   ├── globals.css     # design tokens, glass styles, aurora animations
│   ├── layout.tsx      # fonts, metadata, aurora background
│   └── page.tsx        # the entire landing page
├── components/
│   ├── Converter.tsx   # the interactive conversion tool
│   └── AdSlot.tsx      # AdSense placeholder + integration
├── lib/
│   └── converters.ts   # browser-side PDF generation
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## What's intentionally not here yet

- A privacy policy / terms page (required for AdSense approval — add `app/privacy/page.tsx` before applying)
- A blog (great for SEO; consider MDX)
- OCR (the Pro feature) — add `tesseract.js` when you're ready to upsell
- Analytics — Plausible or Vercel Analytics, your call

---

## Notes from the build

Glass morphism done well = depth, hierarchy, and aurora light.
Done badly = a frosted overlay on a flat purple gradient.
Everything in `globals.css` is calibrated to fall on the right side of that line.
