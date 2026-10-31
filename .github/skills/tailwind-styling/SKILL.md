---
name: tailwind-styling
description: "Use when styling, restyling, or improving the CSS/UI of React components in this project (e.g. 'improve css', 'style this component', 'make it look better', 'add a button'). Enforces Tailwind CSS utility classes only; custom CSS is allowed only for special cases Tailwind cannot express."
argument-hint: "Component or file to style"
---

# Tailwind-Only Styling

This project uses Tailwind CSS v4 (`@import "tailwindcss";` in `src/index.css`, via `@tailwindcss/vite`). Style everything with Tailwind utility classes in `className`.

## Rules

1. **Tailwind first, always.** Use utility classes directly on JSX elements. Do not create `.css` / `.scss` files, CSS modules, `<style>` tags, or inline `style={{}}` props for things Tailwind can do.
2. **Custom CSS only for special cases**, i.e. things Tailwind cannot express, such as:
   - Custom `@keyframes` animations or complex multi-step animations
   - Third-party library internals that cannot be reached via props or `className` (e.g. a specific antd inner selector)
   - Pseudo-elements or browser-specific selectors with no utility equivalent (`::-webkit-scrollbar`, etc.)
   - Design tokens: prefer `@theme { ... }` in `src/index.css` over ad-hoc CSS
3. When custom CSS is unavoidable, put it in `src/index.css` (inside `@theme`, `@layer`, or `@keyframes`), keep it minimal, and add a one-line comment explaining why Tailwind was not enough.
4. Use arbitrary values (`w-[342px]`, `bg-[#27272a]`) before reaching for custom CSS.
5. For antd components, use the `ConfigProvider` theme (see `Form.tsx`), `size`, and `className` props instead of overriding antd class names in CSS.

## Design System (match existing components)

Dark theme, consistent with `Header`, `UploadVisualForm` and `ThumbnailForm`:

| Role | Classes |
|------|---------|
| Card | `rounded-xl border border-zinc-800 bg-zinc-900/80 p-3 shadow-md shadow-black/30 hover:border-zinc-700` |
| Field label | `text-[10px] font-semibold uppercase tracking-wider text-zinc-400` |
| Text input | `w-full rounded-md border border-zinc-700 bg-zinc-800/60 px-2.5 py-1.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400/50` |
| Primary button | `rounded-lg bg-violet-500 px-6 py-2 text-sm font-semibold text-white hover:bg-violet-400 active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500` |
| Large CTA button | same as primary, bigger: `px-8 py-3 text-base` |
| Dashed empty/upload state | `border-2 border-dashed border-zinc-700 hover:border-violet-400 hover:bg-violet-500/10` |
| Icon / remove button hover | `hover:bg-zinc-700 hover:text-white` |
| Success / saved | `bg-zinc-800 text-violet-300` |

Palette: keep it simple. Zinc neutrals plus ONE accent (violet). No gradients, and no extra colours (emerald, rose, fuchsia, indigo, slate) unless the user asks.

## Procedure

1. Read the target component and look at 1-2 sibling components for the existing look.
2. Reuse the design-system classes above; extract repeated class strings into `const` variables at the top of the file (e.g. `const fieldLabel = "..."`), not into CSS files.
3. Make layouts responsive with Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`); mobile-first.
4. Include interaction states: `hover:`, `focus-visible:`, `active:`, `disabled:`, `transition`.
5. Keep accessibility: visible focus rings, `aria-label` on icon-only buttons, sufficient contrast on dark backgrounds.
6. Prefer semantic structure already used in the codebase; do not restructure markup unless needed for the layout.
7. Verify: run `npx tsc -b --noEmit` and filter for the files you changed, and check the page in the browser if possible.

## Avoid

- Mixing Tailwind with new hand-written CSS for the same thing
- Inline `style` props (except truly dynamic values such as computed widths)
- `!important` or overriding library class names in global CSS
- Gradients or extra accent colours; stay with zinc + violet
