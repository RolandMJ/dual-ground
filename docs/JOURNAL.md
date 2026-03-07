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

---

## 2026-03-07 — Stage 4: Unlock Logic

**Stage:** Stage 4
**Status:** completed

Implemented the full unlock system connecting quiz completion to block availability. All block
add buttons now start in a locked state (greyed out with lock icon, disabled). When a user
answers all 3 quiz questions in a module, the corresponding blocks unlock with a scale-up
animation, the lock icon switches to a "+" sign, and a toast notification appears in the
bottom-right showing which blocks were unlocked.

Unlock mapping follows module topics: Module 1 (What Claude Is) unlocks Role + Context +
Name; Module 2 (Roles and Context) unlocks Task + Constraint + Description; Module 3 unlocks
Example + Prefill + Trigger; Module 4 unlocks Format + Think + Steps; Module 5 unlocks Chain +
Tool + Notes; Module 6 unlocks Memory + Safety.

The Finish button in the topbar enables with a pulsing green glow when all 6 modules are
completed. State management centralised in App.js with the UNLOCK_MAP constant and
onModuleComplete method that coordinates between Curriculum, PromptForge, and SkillForge.

**Issues:** None
**Workaround / Solution:** N/A
**Next:** Stage 5 — output screen with archetype scoring and exports

---

## 2026-03-07 — Stage 5: Output Screen

**Stage:** Stage 5
**Status:** completed

Built the output screen that appears when the user clicks "Finish & Reveal". It replaces the
main split-screen view with a three-panel grid showing the user's results.

Panel 1 shows the assembled prompt with styled block sections and a "Copy Prompt" button.
Panel 2 shows the SKILL.md content with a "Download SKILL.md" button. Panel 3 shows the
user's AI personality archetype — scored based on which prompt block types they used most.

Five archetypes defined: The Architect (structure-focused), The Explorer (example/chain-focused),
The Guardian (safety/memory-focused), The Pragmatist (lean task/context-focused), and The
Craftsperson (balanced across all types). Each has a title, tagline, description, and a
4-tip playbook with personalised advice.

Scoring logic in archetypes.js uses weighted block type counts. Special case: if user used 5+
types evenly, they're classified as Craftsperson. Playbook tips in playbook.js are specific
and actionable per archetype. Card can be downloaded as a text file.

Output screen has a "Back to Builder" button, gradient title, responsive grid (stacks on
mobile), and consistent dark theme styling.

**Issues:** None
**Workaround / Solution:** N/A
**Next:** Stage 6 — visual polish, animations, and responsive refinement

---

## 2026-03-07 — Stage 6: Visual Polish

**Stage:** Stage 6
**Status:** completed

Comprehensive visual polish pass across the entire app. Added custom easing curves (ease-out
and ease-bounce) as CSS variables for consistent motion. Key animation additions:

- Module content fade-in on navigation with staggered delays for callout, quiz, and extras
- Block cards slide in from left when added
- Quiz correct answers pulse, wrong answers shake
- Quiz feedback slides down into view
- Block unlock animation now uses bounce easing
- Output screen panels stagger-animate upward on reveal
- Output panels lift on hover with shadow depth
- Buttons shift up slightly on hover with active press state
- Add-block buttons bounce on unlock and compress on click
- Dragged block cards rotate slightly for physical feel

Progress indicators added: 6 dots in the topbar next to the module counter. Active module
gets an accent-blue glow. Completed modules turn green with a scale-bounce animation on
completion. Dots hidden on mobile to save space.

Responsive improvements: added tablet breakpoint (769-1024px) for output panels (2-column
with centered third card), adjusted font sizes and button sizing for narrow screens, ensured
add-button rows wrap gracefully with smaller gap/padding on mobile.

Other polish: backdrop blur on topbar, deepened preview pane background, module subtitle now
has a decorative accent line, extras "Why this matters" section gets a card background,
reference links use arrow prefix and slide on hover, toast notification has checkmark icon
and deeper shadow, Finish button fills green on hover when ready.

**Issues:** None
**Workaround / Solution:** N/A
**Next:** Stage 7 — full test pass, bug fixes, pitch script

---

## 2026-03-07 — Stage 7: Test Pass, Bug Fixes, Pitch Script

**Stage:** Stage 7
**Status:** completed

Ran a full code review across all JS, HTML, and CSS files. Found and fixed 6 issues:

1. **CRITICAL — renderExtras null access:** `extras.links` and `extras.visuals` could throw
   TypeError if missing. Added safe fallback with default empty arrays.
2. **CRITICAL — typo "dualgound":** Fixed to "dualground" in archetype card download text.
3. **IMPORTANT — empty block detection:** Output panels now check for actual content in blocks
   rather than relying on `getRawText()` which returns placeholder text for empty blocks.
4. **IMPORTANT — clipboard error handling:** Added `.catch()` to all `navigator.clipboard`
   calls so users get "Copy failed" feedback if clipboard access is denied.
5. **IMPORTANT — hardcoded display style:** Replaced `style.display` manipulation with CSS
   class toggle (`app--hidden`) for showing/hiding the main layout.
6. **NOTED — module unlock on attempt:** Quiz completion triggers block unlock regardless of
   score. Kept as-is — this is a deliberate design choice (completion = engagement, not
   perfection). The explanations teach on wrong answers anyway.

Wrote pitch script at docs/PITCH.md — a 2-3 minute live demo walkthrough covering the
problem, the solution, the flow (with demo cues), the three outputs, and key Q&A talking
points. Written in Roland's voice, focused on practical outcomes not features.

**Issues:** All found issues resolved
**Workaround / Solution:** See fixes above
**Next:** Stage 8 — buffer, pitch video, final push

---

## 2026-03-07 — Post-Stage 7: Full Plausibility Audit

**Stage:** Post-build audit
**Status:** completed

Ran a comprehensive plausibility and function audit across all HTML, CSS, and JS files. Verified
all DOM IDs, CSS class references, cross-zone drag isolation, quiz-to-unlock flow, archetype
scoring edge cases, responsive breakpoints, and clipboard error handling. Found 3 issues:

1. **BUG — Empty blocks in exports:** `getRawText()` and `getMarkdown()` included all blocks
   regardless of content, using "..." as placeholder for empty ones. Fixed by filtering to only
   blocks with actual content. Both functions now return empty string when no filled blocks exist.
2. **BUG — Output export buttons active on empty content:** Copy Prompt and Download SKILL.md
   buttons on the output screen were clickable even when the panel showed "no content" message.
   Fixed by disabling buttons when `hasContent` is false, re-enabling when content exists.
3. **UX — Finish button visible on output screen:** The "Finish & Reveal" button remained visible
   and clickable on the output screen (clicking just re-rendered, harmless but confusing). Fixed
   by hiding it when output screen shows and restoring it on "Back to Builder".

**Issues:** All 3 resolved
**Workaround / Solution:** See fixes above
**Next:** Stage 8 — buffer, pitch video, final push
