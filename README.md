# Lu You — Personal Portfolio Website

> *Building brands, communities and cultural relevance for global technology companies.*
> Shanghai / Tokyo → Netherlands

---

## Overview

A sophisticated, single-page personal portfolio website for **Lu You**, a brand strategist and community builder with a career spanning Meituan, SAP Labs, CI&T, and TCS. The site embodies editorial minimalism — inspired by Monocle magazine's typography, Apple's design precision, and Dutch design's bold clarity.

---

## ✅ Completed Features

| Section | Description |
|---|---|
| **Navigation** | Fixed top nav with scroll-activated border, active link highlighting, mobile hamburger menu |
| **Hero** | Full-viewport hero with editorial name, tagline, location indicator, 3 CTA buttons, portrait placeholder |
| **Career Timeline** | Vertical connected timeline (2011–2026) with company cards, roles, descriptions, animated year counters |
| **Featured Work** | 3 editorial case study cards (Jaguar TCS Racing, SAP Community, AI Creative Challenge) |
| **Selected Thoughts** | 2 essay cards with category labels and Roman numeral indices |
| **Current Focus** | Two-column layout: "Currently exploring" list + "Recently inspired by" tags + quote |
| **Travel Journal** | 4-column image grid (Beijing, Tokyo, Sichuan, Formula E) with Xiaohongshu CTA |
| **Contact** | Dark section with email/LinkedIn/PDF buttons and relocation location display |
| **Footer** | Minimal name + copyright + location footer |

### JavaScript Features
- Scroll-activated navbar with backdrop blur
- IntersectionObserver reveal animations (fade + slide-up)
- Staggered child element animations
- Scroll progress bar (green accent, top of page)
- Parallax name effect on hero scroll
- Cursor follower on work section (desktop only)
- Timeline year counter animation
- Mobile burger menu with accessibility attributes
- Smooth anchor scrolling

---

## 🗂 File Structure

```
index.html          ← Main single-page site
css/
  style.css         ← All styles (tokens, components, responsive)
js/
  main.js           ← All JavaScript (scroll, animations, interactivity)
README.md
```

---

## 🎨 Design System

### Color Palette
| Token | Value | Usage |
|---|---|---|
| `--color-ink` | `#1a1a1a` | Primary text |
| `--color-dark` | `#111111` | Dark section backgrounds |
| `--color-surface` | `#f8f7f5` | Off-white card backgrounds |
| `--color-warm` | `#f5f3ef` | Journal section background |
| `--color-accent` | `#2d5016` | Forest green — buttons, labels, highlights |
| `--color-muted` | `#767676` | Secondary text |

### Typography
- **Headings / Names:** Playfair Display (serif) — editorial gravitas
- **Body / UI:** Inter (sans-serif) — clean, legible, modern

---

## 🌐 Entry Points

| Path | Description |
|---|---|
| `/` or `/index.html` | Main portfolio page |
| `/#work` | Jump to Featured Work section |
| `/#thoughts` | Jump to Selected Thoughts section |
| `/#journal` | Jump to Travel Journal section |
| `/#contact` | Jump to Contact section |

---

## 🚧 Features Not Yet Implemented

- [ ] **Real portrait/photography** — portrait placeholder in hero awaiting actual image
- [ ] **Travel journal images** — photo grid uses emoji placeholders
- [ ] **Case study detail pages** — "Open Case Study" links point to `#`
- [ ] **Essay pages** — "Read Essay" links point to `#`
- [ ] **Email/LinkedIn/Resume** links — contact buttons need real URLs
- [ ] **Xiaohongshu link** — journal CTA needs actual profile URL
- [ ] **Work card images** — visual panels use gradient placeholders
- [ ] **Dark mode** — `prefers-color-scheme: dark` variant
- [ ] **Blog/writing CMS** — connected backend for essays

---

## 🔧 Recommended Next Steps

1. **Add real photography** — replace portrait and journal placeholders with actual images
2. **Add case study pages** — create `work/jaguar-tcs.html`, `work/sap-community.html`, `work/ai-creative.html`
3. **Add essay pages** — create `thoughts/enterprise-creator-marketing.html`, etc.
4. **Configure contact links** — update `href` on Email, LinkedIn, and PDF buttons
5. **Add meta/OG tags** — social media preview image and description
6. **Add favicon** — monogram "LY" icon
7. **Performance** — add lazy loading to images when real photos are integrated
8. **Analytics** — add Plausible or Fathom analytics snippet

---

## 🚀 Deployment

To publish this website, go to the **Publish tab** and click publish. Your site will be live immediately with a shareable URL.

---

*Aesthetic references: Monocle magazine · Apple.com · Braun design · De Stijl / Dutch modernism*
