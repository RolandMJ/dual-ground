# Dual Ground — Project Journal

---

## 2026-03-07 — Project Initialisation

**Stage:** Pre-build setup
**Status:** completed

Created the project folder, CLAUDE.md with full project instructions, and initial-prompt.md
for guiding Claude Code sessions. Updated CLAUDE.md with development commands and architecture
overview. Created this journal file. Initialised git repository.

**Issues:** None
**Workaround / Solution:** N/A
**Next:** Stage 1 — project scaffold and layout skeleton

---

## 2026-03-07 — Stage 1: Project Scaffold and Layout Skeleton

**Stage:** Stage 1
**Status:** completed

Built the full project file structure as defined in CLAUDE.md. Created index.html with the
split-screen layout: top bar (logo, progress indicator, disabled Finish button), left panel
(module title, content area, skills callout, quiz area, extras section), right panel (prompt
blocks zone and skill blocks zone, each with a block drop area, dark live preview pane, and
action buttons). All interactive elements are non-functional placeholders.

Established the CSS design system in main.css: 12 prompt block color variables, 5 skill block
amber-palette variables, surface/text/spacing tokens, and responsive stacking at 768px. Font
pair is DM Sans (UI/headings) + Source Serif 4 (body) + Source Code Pro (preview panes), all
via Google Fonts. Aesthetic is clean, warm, and grounded — no gradients, no glow effects.

Created all placeholder JS files (app.js, curriculum.js, promptForge.js, skillForge.js,
output.js) and data files (modules.js with 6 module stubs, archetypes.js, playbook.js).
App initialises all modules on DOMContentLoaded.

Tested locally with `npx serve .` — returns 200, HTML renders, all scripts load without
console errors.

**Issues:** None
**Workaround / Solution:** N/A
**Next:** Stage 2 — block builder shell with all blocks interactive and live preview

---

## 2026-03-07 — Visual Overhaul: Dark Theme

**Stage:** Stage 1 (polish)
**Status:** completed

Reworked the entire colour system from a sterile light theme to a dark, engaging design. Key
changes: dark surfaces (#0e1117 base), vibrant block colours bumped up for contrast against
dark backgrounds, gradient logo text, pill-shaped buttons and progress badge, coloured dot
indicators on build zone headers, glowing hover states on the block drop areas, subtle gradient
accent line on the quiz area, styled scrollbars, and more visual hierarchy through brightness
levels rather than weight alone. The aesthetic now feels alive without being flashy — dark mode
that's warm and inviting rather than cold.

**Issues:** None
**Workaround / Solution:** N/A
**Next:** Stage 2 — block builder shell with all blocks interactive and live preview
