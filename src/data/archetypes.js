// Personality archetype definitions and scoring
// Archetypes are determined by which prompt block types the user emphasised

const ARCHETYPES = [
  {
    id: 'architect',
    title: 'The Architect',
    tagline: 'You build systems, not sentences.',
    description: 'You gravitate toward structure and precision. Your prompts are carefully scaffolded — roles are defined, constraints are explicit, and formatting is deliberate. You treat Claude like a tool that performs best with clear blueprints. People like you build the prompts that other people wish they had written.',
    color: '#4d9de0',
    // Scores high when: role, constraint, format blocks are heavily used
    weights: { role: 3, constraint: 3, format: 3, context: 2, task: 1, prefill: 2 }
  },
  {
    id: 'explorer',
    title: 'The Explorer',
    tagline: 'You learn by doing, then doing it differently.',
    description: 'You lead with examples and experimentation. Rather than over-specifying up front, you show Claude what you want and iterate. Your strength is in few-shot patterns and chain-of-thought prompts — you think in sequences, not single shots. You are the person who finds the edge cases nobody else thought to test.',
    color: '#45b877',
    // Scores high when: example, think, chain blocks are heavily used
    weights: { example: 3, think: 3, chain: 3, tool: 2, prefill: 1, task: 1 }
  },
  {
    id: 'guardian',
    title: 'The Guardian',
    tagline: 'You think about what could go wrong — before it does.',
    description: 'Safety and memory are your priorities. You think about edge cases, set explicit boundaries, and make sure Claude remembers what matters. Your prompts are built for production, not just prototyping. You are the one who asks "what happens when this breaks?" before anyone else realises it could.',
    color: '#e07088',
    // Scores high when: safety, memory, constraint blocks are heavily used
    weights: { safety: 3, memory: 3, constraint: 2, context: 2, role: 1, tool: 1 }
  },
  {
    id: 'pragmatist',
    title: 'The Pragmatist',
    tagline: 'You say exactly what you need. Nothing more.',
    description: 'You favour directness over decoration. Your prompts are lean — a clear task, enough context to ground it, and nothing extra. You trust Claude to fill reasonable gaps and focus your energy on specifying what actually matters. You get more done with fewer tokens than anyone in the room.',
    color: '#e8913a',
    // Scores high when: task, context blocks dominate with few others
    weights: { task: 3, context: 3, role: 1, constraint: 1 }
  },
  {
    id: 'craftsperson',
    title: 'The Craftsperson',
    tagline: 'You use every tool in the box.',
    description: 'You balance breadth and depth. Your prompts draw from every block type — roles, examples, constraints, formatting, and safety all get attention. You do not over-index on any single technique. You are the generalist who builds prompts that are robust, readable, and surprisingly hard to improve on.',
    color: '#9b6dd7',
    // Scores high when: blocks are spread evenly across many types
    weights: { role: 1, context: 1, task: 1, constraint: 1, example: 1, format: 1, think: 1, chain: 1, safety: 1, memory: 1, tool: 1, prefill: 1 }
  }
];

// Scoring function: given user's prompt blocks, determine archetype
function scoreArchetype(promptBlocks) {
  if (!promptBlocks.length) return ARCHETYPES[3]; // Default to Pragmatist if empty

  // Count how many blocks of each type were used (with content)
  const usage = {};
  promptBlocks.forEach(b => {
    if (b.content && b.content.trim()) {
      usage[b.type] = (usage[b.type] || 0) + 1;
    }
  });

  const usedTypes = Object.keys(usage).length;

  // Special case: if user used 5+ different block types relatively evenly, they're a Craftsperson
  if (usedTypes >= 5) {
    const counts = Object.values(usage);
    const max = Math.max(...counts);
    const min = Math.min(...counts);
    if (max - min <= 2) return ARCHETYPES.find(a => a.id === 'craftsperson');
  }

  // Score each archetype
  let bestScore = -1;
  let bestArchetype = ARCHETYPES[3];

  ARCHETYPES.forEach(arch => {
    let score = 0;
    Object.entries(arch.weights).forEach(([blockType, weight]) => {
      if (usage[blockType]) {
        score += usage[blockType] * weight;
      }
    });

    if (score > bestScore) {
      bestScore = score;
      bestArchetype = arch;
    }
  });

  return bestArchetype;
}
