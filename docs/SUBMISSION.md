# Dual Ground — Hackathon Submission

## Submission Text (copy-paste ready)

---

**Dual Ground — Learn AI by actually building something**

I couldn't learn Claude properly. I watched tutorials, read docs, got overwhelmed. I'm not a programmer. Then I realised: the problem isn't that Claude is hard — the problem is that nobody lets you learn and build at the same time.

So I built Dual Ground.

It's a split-screen web app. Left side: 10 bite-sized modules on how Claude actually works — no fluff, no jargon, cross-checked against Anthropic's public docs. Right side: a live builder where you assemble a real prompt and a SKILL.md file, block by block, as you learn. Finish a module, new blocks unlock. Everything connects.

Scroll down and there's an interactive terminal simulator — real Claude Code commands you can run without installing anything. I went from fearing the terminal to loving it. That section is why.

When you're done, you leave with three things:
- A ready-to-use prompt
- A SKILL.md file you can drop into Claude Code today
- Your AI personality type — based on how you build, not a quiz

No account. No backend. No paywall. Pure frontend, works in any browser.

**Try it:** https://rolandmj.github.io/dual-ground/

**Built:** Solo, in ~28 hours across 2 days, using Claude Code (Opus). 7,000 lines of vanilla JS/CSS/HTML — no framework, no build step, loads instantly.

**Estimated cost:** ~$20 in Claude API usage via Claude Code CLI (Opus model, Max subscription). Zero other costs — no hosting fees (GitHub Pages), no paid tools, no assets purchased.

**Tech:** Vanilla JavaScript, CSS custom properties, localStorage for state, zero dependencies beyond Google Fonts.

---

## Short Version (if character limit)

I couldn't learn Claude properly — tutorials and playgrounds are always separate. So I built Dual Ground: a split-screen app where you learn how Claude works on the left and build a real prompt + SKILL.md on the right. Includes an interactive terminal simulator for Claude Code commands. You leave with three usable outputs. No account, no backend. Built solo in 28 hours with Claude Code. Try it: https://rolandmj.github.io/dual-ground/

---

## Cost Breakdown

| Item | Cost |
|------|------|
| Claude Code CLI (Opus 4.6) — ~28 hours of development | ~$20 (Max subscription, estimated token share) |
| GitHub Pages hosting | Free |
| Google Fonts | Free (SIL Open Font License) |
| Domain | None (using GitHub Pages URL) |
| Design tools | None (hand-coded CSS) |
| Libraries/frameworks | None (vanilla JS) |
| **Total** | **~$20** |

Note: The $20 estimate is based on proportional usage of a Claude Max subscription ($100/month). If calculated at raw API rates (Opus input/output tokens), the equivalent cost would be approximately $80-120 for the volume of code generation, editing, and conversation across 30 commits and multiple sessions. The Max subscription made this project economically viable for a solo non-programmer.
