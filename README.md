# Motion Starter

Cloneable Next.js App Router starter for three frontend motion patterns:

- **Lenis** smooth scroll (SSR-safe provider + scroll hook)
- **GSAP ScrollTrigger** hero entrance and section reveals
- **Motion** (`motion/react`) page/route transitions

Reduced motion is treated as a first-class path, not an afterthought.

Live demo: **TODO** — deploy with `npx vercel` (see [Deploy](#deploy)).

## Quick start

```bash
git clone https://github.com/nfsmaapoy/nextjs-motion-starter.git
cd nextjs-motion-starter
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
```

Requires Node.js 20.9+.

## What's included

| Route | What to look at |
| --- | --- |
| `/` | Lenis smooth scroll, GSAP hero entrance, three ScrollTrigger reveal scenes, link to the second route |
| `/patterns` | Motion template enter animation + copy-paste API notes |

Reusable primitives live in `components/motion/`:

| File | Export | Role |
| --- | --- | --- |
| `smooth-scroll-provider.tsx` | `SmoothScrollProvider`, `useLenis`, `useLenisScroll` | Lenis on the document root, synced to the GSAP ticker |
| `reveal.tsx` | `Reveal` | ScrollTrigger fade/rise for sections or elements |
| `page-transition.tsx` | `PageTransition` | Motion enter wrapper for `app/template.tsx` |
| `use-prefers-reduced-motion.ts` | `usePrefersReducedMotion`, `getPrefersReducedMotion` | SSR-safe `prefers-reduced-motion` |

Demo-only UI (not the public API): `components/hero.tsx`, `components/site-header.tsx`, `components/scroll-progress.tsx`.

## Component API

Copy the files under `components/motion/` into another App Router project, then wrap the root layout:

```tsx
import { SmoothScrollProvider } from "@/components/motion";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
```

### `SmoothScrollProvider`

```tsx
<SmoothScrollProvider>{children}</SmoothScrollProvider>
```

| Prop | Type | Notes |
| --- | --- | --- |
| `children` | `ReactNode` | App tree |

Client-only. Does not start Lenis when `prefers-reduced-motion: reduce` is set.

### `useLenis` / `useLenisScroll`

```tsx
const lenis = useLenis(); // Lenis | null

useLenisScroll((lenis) => {
  console.log(lenis.progress);
});
```

`useLenis()` is `null` during SSR, before mount, and when smooth scroll is disabled.

### `Reveal`

```tsx
<Reveal as="section" delay={0.08} once>
  {children}
</Reveal>
```

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Content to reveal |
| `as` | HTML tag name | `"div"` | Semantic element |
| `delay` | `number` | `0` | Seconds |
| `once` | `boolean` | `true` | Play only the first time it enters view |
| `className` | `string` | — | Passed through |

### `PageTransition`

Used from `app/template.tsx` so App Router remounts it on navigation:

```tsx
import { PageTransition } from "@/components/motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
```

### `usePrefersReducedMotion`

```tsx
const reduced = usePrefersReducedMotion();
```

Uses `useSyncExternalStore` so the server snapshot stays stable. Inside `useEffect` / GSAP setup, prefer `getPrefersReducedMotion()` so the media query is read at animation time.

## Reduced motion

When `(prefers-reduced-motion: reduce)` matches:

- Lenis is not created (native scroll)
- GSAP hero and `Reveal` tweens are skipped; elements stay in their final state
- `PageTransition` duration is `0`
- CSS in `app/globals.css` forces reveal/hero lines visible as a no-JS fallback

### How to test

Chrome / Edge / Arc

1. Open DevTools → **Rendering** (or Command Menu → “Show Rendering”)
2. Set **Emulate CSS media feature prefers-reduced-motion** to **reduce**
3. Reload `/` — scroll should feel native, the progress bar still tracks, sections should not fade/slide in
4. Navigate to `/patterns` — the page should appear without the enter offset

Firefox: `about:config` → `ui.prefersReducedMotion` → `1`.

macOS: **System Settings → Accessibility → Display → Reduce motion**.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- `gsap` + `ScrollTrigger`
- `motion` (current Motion / Framer Motion package, import from `motion/react`)
- `lenis` (import `lenis` and `lenis/dist/lenis.css`)

Package manager is **npm** (`package-lock.json`).

## Deploy

```bash
npx vercel
```

Import the GitHub repo in the Vercel dashboard if you want preview deploys on every branch. No environment variables are required.

Live demo URL: **TODO** (owner: paste the production URL here after the first deploy).

## License

MIT. See [LICENSE](./LICENSE).
