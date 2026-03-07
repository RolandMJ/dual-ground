# Stage 2 Design: Block Builder Shell

## Interaction Flow

1. **Add buttons** — Row of colour-coded "+" buttons below each zone header, one per block type. Each shows block name and uses assigned colour. All visible for now; unlock gating comes in Stage 4.

2. **Block cards** — Clicking add button appends a card to the zone:
   - Coloured left border matching block type
   - Block type label
   - Inline textarea, auto-resizes as you type
   - Delete button (x, top-right)
   - Drag handle (grip icon, left side)

3. **Drag to reorder** — Vanilla JS drag-and-drop within each zone. Visual feedback during drag.

4. **Live preview** — Updates in real-time:
   - Styled view (default): colour-coded sections with labels
   - Raw view (toggle): plain text with [BlockType] markers
   - Toggle button in preview pane header

## Block Types

- **Prompt zone (12):** Role, Context, Task, Constraint, Example, Prefill, Think, Format, Chain, Tool, Memory, Safety
- **Skill zone (5):** Name, Description, Trigger, Steps, Notes

## Action Buttons

- Copy: copies raw text to clipboard
- Export/Download: downloads as .txt / .md file

## Files

- `src/js/promptForge.js` — prompt block logic
- `src/js/skillForge.js` — skill block logic
- `src/styles/main.css` — block card styles, add-button row, drag states
- `index.html` — add button rows in each zone
