/**
 * The two type treatments that open almost every section on the site.
 * Kept as class strings rather than components because they are applied to
 * varying elements (p, h1, h2) and usually through <Reveal as="...">.
 */

/** Small terracotta-or-ash kicker above a section title. */
export const eyebrowClass =
  "mb-4 text-eyebrow uppercase tracking-[0.25em] text-ash";

/** Large display heading that follows an eyebrow. */
export const sectionTitleClass =
  "mb-14 font-display text-[clamp(2.2rem,4vw,3.5rem)] font-light leading-[1.1] tracking-[-0.01em]";
