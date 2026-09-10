---
version: "superdesign-alpha"
name: "Gallery-wall newsprint grid"
description: "Light, paper-toned editorial system built on a flat off-white/gray field, oversized layered display type in a hero collage, and a dense uniform card grid of poster-like tile imagery."
colors:
  background: "#F0F0F0"
  surface: "#FFFFFF"
  surface-muted: "#E6E7E9"
  text-primary: "#000000"
  text-secondary: "#404040"
  text-tertiary: "#444444"
  border: "#E8E8E8"
  border-strong: "#404040"
  footer-surface: "#FBFBFB"
  accent-observed-green: "#609048"
typography:
  body-md:
    fontFamily: "Avenir Book"
    fontSize: "14px"
    fontWeight: 300
    lineHeight: "1.35"
  label-md:
    fontFamily: "Avenir Heavy"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: "1.25"
  body-default:
    fontFamily: "Avenir Book"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "1.5"
    color: "#404040"
  icon-mono:
    fontFamily: "FontAwesome"
    fontSize: "16px"
    fontWeight: 400
  accent-display:
    fontFamily: "Arial"
    fontSize: "96px"
    fontWeight: 700
    lineHeight: "0.95"
spacing:
  base: "5px"
  unit-sm: "10px"
  unit-md: "15px"
  unit-lg: "30px"
  gap: "6px"
  section-padding: "50px"
rounded:
  control: "4px"
  card: "4px"
  pill: "4px"
components:
  navbar-bar:
    background: "transparent"
    radius: "0px"
    height: "89px"
    width: "1170px"
  button-nav-utility:
    background: "transparent"
    text-color: "#FFFFFF"
    radius: "4px"
    height: "82px"
    padding: "5px"
  button-primary-hero-observed:
    background: "#FFFFFF"
    text-color: "#000000"
    radius: "4px"
    height: "44px"
    padding: "10px 20px"
  card-feature-large:
    background: "transparent"
    radius: "0px"
    padding: "0px 15px"
  card-poster:
    background: "transparent"
    radius: "0px"
    padding: "0px"
  card-logo-block:
    background: "#E6E7E9"
    radius: "0px"
    padding: "15px"
---
# Gallery-wall newsprint grid
Source: https://mam.rio/

