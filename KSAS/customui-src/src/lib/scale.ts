/**
 * The KSAS screens are one fixed 1697 x 1080 cockpit composition — the Figma
 * frame every measurement comes from — rather than a document that reflows, so
 * they scale as a whole instead of rearranging. Every size is written in `rem`
 * at one rem per 16 design pixels, and `html.ksas-scaled` in `App.css` sizes the
 * root so that ratio holds on any viewport.
 *
 * Sizes that sit in a class name are already divided (`h-[7.5rem]` is the
 * design's 120 px); this converts the ones only known at runtime.
 */
export const designPx = (px: number) => `${px / 16}rem`

/**
 * The same ratio as an actual screen-pixel count, for the code that has to hand
 * one to a library rather than to CSS — Google Maps' `fitBounds` padding. Read
 * back off the root font size so `html.ksas-scaled` stays the only place the
 * scale is decided.
 */
export const designPxToScreen = (px: number) =>
  (px * parseFloat(getComputedStyle(document.documentElement).fontSize)) / 16
