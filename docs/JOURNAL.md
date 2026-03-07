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

---

## 2026-03-07 — Stage 2: Block Builder Shell

**Stage:** Stage 2
**Status:** completed

Built the full interactive block builder for both prompt and skill zones. The prompt zone has
12 colour-coded add buttons (Role, Context, Task, Constraint, Example, Prefill, Think, Format,
Chain, Tool, Memory, Safety). The skill zone has 5 amber-palette buttons (Name, Description,
Trigger, Steps, Notes). Clicking any button adds a block card with an inline auto-resizing
textarea, a drag handle for reordering, and a delete button that appears on hover.

Blocks can be dragged and dropped to reorder within their zone. The live preview updates in
real-time as blocks are added, edited, reordered, or removed. Preview has a styled/raw toggle
— styled view shows colour-coded sections with labels, raw view shows plain text with
[BlockType] markers (prompt) or markdown headings (skill).

Copy buttons write to clipboard with a green flash confirmation. Export buttons download as
prompt.txt or SKILL.md. All JS parses cleanly. Design doc saved to docs/plans/.

**Issues:** None
**Workaround / Solution:** N/A
**Next:** Stage 3 — curriculum content, all 6 modules written and rendered

---

## 2026-03-07 — Stage 3: Curriculum Content and Renderer

**Stage:** Stage 3
**Status:** completed

Wrote all 6 modules of curriculum content in modules.js: (1) What Claude Actually Is,
(2) Roles and Context, (3) Tasks and Constraints, (4) Examples and Formatting, (5) Thinking
and Chaining, (6) Tools, Memory, and Safety. Each module has 4 content paragraphs, a Skills
Connection callout, 3 quiz questions with correct/wrong explanations, and an Extras section
with reference links to Anthropic docs and a "Why this matters" paragraph.

Content is cross-checked against Anthropic's public documentation. Writing style follows
CLAUDE.md guidelines — specific, plain language, no filler phrases, real examples. Quiz
questions test understanding not memorisation, with plausible wrong answers and clear
explanations.

Built the full curriculum renderer in curriculum.js: module navigation (prev/next buttons),
dynamic content rendering, interactive quiz with colour-coded feedback (green correct, red
wrong), score summary when all 3 questions are answered, extras section with clickable
reference links. Progress indicator in topbar updates with current module number.

Added comprehensive CSS for quiz options, feedback messages, score summary, extras links,
visual placeholders, and module navigation. All styles follow the dark theme.

**Issues:** None
**Workaround / Solution:** N/A
**Next:** Stage 4 — unlock logic, quiz completion triggers block tier unlock