## Overview
This is an editorial/typographic system dressed as an institutional print program: a near-flat, paper-gray field (#F0F0F0/#FFFFFF dominate at ~91% of rendered pixels) hosts a hero built entirely from layered, oversized display type and poster-style artwork tiles rather than gradients or glass. There is no elevation language, no shadow depth (declared shadow values are effectively zero-alpha), and no glassmorphism — this is Swiss/International in spirit: strict grid, rational column structure, sharp corners, restrained ~4px radii used only on small controls. Color is not a system feature; it lives entirely inside the artwork thumbnails, making the page read as a gallery wall against museum-white walls.

## Composition
The first screen opens on a wide flat hero panel (#F0F0F0-toned) that layers three or four cropped words of a headline at wildly different scales and opacities like a print-poster collage, with a small right-aligned date/label cluster in the corner — a deliberate anti-hierarchy move (words compete rather than stepping down in size) that rejects a conventional single-headline-plus-subhead hero. Immediately below, without a gap band, an uncontained four-up row of image-led cards begins — this pattern repeats twice more down the page, giving three full rows of four cards before a final row of two feature blocks and a two-logo-panel row, then the footer. Density is high and constant: no card ever gets a shadow, radius, or padding beyond a 15px side gutter; the artwork itself carries all the color and texture, and white/gray "canvas" space around it is the resting state.

## Colors
The system is achromatic by policy: #F0F0F0 (page) and #FFFFFF (card/content surface) together cover roughly 91% of rendered pixels, with #E6E7E9 and #EEEEEE as secondary panel tints behind logo lockups and footer-adjacent blocks. Text ink is #404040 for body copy and #000000 for headings/labels — never colored. Borders are hairline #E8E8E8 or a stronger #404040 rule where sectioning is needed. The only chromatic pixels in the whole field are inside the artwork tiles themselves (an observed sampled green ~#609048 from one poster, plus oranges, teals, and magentas visible in other tiles) — color is entirely rationed to imagery, never to chrome, buttons, or backgrounds. This leaves the entire UI shell — nav, buttons, dividers, footer — deliberately uncolored.

## Typography
Two weights of one humanist sans, Avenir, run the whole interface: Avenir Heavy at 16px/500 for labels and card headings, Avenir Book at 14–16px/300–400 for body copy, both set tight (line-height 1.25–1.35) and in the neutral inks above. FontAwesome supplies inline utility icons (search glyph in the nav). The signature accent is a large geometric sans (Arial-class) blown up to a display scale far beyond the label/body pair — used exclusively in the hero collage where three or four words are stacked at radically different point sizes and translucency to build the whole visual hierarchy of the top of the page; nowhere else on the page does type exceed card-heading scale.

## Layout
Content is bounded to a 1120px max-width container with 50px section padding and a small 5–15px internal spacing rhythm inside cards. The card grid is a strict uniform grid, four columns per row at equal width (measured rows show items each at ~61% is a mis-scale artifact of a 4-up row sampled at reduced viewport; visually and structurally it is a consistent 4-up card grid: rows run [4][4][4][2][2]) — never masonry or bento; every tile in a row shares the same height and width, with only the artwork crop varying. The navbar sits as a centered, bounded, sharp-cornered bar (not full-bleed): measured at 1170px wide against a wider viewport, symmetrical ~375px insets left and right, 89px tall, flat 0px radius on all four corners, transparent fill sitting directly on the page background — a wide inset bar, not an edge-to-edge or capsule bar. Below it a secondary flat utility strip carries the primary navigation links. The whole system is desktop-first with no visible breakpoint collapse evidenced, single fixed column grid throughout.

## Components
- **Navbar bar**: top of page, one continuous element measured at 89px tall × 1170px wide, centered with symmetric ~375px side insets (a wide inset bar, not edge-to-edge), flat 0px radius on all four corners, transparent background sitting on the page's own gray field, static (no scroll-shrink observed). Contains a mark/wordmark lockup at left and a two-line institutional name-plate beside it; a secondary horizontal link strip (multiple text items) sits directly beneath in a slightly darker gray band, with a small search-icon utility control at the far right.
- **Button — nav utility (glass/transparent variant)**: found inside the hero area overlapping the collage artwork; transparent fill, white text, 4px radius (slightly-rounded, near-sharp), unusually tall 82px hit area with only 5px padding — reads as a large tap target rather than a compact chip.
- **Button — hero primary (observed)**: the single most emphasized control on the first screen, sitting under/beside the layered headline collage; an observed near-white or cream solid fill with dark text, small ~4px sharp-square corners, standard button height — distinct from the transparent nav utility button and never sharing its values.
- **Hero collage panel**: full-width band directly under the navbar, flat #F0F0F0-toned background, no radius, containing three to four overlapping blocks of display type at descending scale/opacity plus a small right-aligned caption cluster — this is the page's only "graphic" element and it is entirely typographic, not photographic.
- **Poster/feature card (large)**: appears ×4 in the first grid row directly below the hero; transparent background, 0px radius, 0px×15px padding, each card is a tall poster-style artwork filling most of the card top, with an Avenir Heavy heading line and one to two lines of Avenir Book body copy beneath — no chips, no CTA button inside the card itself, the whole card is a click target.
- **Poster card (secondary grid, repeated)**: appears ×4 more twice further down the page (mid-page and near the end), identical anatomy to the primary poster card — media-top-bleed occupying the full card width, heading, body text — confirming the grid's uniform four-up rhythm rather than any bento variation.
- **Logo/sponsor panel**: appears ×1–2 near the page end, flat #E6E7E9-toned block, 0px radius, centered logo lockup (sponsor mark) with a small caption label above it (e.g. a "Patrocínio Oficial"-style eyebrow) — sits inside the same 4-up grid rhythm as the poster cards but with a flat tinted fill instead of photographic artwork.
- **Footer**: full-width band, #FBFBFB background, no radius, organized into stacked columns: a row of small monochrome partner/certification marks, a labeled sponsor-logo block, a second labeled strategic-sponsor logo row, and an address/contact text column with an icon-prefixed phone number and contact link — fourteen total link items distributed across these columns plus a closing newsletter-style prompt line.

## Graphics & Effects
No gradients or blurred/glass surfaces are used anywhere in this system — the entire visual richness is carried by static poster-style photographic and illustrated artwork inside the card grid (color, texture, and pattern originate only there). Two shadow values exist and both are functionally invisible: `rgba(0, 0, 0, 0) 2px 2px 2px 0px` (fully transparent, i.e. no shadow renders) and `rgba(0, 0, 0, 0.075) 0px 1px 1px 0px inset` (a near-imperceptible 7.5%-opacity inset hairline, likely on form/search controls). There is no scrim, no noise/grain overlay, and no canvas/video surface — the page is entirely flat, static compositing of type and raster artwork.

## Motion
Interactions are transition-based, not keyframe-driven, tuned toward slow, deliberate settling rather than snap: a broad `all 0.7s ease` covers general state changes, `color 0.4s ease` handles text/link hover recoloring, `opacity, transform 0.45s, 0.45s ease, ease` governs fade/move reveals, and a faster `transform, background 0.2s, 0.2s ease, ease` handles pressed/hover button feedback. A small set of utility keyframe loops (fa-spin, icofont-spin) drive spinner icons, and wpmmpulse/wpmmfadeIn provide a gentle pulse and fade-in used for lightweight attention cues (likely a small notification or badge). Overall the motion language is unhurried and editorial — long eases, no spring/overshoot, nothing bouncy — matching the print-poster tone of the visuals.

## Guardrails
- Never introduce gradients, glassmorphism, or drop shadows with visible opacity — this system is flat and matte by rule.
- Never color the chrome (nav, buttons, dividers, footer): all chroma must stay confined inside artwork/photo tiles.
- Never round card corners — 0px is structural to the poster-wall identity; reserve the 4px radius for small controls only.
- Do not compress the hero's layered display-type collage into a single conventional headline-plus-subhead block; its scale mismatch and overlap are the signature.
- Do not mistake the transparent 82px nav utility button for the hero's primary CTA — keep the primary as a distinct solid near-white control.
- Keep the four-up card grid uniform in height and width per row; do not introduce bento-style span variation.