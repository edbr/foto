---
version: "superdesign-alpha"
name: "Editorial Contact Sheet"
description: "Black-and-white photojournalistic archive system: full-bleed monochrome imagery on a stark white ground, square-cornered structural black, and a single teal editorial label rationed to eyebrows."
colors:
  background: "#FFFFFF"
  surface: "#000000"
  text-primary: "#212121"
  text-secondary: "#7F7F7F"
  text-tertiary: "#302D2D"
  accent: "#287675"
  border: "#DEDEDE"
typography:
  body-md:
    fontFamily: "Univers"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: "1.33"
  label-md:
    fontFamily: "fira-sans"
    fontSize: "30px"
    fontWeight: 300
    lineHeight: "1.33"
    letterSpacing: "0.8px"
  body-serif:
    fontFamily: "Garamond Premier Pro Display"
    fontSize: "20px"
    fontWeight: 300
    color: "#302D2D"
  accent-serif:
    fontFamily: "Adobe Garamond Pro"
    fontStyle: "italic"
  label-mono:
    fontFamily: "FontAwesome"
    role: "icon glyphs"
spacing:
  base: "5px"
  gap: "10px"
  section-padding: "30px"
rounded:
  control: "3px"
  card: "2px"
  pill: "3px"
components:
  button-primary:
    background: "#212121"
    text-color: "#FFFFFF"
    radius: "3px"
    height: "34px"
    padding: "10px 20px"
    border: "1px solid rgb(33, 33, 33)"
  button-primary-large:
    background: "#212121"
    text-color: "#FFFFFF"
    radius: "3px"
    height: "44px"
    padding: "8px 27px"
    border: "2px solid rgb(33, 33, 33)"
  button-nav-utility:
    background: "#000000"
    text-color: "#FFFFFF"
    radius: "2px"
    height: "30px"
    padding: "9px 15px 7px"
    border: "1px solid rgb(0, 0, 0)"
  button-text-link:
    background: "transparent"
    text-color: "#212121"
    radius: "0px"
    height: "24px"
    padding: "0px"
  card-media-heading:
    background: "#FFFFFF"
    radius: "0px"
    padding: "24px 0px 0px"
  card-editorial-feature:
    background: "transparent"
    radius: "0px"
    padding: "0px 0px 20px"
  card-list-row:
    background: "transparent"
    radius: "0px"
    padding: "0px 15px"
---
# Editorial Contact Sheet
Source: https://www.magnumphotos.com/

## Overview
This is a Swiss-inflected editorial archive system built for photography itself to be the only ornament. The palette is near-binary — flat black and white own over 95% of declared surface area, with sharp 0–3px corners throughout and no shadows on content chrome. A single desaturated teal functions as the entire system's color vocabulary, appearing only as small all-caps section eyebrows. The typography pairs a heavy grotesque (Univers, 700 weight) for structural labels against a light, wide-tracked sans (Fira Sans) and a delicate garamond serif for reading copy — a classic archive/magazine split between "index" type and "story" type. The whole system reads as a contact-sheet aesthetic: images are the content, chrome is minimal, and grid discipline (not color or shadow) carries the hierarchy.

## Composition
The first screen opens with a single full-bleed square-ish photographic hero (a flat lay, overhead composition) beneath a fixed 91px-tall edge-to-edge white navbar, followed immediately by a centered teal eyebrow, a serif-adjacent headline, and body copy at a constrained ~720px measure. Scrolling reveals a rhythm of alternating card rows: a 4-up row of small thumbnail-plus-caption story cards, then a large full-bleed single-image editorial spotlight (repeating the eyebrow/headline pattern), then another 4-up row, cycling this large/small alternation down the page. Density is low — generous white space surrounds each image, and text blocks are short, never more than two sentences. The deliberate choice is full-bleed edge-to-edge imagery interrupted by hard-edged white gutters rather than rounded cards or shadowed elevation — this rejects a soft "app" feel in favor of a raw, page-like, print-derived structure where photographs touch their own frame edges directly.

