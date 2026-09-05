import { createCn } from "cn/config"

/**
 * Merges class strings and resolves Tailwind conflicts, so a caller's
 * `className` can override a component's own utilities.
 *
 * The extension is load-bearing. FORMA defines custom font sizes in @theme
 * (--text-micro/eyebrow/label), and without registering them here the merger
 * cannot tell `text-label` (a size) from `text-ink` (a colour): it treats them
 * as the same group and silently drops one. That is how the hero's "View
 * Projects" button lost its text colour and rendered white-on-white.
 *
 * Add any further custom --text-* token to this list.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [{ text: ["micro", "eyebrow", "label"] }],
    },
  },
})
