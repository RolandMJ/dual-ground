# Dual Ground — Initial Claude Code Prompt
# Paste this as your very first message in a new Claude Code session

---

Read CLAUDE.md fully before doing anything else. It contains all project-wide
instructions that apply to every session. Do not proceed until you have read it.

Once read, confirm you have understood it by summarising in three sentences:
what we are building, how you will work on it, and what the journal is for.

Then do Stage 1 only. Nothing beyond Stage 1 until I confirm.

---

## Stage 1 — Project Scaffold

Create the full project file structure exactly as defined in CLAUDE.md.

Then build the visual skeleton of the app in index.html + main.css:

- Split screen layout: left panel (Learn) and right panel (Build)
- Left panel contains: module title placeholder, module content area,
  Skills callout box placeholder, quiz area placeholder, Extras section placeholder
- Right panel contains: two stacked zones labeled "Prompt Blocks" and "Skill Blocks",
  a live preview pane below each zone, Copy and Export buttons (non-functional placeholders)
- Top bar: "Dual Ground" name on left, progress indicator in centre ("Module 1 of 6"),
  "Finish & Reveal" button on right (non-functional placeholder)
- The layout must be responsive: on screens narrower than 768px, panels stack vertically

Design direction from CLAUDE.md:
- Refined and purposeful, not flashy
- No purple gradients, no glowing cards
- Each block type will need its own color — establish the color system in CSS variables now
  even though blocks are not built yet
- Choose a distinctive, readable font pair — not Inter, not Roboto, not system fonts
- Use Google Fonts or similar CDN-hosted options

Color system to establish as CSS variables (block colors for later):
- Role block: a clear, grounded blue
- Context block: a neutral warm grey
- Task block: a purposeful orange
- Constraint block: a clear red
- Example block: a confident green
- Prefill block: a teal
- Think block: a deep purple
- Format block: a warm yellow
- Chain block: an indigo
- Tool block: a cyan
- Memory block: a slate blue
- Safety block: a rose

Skill blocks use a lighter/softer version of a unified earthy amber palette
to visually distinguish them from Prompt blocks at a glance.

After building the skeleton:

1. Open it in a browser and confirm it renders without console errors
2. Take note of anything that looks wrong or unclear
3. Create docs/JOURNAL.md and write the first entry for Stage 1
4. Run: git init, git add -A, git commit -m "Stage 1 — project scaffold and layout skeleton"
5. Ask me for the git remote URL so you can add it and push

Do not start Stage 2 until I say so.

Ask me if anything in these instructions is unclear before you start.