## Colors
White (#FFFFFF, ~64% of pixels, declared 47.7%) is the page ground and dominates as negative space around every image and text block. Black (#000000, ~12% pixels, declared 52.1% of measured DOM area — concentrated in the navbar logo mark, buttons, and the footer band) functions as the structural ink for chrome: navbar logo, primary buttons, footer background. Near-black text ink (#212121, #302D2D) carries all body and label copy — never pure black for reading text, which softens legibility. The single accent, a muted teal (#287675), is strictly rationed to small all-caps eyebrow labels above headlines — it never fills a background, button, or icon; it is a typographic flag only, appearing in maybe a dozen small text instances per page. Mid-grays (#7F7F7F, #B9B9B9, #DEDEDE) handle secondary captions, byline attributions, and hairline borders — deliberately desaturated so the photography itself remains the only saturated content on the page.

## Typography
Hierarchy runs: teal all-caps eyebrow label (small, wide-tracked) → a black/near-black headline set in a light garamond-style serif at conversational size → grey byline/attribution in a smaller sans → body copy in Garamond Premier Pro Display at 20px/300 weight, color #302D2D, for reading passages. Univers at 18px/700 weight is reserved for denser UI labels and card titles needing more structural weight. Fira Sans at 30px/300 with 0.8px tracking appears as a large, airy display label. FontAwesome supplies interface glyphs (search, chevrons, expand icons). The pairing logic is classic editorial: a warm, light serif for voice and reading, a cold grotesque for index/navigation, with weight (not color) doing most of the differentiation work.

## Layout
Content is capped at a 720px measure for reading blocks, sitting inside a wider full-bleed image grid. Story-thumbnail rows are uniform four-up grids (each row an even split, e.g., rows of [4][4]), alternating with single full-width editorial spotlight images that span the full container. A secondary pattern shows two-column media grids at 67%-width items per row (rows of [2][2]) for feature card pairs. List-style card families (rows measured at 100% container width, stacked six deep) handle dense archival indexes lower on the page. Spacing units are tight and print-like — 5px, 10px, 20px, 30px — with no large 96px+ section gutters; sections are separated mainly by the eyebrow/headline pattern repeating rather than by whitespace bands. There is no visible rounding anywhere in the grid (radius 0px throughout cards), reinforcing the contact-sheet, page-grid identity over a soft app-card identity.

## Components
- **Navbar**: edge-to-edge square bar, 91px tall, full 1920px viewport width (0px inset either side), all four corners 0px radius, sticky, background #FFFFFF, holds 63 total interactive items (primary links, a divider, a secondary utility link, search, login). Logo is a black square mark, top-left. No visible border, sits flush against content below.
- **Hero primary button** (observed on first screen, not in the measured navbar cluster): an observed near-black solid pill/rectangle beneath the hero headline area — approximate radius ~3px, filled dark, white text; this is the single most emphasized action on first screen, distinct from the navbar's smaller utility button.
- **Button — primary** (×4, first screen): fill #212121, text #FFFFFF, radius 3px (slightly-rounded, near-square), height 34px, padding 10px 20px, border 1px solid rgb(33,33,33). Used for inline story/section CTAs.
- **Button — primary-large** (×1, near page end): fill #212121, text #FFFFFF, radius 3px, height 44px, padding 8px 27px, border 2px solid rgb(33,33,33). Heavier bordered variant for a terminal/closing CTA.
- **Button — nav utility** (×1, first screen, navbar area): fill #000000, text #FFFFFF, radius 2px (sharp/square), height 30px, padding 9px 15px 7px, border 1px solid rgb(0,0,0). This is a nav-level utility control, not the hero primary.
- **Button — text link** (×7, near page end, footer/list rows): transparent fill, text #212121, radius 0px, height 24px, no padding — bare text CTAs inside list rows.
- **Card — media + heading + 7-tile grid** (×2, first screen): fill #FFFFFF, radius 0px, padding 24px 0px 0px, top media image, heading, body text, and an embedded 7-tile sub-grid; arranged in rows of [67%][67%] width fractions — a two-up feature pairing.
- **Card — media-top-bleed editorial** (×4 near page end, ×2 first screen): transparent fill, radius 0px, padding 0px 0px 20px (or 0px 15px), full-bleed top image with heading and short body beneath; these are the single large spotlight images appearing between thumbnail rows, rows of [67%][67%] where paired.
- **Card — thumbnail + caption** (implied 4-up rows from screenshots): small square/rect thumbnail, teal eyebrow, dark headline, grey byline beneath — the repeating story-grid unit.
- **Card — list/expandable row** (×6, near page end): transparent, radius 0px, padding 0px, rows stacked at 100% container width each — a dense archival list of entries with expandable body text.
- **Card — list + body text** (×2, first screen; ×4 near page end): transparent, radius 0px, padding 0px 15px, compact list rows with inline body copy, no imagery.
- **Footer**: background #000000, 31 links organized into four label columns (Magnum Photos / About / Shop / Policies pattern), plus social icon row; hairline divider above copyright line; all text small, grey-on-black, uppercase-style labels for column headers.

## Graphics & Effects
A single subtle fade gradient, `linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%)`, covers a small fraction (0.6% of page) — a bottom-edge scrim used to fade an image into the white page ground at the base of a hero or card, not a full-screen treatment. Elevation is nearly absent from content cards (radius 0px, no shadow), but three shadow values exist for floating/interactive chrome: `rgba(0, 0, 0, 0.176) 0px 6px 12px 0px` for a raised control, `rgba(0, 0, 0, 0.075) 0px 1px 1px 0px inset` for a pressed/inset edge, and `rgba(172, 171, 171, 0.3) 0px -1px 10px 0px` for an upward soft glow beneath a sticky element. No texture, grain, or pattern overlay is visible — the surfaces are flat and clean, letting the black-and-white photography supply all visual grain and contrast.

## Motion
Transitions are unhurried and eased: a signature `all 0.6s cubic-bezier(0.075, 0.82, 0.165, 1)` for major state changes (hero reveals, carousel advances), stepping down to `all 0.4s ease`, `all 0.3s ease`, and `all 0.2s ease` for smaller hover/focus interactions. Keyframe animations are utilitarian rather than decorative: `fa-spin` for loading glyphs, `progress-bar-stripes` for determinate progress, and `swiper-preloader-spin` for carousel loading — all borrowed interface conventions, not custom brand motion. The system favors slow, deliberate easing over bounce or spring, consistent with an editorial, non-playful identity.

## Guardrails
- Never round card corners — every card, thumbnail, and list row stays at 0px radius; only buttons get 2–3px.
- Never fill a background, icon, or button with the teal accent — it is eyebrow-label text only.
- Never stretch the small bottom-fade gradient into a full-hero or full-page background treatment.
- Never soften the navbar into a floating/inset/rounded bar — it is a flush edge-to-edge square bar at 91px.
- Never introduce drop shadows on content cards — reserve the three measured shadows for sticky/floating utility chrome only.
- Never substitute the heavier bordered large button for the standard primary button or vice versa — keep their distinct heights (34px vs 44px) and border weights (1px vs 2px).