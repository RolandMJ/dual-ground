# Dual Ground

**Two paths. One session. Real output.**

Dual Ground is a split-screen web app that teaches AI prompting through two parallel interactive builders. The left side walks you through ten modules — from AI fundamentals to advanced Claude Code workflows. The right side lets you build a working prompt and a personal SKILL.md file in real time. You finish one session with three exportable outputs.

## What You Get

1. **A working prompt** — assembled from colour-coded blocks (Role, Context, Task, Constraint, Example, Format, and more), ready to copy and use
2. **A SKILL.md file** — a reusable instruction set that Claude Code reads at the start of every conversation
3. **Your AI personality type** — an archetype card based on which block types you gravitated toward, with a personalised playbook

## How It Works

- Work through 10 modules on the left panel — beginner to advanced, covering prompting, Claude.ai, and Claude Code.
- Answer 3 quiz questions per module. Completing a quiz unlocks the corresponding block types on the right panel.
- Build your prompt and SKILL.md using the block builders. Live preview updates as you type.
- Click **Finish & Reveal** when all modules are done to see your three outputs.

The whole thing takes about 45 minutes.

## Run Locally

No build step, no dependencies, no framework. Just serve the files:

```bash
npx serve .
```

Or:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` (or whatever port your server uses).

## Tech

- Vanilla HTML, CSS, JavaScript — no framework, no bundler
- Google Fonts: DM Sans, Source Serif 4, Source Code Pro
- Dark theme with CSS custom properties
- Responsive layout (desktop split-screen, tablet/mobile stacked)
- Works offline once loaded — no API calls, no backend

## Curriculum Modules

**Foundations (Beginner)**
1. What Claude Actually Is
2. Roles and Context
3. Tasks and Constraints
4. Examples and Formatting

**Power Techniques (Intermediate)**
5. Thinking and Reasoning
6. Tools and Real-World Capabilities
7. Working with Claude.ai

**Claude Code (Advanced)**
8. Getting Started with Claude Code
9. Claude Code Workflows
10. Building Your Own System

All content is cross-checked against [Anthropic's public documentation](https://docs.anthropic.com).

## Project Structure

```
dual-ground/
├── index.html
├── src/
│   ├── styles/main.css
│   ├── js/          (app.js, curriculum.js, promptForge.js, skillForge.js, output.js)
│   └── data/        (modules.js, archetypes.js, playbook.js)
├── docs/
│   ├── JOURNAL.md   (build journal with every decision documented)
│   └── PITCH.md     (2-3 minute demo script)
└── assets/
    ├── fonts/
    └── images/
```

## License

This project was built as a coursework submission. All rights reserved.
