// Starter playbook tips per archetype
const PLAYBOOKS = {
  architect: [
    'Start every prompt with a system-level role definition. Be specific about expertise and perspective.',
    'Use the Constraint block liberally — Claude follows explicit boundaries more reliably than implied ones.',
    'Pair Format blocks with Prefill to eliminate preamble and get structured output from the first token.',
    'Build a SKILL.md template for your most common workflows and iterate on it weekly.'
  ],
  explorer: [
    'Lead with one high-quality example before giving instructions. Show, then tell.',
    'Use Chain blocks to break complex tasks into focused steps — review between each one.',
    'Add a Think block when the task involves analysis, comparison, or multi-step reasoning.',
    'Keep a collection of your best few-shot examples. They are reusable across many prompts.'
  ],
  guardian: [
    'Always include a Safety block that defines what Claude should refuse or flag.',
    'Use Memory blocks to persist critical context across conversations.',
    'Test your prompts with adversarial inputs — what happens with empty data, edge cases, or ambiguous requests?',
    'Add constraints for handling uncertainty: "If unsure, say so rather than guessing."'
  ],
  pragmatist: [
    'Your strength is clarity. Keep prompts lean but make sure the Task block is specific enough.',
    'Add one Constraint block for output format — it saves back-and-forth without adding bloat.',
    'When results are inconsistent, add one Example block. It is the highest-leverage addition for minimal prompts.',
    'Consider a Context block for recurring tasks — a sentence of background can shift output quality significantly.'
  ],
  craftsperson: [
    'Your balanced approach is your strength. Resist the urge to over-optimise any single block type.',
    'Review your prompts for redundancy — sometimes a good Example makes a Constraint unnecessary.',
    'Build SKILL.md files that combine your best patterns into reusable templates.',
    'Share your prompts with others. Your balanced structure makes them unusually readable and adaptable.'
  ]
};
