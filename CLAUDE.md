# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Development

This is a static web app (HTML + CSS + vanilla JS). No build step, no bundler, no framework.

**Local development:**
```bash
# Serve locally (use any static server)
npx serve .            # or: python3 -m http.server 8000
```

Then open `http://localhost:3000` (serve) or `http://localhost:8000` (python).

**Architecture:**
- Split-screen layout: left panel = curriculum (learn), right panel = block builders (build)
- Data flow: quiz completion (curriculum.js) -> unlocks block tiers (promptForge.js / skillForge.js) -> archetype scoring + exports (output.js)
- All curriculum content lives in `src/data/modules.js` as structured data, rendered by `src/js/curriculum.js`
- State management is centralized in `src/js/app.js`
- No external dependencies beyond Google Fonts — everything is vanilla JS and CSS

---

# Project Instructions

These instructions apply to every session, every file, every output in this project.
Read this fully before doing anything. Do not skip sections.

---

## What We Are Building

Dual Ground is a split-screen web app that teaches Claude and Claude Code through two parallel
interactive builders running simultaneously. The left side is a curriculum. The right side is
a live block-based builder. You finish one session with three real, exportable outputs:
a working prompt, a personal SKILL.md file, and an AI personality type card.

The name is Dual Ground. The tagline is: "Two paths. One session. Real output."

The full project blueprint lives in `docs/BLUEPRINT.md`. Read it before building anything new.

---

## How You Work on This Project

### Ask first, build second

If you are unsure about scope, design, or behaviour — stop and ask. Do not guess and build.
One clarifying question saves hours of rework. Ask it.

### Think before you output

Before writing code or content, do a genuine cross-check:
- Is this grounded in what Anthropic actually documents?
- Does this match the blueprint?
- Will this break something that already works?
- Is there a simpler way to do this that I haven't considered?

State your reasoning briefly before you start. Not an essay — two or three sentences is enough.
If something feels off, say so.

### Work in stages, not in one giant push

Each stage has a clear deliverable. Finish it, test it, journal it, commit it. Then move to the next.
Do not combine multiple stages into one session unless explicitly asked.

---

## The Project Journal

A journal file lives at `docs/JOURNAL.md`.

Update it after every meaningful action. That means:
- When a stage is completed
- When a problem is found
- When a workaround or fix is applied
- When a decision is made that affects the project direction
- When a commit is made

Each journal entry follows this format:

```
## [TIMESTAMP] — [SHORT TITLE]

**Stage:** which build stage this belongs to
**Status:** completed / in progress / blocked / workaround applied

What happened in plain language. No bullet-point walls. Write like a human noting
things down for their own future reference. Two to five sentences is usually enough.

**Issues:** describe any problems encountered, even minor ones
**Workaround / Solution:** what was done to fix or get around it
**Next:** what comes immediately after this
```

Do not skip journal entries to save time. They are non-negotiable.
The journal is how Roland can explain every decision in his pitch.

---

## Git Workflow

This project uses git from day one. After every completed stage:

1. Stage all changed files: `git add -A`
2. Write a commit message that describes what actually changed in plain language.
   No "update files" or "fix stuff". Example: `"Add Module 1 quiz logic and unlock Role + Context blocks"`
3. Push to remote: `git push origin main`

If git is not yet initialised, do this first:
```bash
git init
git add -A
git commit -m "Initial scaffold — Dual Ground project structure"
git remote add origin [Roland will provide the repo URL]
git push -u origin main
```

Ask Roland for the repo URL before the first push if it has not been provided.

Always confirm with Roland before force-pushing or rebasing anything.

---

## Testing

After every stage that adds interactive functionality, run a basic test pass:

- Open the app in a browser and walk through the affected flow manually
- Check browser console for errors — fix any before committing
- Confirm the new feature does not break anything from the previous stage
- For quiz logic: test a correct answer, a wrong answer, and a skipped state
- For block builders: test adding, editing, and removing each block type
- For the output screen: test all three export actions (copy prompt, download SKILL.md, download card)

Document what was tested and the result in the journal entry for that stage.
Do not commit broken code.

---

## Writing Style — For All User-Facing Text

