# Tokens
Inter/system sans; white surfaces, #f5f5f5 page, #26282b text, #686c72 muted, #dedfe2 rules. Serif home headings currently. 640px mobile breakpoint. Map geography uses separate regional colors.
## app/globals.css
```
:root {
  --ui-page: #f5f5f5;
  --ui-surface: #ffffff;
  --ui-overlay: #fffffff2;
  --ui-text: #26282b;
  --ui-muted: #686c72;
  --ui-border: #dedfe2;
  --ui-subtle: #eceef0;
  --ui-active: #30343a;
  --ui-focus: #626b78;
  --locator-land: #e4e6e8;
  --locator-highlight: #c8cdd2;
  --locator-border: #a3a9b0;
  --locator-route: #343c47;
 font-family: Inter, system-ui, sans-serif; color: var(--ui-text); background: var(--ui-page); font-synthesis: none; }
* { box-sizing: border-box; }
body { margin: 0; }
#app { height: 100dvh; }
p { font-size: 14px; line-height: 1.6; }
h2 { font-size: 17px; }
button { font: inherit; cursor: pointer; }
#map { position: relative; width: 100%; height: 100%; background: #e3e8df; }
.map-status { position: absolute; top: 16px; left: 16px; max-width: calc(100% - 80px); margin: 0; padding: 10px 14px; border-radius: 8px; background: var(--ui-surface); box-shadow: 0 2px 8px #0002; }
#setup { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: min(440px, 90%); padding: 24px; border-radius: 12px; background: var(--ui-surface); }
#setup h2 { margin-top: 0; }
pre { overflow-x: auto; font-size: 12px; }
.photo-marker { width: 62px; height: 62px; border: 3px solid white; border-radius: 9px; padding: 0; background: white; box-shadow: 0 3px 12px #0004; }
.photo-marker img { width: 100%; height: 100%; object-fit: cover; border-radius: 5px; }
.slideshow { position: fixed; inset: 0; width: 100%; max-width: none; height: 100dvh; max-height: none; margin: 0; border: 0; padding: 20px; background: #141414; color: #fff; }
.slideshow[open] { display: flex; flex-direction: column; }
.slideshow::backdrop { background: #141414; }
.slideshow-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.slideshow-toolbar > div { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; }
.slideshow button { min-width: 44px; min-height: 44px; padding: 8px 16px; border: 1px solid #ffffff40; border-radius: 8px; background: #292929; color: white; }
.slideshow button:hover { background: #3c3c3c; }
.slideshow-stage { position: relative; flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; margin-top: 16px; }
.slideshow-stage img { width: 100%; height: 100%; object-fit: contain; }
.slide-arrow { position: absolute; top: 50%; transform: translateY(-50%); font-size: 32px; }
.previous { left: 0; }
.next { right: 0; }
.slide-caption { text-align: center; overflow-wrap: anywhere; max-height: 15dvh; overflow-y: auto; margin: 16px 0 0; }
button:focus-visible, input:focus-visible { outline: 3px solid var(--ui-focus); outline-offset: 3px; }
[hidden] { display: none !important; }
.map-filters { position: absolute; left: 16px; right: 16px; bottom: 42px; max-width: 800px; padding: 12px; background: var(--ui-overlay); border: 1px solid var(--ui-border); border-radius: 12px; box-shadow: 0 3px 16px #00000014; }
.tag-list { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 8px; }
.map-filters button { flex-shrink: 0; border: 1px solid var(--ui-border); border-radius: 20px; background: var(--ui-surface); color: var(--ui-text); padding: 5px 10px; min-height: 30px; font-size: 11px; }
.map-filters button[aria-pressed="true"] { background: var(--ui-active); border-color: var(--ui-active); color: var(--ui-surface); }
.map-filters button:disabled { opacity: .5; cursor: default; }
.route-controls { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
.route-controls span { font-size: 12px; color: var(--ui-muted); }
.marker-number { position: absolute; top: -10px; right: -10px; min-width: 24px; height: 24px; padding: 2px 5px; border-radius: 12px; background: var(--ui-active); color: white; font-size: 12px; border: 2px solid var(--ui-surface); }
.biome-legend { padding: 8px 0 12px; margin-bottom: 12px; border-bottom: 1px solid var(--ui-border); color: var(--ui-text); }
.biome-heading { display: flex; align-items: center; gap: 12px; justify-content: space-between; }
.eyebrow { font-size: 10px; letter-spacing: 3px; color: var(--ui-muted); }
.biome-heading h2 { font-family: Georgia, serif; font-size: 18px; font-weight: 400; margin: 5px 0 12px; }
.biome-legend button { border: 1px solid transparent; background: transparent; color: inherit; border-radius: 6px; padding: 5px 8px; min-height: 30px; text-align: left; }
.biome-heading > button { font-size: 11px; border-color: var(--ui-border); }
.biome-options { display: flex; flex-wrap: wrap; gap: 2px; }
.biome-options button { display: flex; align-items: center; gap: 8px; font-size: 12px; }
.biome-options button[aria-pressed="true"] { color: var(--ui-text); background: var(--ui-subtle); border-color: var(--ui-border); }
.biome-swatch { width: 12px; height: 12px; border-radius: 50%; border: 1px solid #00000020; }
.biome-legend p { font-size: 10px; color: var(--ui-muted); margin: 12px 0 0; }
 .map-filters.is-minimized { right: auto; padding: 5px; border-radius: 22px; }
.map-filters .menu-toggle { font-size: 12px; }
.map-filters.is-open { max-width: 440px; max-height: min(65dvh, 580px); display: flex; flex-direction: column; overflow: hidden; }
.map-filters.is-open .menu-toggle { align-self: flex-start; }
#map-menu-content { margin-top: 8px; overflow-y: auto; overscroll-behavior: contain; min-height: 0; padding: 0 3px 3px; }
.layer-grid { display: grid; gap: 0; margin-top: 8px; }
.layer-row { display: flex; align-items: center; gap: 8px; min-height: 40px; border-bottom: 1px solid var(--ui-border); cursor: pointer; }
.layer-name { flex: 1; font-size: 12px; }
.layer-name small { font-size: 10px; color: var(--ui-muted); margin-left: 4px; }
.layer-row input { appearance: none; width: 28px; height: 16px; border-radius: 10px; background: #bfc2c6; flex-shrink: 0; position: relative; cursor: pointer; margin: 0 3px; }
.layer-row input::after { content: ''; position: absolute; top: 2px; left: 2px; width: 12px; height: 12px; border-radius: 50%; background: var(--ui-surface); transition: transform .15s; }
.layer-row input:checked { background: var(--ui-active); }
.layer-row input:checked::after { transform: translateX(12px); }
.layer-notes { margin-top: 8px; font-size: 11px; color: var(--ui-muted); }
.layer-notes summary { cursor: pointer; padding: 4px 0; }
.biome-heading h2 { font-family: inherit; font-size: 12px; font-weight: 600; margin: 0; }
.biome-heading h2 small { font-weight: 400; font-size: 10px; color: var(--ui-muted); }
.biome-legend { padding: 0 0 8px; margin-bottom: 8px; }
.biome-options { margin-top: 6px; gap: 2px; }
.biome-options button { font-size: 10px; gap: 5px; }
.biome-swatch { flex-shrink: 0; }
@media (max-width: 640px) {
  .map-filters { left: 10px; right: 10px; bottom: max(36px, env(safe-area-inset-bottom)); padding: 10px; }
  .map-filters.is-open { max-height: 62dvh; }
  .route-controls { gap: 6px; }
  .route-controls span { font-size: 10px; }
}
.indigenous-control { border-top: 1px solid var(--ui-border); margin-top: 12px; padding-top: 12px; }
.indigenous-control button { display: flex; align-items: center; gap: 8px; }
.land-popup { padding: 6px; color: var(--ui-text); }
.land-popup p { font-size: 12px; margin: 6px 0; overflow-wrap: anywhere; }
.map-status { top: 16px; left: 16px; max-width: calc(100% - 80px); }
.map-home-link { position: absolute; top: 16px; left: 16px; padding: 9px 14px; border-radius: 20px; color: var(--ui-text); background: var(--ui-overlay); text-decoration: none; font-size: 14px; box-shadow: 0 2px 12px #00000012; }
.map-home-link ~ .map-status { top: 65px; }
.home-page { min-height: 100dvh; padding: 0 max(24px, calc((100vw - 1120px) / 2)); background: var(--ui-page); color: var(--ui-text); }
.home-header { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 28px 0; border-bottom: 1px solid var(--ui-border); }
.home-logo { font-size: 32px; font-weight: 750; letter-spacing: -2px; text-decoration: none; color: inherit; }
.home-logo span { color: var(--ui-active); }
.home-header > span { font-size: 12px; color: var(--ui-muted); }
.home-intro { padding: 72px 0 38px; }
.home-kicker { font-size: 10px; letter-spacing: 2.5px; color: var(--ui-muted); }
.home-intro h1 { font-family: Georgia, serif; font-size: clamp(36px, 5vw, 60px); font-weight: 400; line-height: 1.1; letter-spacing: -1.5px; margin: 18px 0; }
.home-intro > p:last-child { color: var(--ui-muted); font-size: 16px; }
.trip-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 360px), 1fr)); gap: 28px; }
.trip-card { display: block; color: inherit; text-decoration: none; border: 1px solid var(--ui-border); border-radius: 16px; overflow: hidden; background: var(--ui-surface); transition: box-shadow .2s; }
.trip-card:hover { box-shadow: 0 10px 30px #00000010; }
.trip-cover { position: relative; aspect-ratio: 16 / 10; overflow: hidden; background: var(--ui-border); }
.trip-cover img { display: block; width: 100%; height: 100%; object-fit: cover; }
.trip-index { position: absolute; top: 16px; left: 16px; padding: 7px 10px; border-radius: 20px; font-size: 9px; letter-spacing: 1.5px; background: var(--ui-overlay); }
.route-chip { position: absolute; top: 12px; right: 12px; display: block; width: 88px; padding: 8px; border: 1px solid #ffffffa0; border-radius: 12px; background: var(--ui-overlay); box-shadow: 0 3px 14px #00000014; }
.route-chip svg { display: block; width: 100%; height: auto; }
@media (max-width: 640px) { .route-chip { width: 72px; padding: 6px; top: 10px; right: 10px; } }
.trip-info { padding: 24px; }
.trip-region { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; font-size: 10px; color: var(--ui-muted); margin: 0; }
.trip-info h2 { font-family: Georgia, serif; font-size: 27px; font-weight: 400; margin: 16px 0 10px; }
.trip-description { color: var(--ui-muted); margin: 0; }
.trip-open { display: flex; justify-content: space-between; border-top: 1px solid var(--ui-border); margin-top: 24px; padding-top: 16px; font-size: 12px; font-weight: 600; }
.home-footer { padding: 40px 0; font-size: 12px; color: var(--ui-muted); }
a:focus-visible { outline: 3px solid var(--ui-active); outline-offset: 4px; }
.language-switch { display: inline-flex; gap: 2px; padding: 3px; border: 1px solid var(--ui-border); border-radius: 20px; background: var(--ui-page); flex-shrink: 0; }
.language-switch button, .slideshow .language-switch button { color: var(--ui-text); background: transparent; border: 0; padding: 6px 10px; border-radius: 16px; min-height: 30px; font-size: 11px; }
.language-switch button[aria-pressed="true"], .slideshow .language-switch button[aria-pressed="true"] { background: var(--ui-active); color: var(--ui-surface); }
.map-language { position: absolute; top: 16px; right: 55px; }
.overview-map { position: absolute; right: 16px; bottom: 42px; z-index: 2; border: 1px solid var(--ui-border); border-radius: 16px; background: var(--ui-overlay); box-shadow: 0 4px 20px #00000012; color: var(--ui-text); overflow: hidden; }
.overview-map.expanded { width: 205px; }
.overview-toggle { display: flex; justify-content: space-between; gap: 18px; width: 100%; border: 0; background: transparent; padding: 10px 14px; min-height: 38px; font-size: 12px; color: inherit; }
.overview-map svg { display: block; width: 100%; height: 230px; }
.overview-route { fill: none; stroke: var(--locator-route); stroke-width: 2; stroke-linejoin: round; stroke-linecap: round; }
.overview-country { font-size: 9px; fill: var(--ui-muted); letter-spacing: 1px; }
.overview-caption { text-align: center; font-size: 10px; margin: 3px 8px; }
.overview-note { text-align: center; font-size: 9px; margin: 3px; color: var(--ui-muted); }
.overview-credit { display: block; text-align: center; padding: 3px 0 10px; font-size: 8px; color: var(--ui-muted); }
@media (max-width: 640px) { .overview-map { right: 10px; bottom: max(36px, env(safe-area-inset-bottom)); } .overview-map.expanded { width: 165px; bottom: max(88px, calc(env(safe-area-inset-bottom) + 52px)); } .overview-map svg { height: 180px; } .map-filters.is-open { z-index: 3; } }
@media (max-width: 420px) { .map-language { top: 62px; left: 16px; right: auto; } .map-home-link ~ .map-status { top: 110px; } }
@media (max-width: 640px) { .home-header { flex-wrap: wrap; gap: 12px; } .home-header > span { margin-left: auto; } .home-header .language-switch { margin-left: auto; } .slideshow-toolbar { align-items: flex-start; } }
@media (max-width: 640px) { .home-intro { padding-top: 42px; } .home-header > span { max-width: 130px; text-align: right; } .trip-info { padding: 20px; } }

```