This applies to every word a user reads: module content, quiz questions, tooltips, labels,
button text, error messages, personality card copy, playbook content, everything.

**Do:**
- Write like a knowledgeable person explaining something to a curious friend
- Use short sentences and plain words where possible
- Be specific — "Claude uses context from earlier in the conversation" beats "Claude leverages contextual information"
- When something is genuinely complex, say so plainly: "This one takes a bit of practice"
- Use real examples grounded in things people actually do

**Do not:**
- Use filler phrases: "it's worth noting", "diving into", "let's explore", "in today's world"
- Use AI-typical formatting: excessive bold, bullet-point everything, headers for two-sentence paragraphs
- Invent capabilities or features Claude does not actually have
- Oversell — if a technique works sometimes but not always, say that
- Use jargon without immediately explaining it in plain language

**Cross-check curriculum content** against Anthropic's public documentation before writing it.
If something cannot be verified, do not include it. Flag it for Roland to decide.

---

## Visual and Design Direction

The aesthetic is: **refined and purposeful, not flashy**. This is a tool people use, not a demo they watch.

- Typography: distinctive, readable, not generic system fonts
- Color: a committed palette with clear meaning — each block type has its own consistent color
- Motion: used to signal state change (unlock, complete, add block) not for decoration
- Layout: the split screen must feel balanced and intentional, not like two apps forced together
- Mobile: the layout should degrade gracefully — stacked panels on narrow screens

Avoid purple gradients, glowing cards, confetti explosions, and anything that looks like every
other AI app built in 2024. Dual Ground should look like it was designed with intention.

---

## Curriculum Content Rules

Every module must:
- Open with one concrete, honest statement about what Claude does or how it works
- Include one Skills callout box that connects the prompting concept to a SKILL.md use case
- End with exactly 3 quiz questions
- Include at the bottom an "Extras" section with:
  - At least one visual (diagram, screenshot reference, or embedded image where possible)
  - At least two reference links to real Anthropic documentation or public resources
  - One "Why this matters" rationale paragraph written in plain language

Quiz questions must:
- Test understanding, not memorisation
- Have one clearly correct answer and three plausible but wrong alternatives
- Show a plain-language explanation on wrong answer — not just "Incorrect"
- Show a one-sentence reinforcement on correct answer — not just "Correct!"

---

## File Structure

```
dual-ground/
├── CLAUDE.md                  ← you are here
├── index.html                 ← main app entry point
├── src/
│   ├── styles/
│   │   └── main.css
│   ├── js/
│   │   ├── curriculum.js      ← module content, quiz logic, unlock state
│   │   ├── promptForge.js     ← prompt block builder logic
│   │   ├── skillForge.js      ← SKILL.md block builder logic
│   │   ├── output.js          ← final screen: archetype scoring, exports
│   │   └── app.js             ← main init and state management
│   └── data/
│       ├── modules.js         ← all curriculum content as data
│       ├── archetypes.js      ← personality type definitions and scoring
│       └── playbook.js        ← starter playbook content per archetype
├── docs/
│   ├── BLUEPRINT.md           ← full project blueprint
│   └── JOURNAL.md             ← project journal (auto-updated each stage)
└── assets/
    ├── fonts/
    └── images/
```

Do not deviate from this structure without asking first.

---

## Build Stages Reference

| Stage | Deliverable | Est. Hours |
|-------|-------------|------------|
| 1 | Project scaffold, layout skeleton, git init | 1–2h |
| 2 | Block builder shell — all blocks interactive, live preview | 3h |
| 3 | Curriculum content — all 6 modules written and rendered | 4h |
| 4 | Unlock logic — quiz completion triggers block tier unlock | 2h |
| 5 | Output screen — three panels, archetype scoring, exports | 3h |
| 6 | Visual polish — color system, animations, responsive layout | 3h |
| 7 | Full test pass, bug fixes, pitch script | 3h |
| 8 | Buffer, pitch video, final push | 2–3h |

Roland sets the pace. Start each stage only when asked.

---

## What Roland Values

- Honesty over optimism — if something will take longer than expected, say so immediately
- Precision over speed — a smaller thing done right beats a bigger thing done loosely
- Explanation over magic — when you make a decision, say why in one sentence
- Questions over assumptions — when in doubt, ask
