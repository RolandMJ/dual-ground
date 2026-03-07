// Module content data — all 6 modules
// Content cross-checked against Anthropic's public documentation (docs.anthropic.com)

const MODULES = [
  {
    id: 1,
    title: 'What Claude Actually Is',
    subtitle: 'Understanding the model before you prompt it',
    content: [
      'Claude is a large language model built by Anthropic. It predicts the most helpful next response based on the conversation so far. It does not search the internet, run code, or remember previous conversations unless specifically given tools to do so.',
      'Every time you start a new conversation, Claude begins with zero memory of you. It only knows what is inside the current conversation window — your messages, its replies, and any system prompt set before the conversation started. This is called the context window.',
      'Claude processes the entire conversation from the top every time it replies. It does not "read" your latest message in isolation — it re-reads everything. This means the order and structure of your earlier messages shape every response that follows.',
      'One practical consequence: if you give Claude conflicting instructions early and late in a conversation, the later instruction does not automatically override the earlier one. Claude weighs both. Being clear and consistent throughout matters more than people expect.'
    ],
    skillCallout: 'When you build a SKILL.md file, you are creating a reusable system prompt — a set of instructions Claude reads before every conversation. Understanding how Claude processes that context is the foundation for everything else you will build here.',
    quiz: [
      {
        question: 'When you start a new conversation with Claude, what does it remember from your previous conversations?',
        options: [
          'Key facts you mentioned in the last session',
          'Nothing — each conversation starts from zero',
          'A summary of your past three conversations',
          'Whatever it considers most important'
        ],
        correct: 1,
        explanationCorrect: 'Each conversation is a clean slate. Claude only knows what is in the current context window.',
        explanationWrong: 'Claude has no memory between conversations. Every new conversation starts completely fresh — it only sees what is in the current context window.'
      },
      {
        question: 'How does Claude process your messages in a conversation?',
        options: [
          'It only reads your latest message',
          'It reads a summary of the conversation plus your latest message',
          'It re-reads the entire conversation from the top each time',
          'It focuses on the first and last messages'
        ],
        correct: 2,
        explanationCorrect: 'Claude processes the full conversation every time it generates a response. Order and structure matter throughout.',
        explanationWrong: 'Claude does not skip or summarise. It re-reads the entire conversation from the beginning every time it responds. This is why the structure of earlier messages affects later answers.'
      },
      {
        question: 'If you give Claude contradictory instructions at the start and end of a conversation, what happens?',
        options: [
          'The last instruction always wins',
          'The first instruction always wins',
          'Claude weighs both and may produce mixed results',
          'Claude asks you to clarify before responding'
        ],
        correct: 2,
        explanationCorrect: 'Claude considers the full context. Conflicting instructions can lead to unpredictable blending rather than one cleanly overriding the other.',
        explanationWrong: 'Neither first nor last instruction automatically wins. Claude processes everything together, which means contradictions can produce inconsistent results. Keeping your instructions consistent is more reliable than trying to "override" earlier ones.'
      }
    ],
    extras: {
      visuals: ['Diagram: Context window showing system prompt + user messages + assistant responses'],
      links: [
        { text: 'Anthropic — Introduction to Claude', url: 'https://docs.anthropic.com/en/docs/about-claude/models' },
        { text: 'Anthropic — Context window and token limits', url: 'https://docs.anthropic.com/en/docs/about-claude/models#model-comparison' }
      ],
      whyItMatters: 'Understanding how Claude actually works — stateless, context-driven, processing everything from the top — prevents the single most common mistake: assuming it "knows" things it does not. Every prompting technique you will learn builds on this foundation.'
    }
  },
  {
    id: 2,
    title: 'Roles and Context',
    subtitle: 'Telling Claude who to be and what to know',
    content: [
      'A role tells Claude what perspective to adopt. "You are a senior Python developer" is different from "You are a writing tutor." The role shapes Claude\'s vocabulary, assumptions, and level of detail. It is not pretending — it is adjusting which patterns in its training are most relevant.',
      'Context gives Claude the background information it needs to respond well. This includes things like who the audience is, what has already been tried, what the constraints are, and any domain-specific details Claude would not know on its own.',
      'The system prompt is where roles and context work best. It sits at the top of the conversation and gets read first every time Claude responds. Think of it as the "brief" you hand someone before a meeting — it frames everything that follows.',
      'A common mistake is giving Claude a role without context, or context without a role. "You are a doctor" without specifying the audience or purpose leads to generic responses. "Here is a patient history" without a role leaves Claude guessing what kind of analysis you want. The combination is what makes responses specific and useful.'
    ],
    skillCallout: 'Your SKILL.md file starts with a role and context. The Name and Description blocks you saw in the builder? Those become the role. The Trigger block becomes the context — it tells Claude when and how this skill should activate.',
    quiz: [
      {
        question: 'What does giving Claude a role actually do?',
        options: [
          'It makes Claude pretend to be someone else',
          'It adjusts which patterns in Claude\'s training are most relevant to the task',
          'It restricts Claude to only use information from that profession',
          'It changes Claude\'s underlying model weights'
        ],
        correct: 1,
        explanationCorrect: 'A role helps Claude prioritise relevant knowledge and communication patterns from its training, not pretend or restrict itself.',
        explanationWrong: 'Setting a role does not make Claude pretend or restrict its knowledge. It adjusts which patterns from training are most relevant — a "Python developer" role brings programming conventions to the front, while a "writing tutor" role prioritises clarity and pedagogy.'
      },
      {
        question: 'Where does a system prompt sit in the conversation?',
        options: [
          'It is added to the end of the conversation',
          'It floats separately from the conversation',
          'It sits at the top and is read first every time Claude responds',
          'It is only read once when the conversation starts'
        ],
        correct: 2,
        explanationCorrect: 'The system prompt is at the top of the context window and gets re-read every time Claude generates a response.',
        explanationWrong: 'The system prompt sits at the very top of the conversation. Because Claude re-reads everything from the top each time, the system prompt is processed first on every single response — not just once.'
      },
      {
        question: 'Why is a role without context often less effective?',
        options: [
          'Claude cannot understand roles without context',
          'The role makes Claude too confident',
          'Without context, Claude has to guess the audience, purpose, and constraints',
          'Context is required for the role to activate'
        ],
        correct: 2,
        explanationCorrect: 'A role without context leaves too many unknowns. Claude can adopt the role but still needs to guess at who it is talking to and what the goal is.',
        explanationWrong: 'Claude can use a role on its own, but without context it has to make assumptions about audience, purpose, and constraints. "You are a senior developer" is vague. "You are a senior developer reviewing code from a junior teammate who is learning async patterns" gives Claude everything it needs.'
      }
    ],
    extras: {
      visuals: ['Example: side-by-side comparison of a prompt with role only vs. role + context'],
      links: [
        { text: 'Anthropic — System prompts', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts' },
        { text: 'Anthropic — Give Claude a role', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct' }
      ],
      whyItMatters: 'Roles and context are the highest-leverage parts of a prompt. Getting them right means every follow-up message benefits from better framing. Getting them wrong means fighting vague responses for the entire conversation.'
    }
  },
  {
    id: 3,
    title: 'Tasks and Constraints',
    subtitle: 'Saying exactly what you want and what you don\'t',
    content: [
      'A task is the specific thing you want Claude to do. "Write a function" is a task. "Summarise this article" is a task. The clearer and more specific the task, the better the output. "Help me with my code" is not a useful task — it gives Claude nothing concrete to aim at.',
      'Constraints are boundaries on how Claude should complete the task. They include things like word limits, formatting requirements, what to avoid, what tone to use, and what audience to write for. Without constraints, Claude will make its own choices about all of these — and its defaults may not match yours.',
      'One effective technique is to separate your task from your constraints explicitly. State the task first, then list constraints as clear rules. Claude handles structured instructions better than instructions buried in paragraphs.',
      'Be specific about what you do not want. "Do not use jargon" is more useful than "keep it simple." "Respond in under 100 words" is more useful than "keep it short." Claude follows concrete instructions more reliably than vague preferences.'
    ],
    skillCallout: 'In the prompt builder, the Task block is where you define what Claude should do. The Constraint block is where you set boundaries. In your SKILL.md, the Steps block serves a similar purpose — it tells Claude exactly what actions to take when the skill is triggered.',
    quiz: [
      {
        question: 'Which of these is the most effective task instruction?',
        options: [
          '"Help me with this"',
          '"Take a look at my code and let me know"',
          '"Review this Python function for bugs, focusing on edge cases with empty inputs"',
          '"Do your best to improve things"'
        ],
        correct: 2,
        explanationCorrect: 'This task is specific about what to do (review for bugs), what to focus on (edge cases), and what the input is (Python function with empty inputs).',
        explanationWrong: 'Vague tasks like "help me" or "take a look" force Claude to guess what you actually want. Specific tasks — what to do, what to focus on, and what the input is — get dramatically better results.'
      },
      {
        question: 'Why should you state what you do NOT want?',
        options: [
          'Claude always does the opposite of what you say',
          'It prevents Claude from filling gaps with its own defaults, which may not match your needs',
          'Negative constraints are processed first by the model',
          'It is only useful for creative writing tasks'
        ],
        correct: 1,
        explanationCorrect: 'Without explicit "don\'t" instructions, Claude falls back on its training defaults for things like tone, length, and style. Those defaults might not be what you want.',
        explanationWrong: 'When you do not specify what to avoid, Claude fills in gaps with its own defaults — which are based on general training data, not your specific needs. Saying "do not use bullet points" or "do not include disclaimers" removes ambiguity.'
      },
      {
        question: 'What is the benefit of separating task and constraints into distinct sections?',
        options: [
          'It makes the prompt longer, which improves output quality',
          'Claude cannot process mixed instructions',
          'Structured separation makes each instruction clearer and easier for Claude to follow',
          'Constraints only work when placed in their own section'
        ],
        correct: 2,
        explanationCorrect: 'Separating task from constraints gives Claude clear, parseable structure. Each instruction stands on its own rather than getting lost in a paragraph.',
        explanationWrong: 'Claude can process mixed instructions, but clear structure helps. When the task and constraints are separated, each instruction is easier to identify and follow. Think of it like a brief versus a rambling email.'
      }
    ],
    extras: {
      visuals: ['Example: a prompt with embedded constraints vs. the same prompt with separated task and constraint blocks'],
      links: [
        { text: 'Anthropic — Be clear and direct', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct' },
        { text: 'Anthropic — Long context tips', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/long-context-tips' }
      ],
      whyItMatters: 'Tasks and constraints are where most prompt quality is won or lost. A well-specified task with clear constraints can turn a mediocre interaction into a reliable tool. Most people under-specify both — learning to be precise here is the single biggest improvement you can make.'
    }
  },
  {
    id: 4,
    title: 'Examples and Formatting',
    subtitle: 'Showing Claude what good looks like',
    content: [
      'Examples are the most powerful prompting technique available. When you show Claude what a good response looks like, it calibrates its output to match. This is called few-shot prompting — giving one or more examples before asking Claude to generate its own.',
      'The quality of your examples matters more than the quantity. One precise, representative example teaches Claude more than five sloppy ones. Make sure your examples match the format, tone, and level of detail you actually want in the output.',
      'Formatting instructions tell Claude how to structure its response. This includes specifying things like JSON, markdown, bullet points, numbered steps, or plain paragraphs. Claude follows explicit format instructions reliably, but if you do not specify a format, it picks one on its own.',
      'A useful pattern is the prefill technique. In the API, you can start Claude\'s response with a few characters or words — like opening a JSON bracket or writing "Here is the analysis:" — to steer the format from the very first token. This eliminates the tendency to add preamble before getting to the actual content.'
    ],
    skillCallout: 'The Example block in your prompt builder is where you paste sample inputs and outputs. The Format block specifies output structure. Together, they do the heavy lifting of showing Claude exactly what you expect. In your SKILL.md, examples in the Steps block serve the same purpose.',
    quiz: [
      {
        question: 'What is few-shot prompting?',
        options: [
          'Asking Claude to respond in as few words as possible',
          'Providing one or more examples before asking Claude to generate its own response',
          'Sending the same prompt multiple times to get better results',
          'Using a smaller version of the model for faster responses'
        ],
        correct: 1,
        explanationCorrect: 'Few-shot prompting means giving Claude examples of the desired input-output pattern, then asking it to follow that pattern for new inputs.',
        explanationWrong: 'Few-shot prompting is not about brevity or repetition. It means providing examples of the desired input-output pattern before asking Claude to generate its own. "Few shots" refers to the number of examples — one example is one-shot, two is two-shot, and so on.'
      },
      {
        question: 'When it comes to examples, what matters more?',
        options: [
          'Quantity — more examples always produce better results',
          'Quality — one precise example teaches more than five vague ones',
          'Neither — Claude ignores examples and follows instructions instead',
          'Variety — examples should show very different styles'
        ],
        correct: 1,
        explanationCorrect: 'One well-crafted example that matches your desired tone, format, and detail level is more effective than multiple inconsistent examples.',
        explanationWrong: 'More examples are not automatically better. Claude calibrates to the quality and consistency of the examples it sees. One precise, representative example that matches the format, tone, and detail level you want will outperform five sloppy ones.'
      },
      {
        question: 'What does the prefill technique do?',
        options: [
          'It loads Claude with extra knowledge before the conversation starts',
          'It caches the prompt for faster processing',
          'It starts Claude\'s response with specific characters or words to control the format from the first token',
          'It fills in missing parts of the user\'s prompt'
        ],
        correct: 2,
        explanationCorrect: 'Prefilling starts Claude\'s response with your chosen text, eliminating preamble and steering the output format from the very beginning.',
        explanationWrong: 'Prefill is a technique where you start Claude\'s response with specific text — like an opening JSON bracket or a heading. This forces Claude to continue from that point rather than adding its own preamble, giving you direct control over the output format.'
      }
    ],
    extras: {
      visuals: ['Example: a prompt without examples vs. the same prompt with one well-crafted example — showing the difference in output quality'],
      links: [
        { text: 'Anthropic — Use examples (few-shot prompting)', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-examples' },
        { text: 'Anthropic — Prefill Claude\'s response', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prefill-claudes-response' }
      ],
      whyItMatters: 'Examples bridge the gap between what you imagine and what Claude produces. They are not extra work — they are the fastest way to get exactly the output you want. If you are unhappy with Claude\'s responses, adding one good example is almost always the best first fix.'
    }
  },
  {
    id: 5,
    title: 'Thinking and Chaining',
    subtitle: 'Giving Claude room to reason and breaking big tasks into steps',
    content: [
      'Claude can reason through complex problems more effectively when you explicitly ask it to think before answering. The phrase "think step by step" is not magic — what matters is giving Claude space to work through reasoning before committing to a final answer.',
      'Anthropic offers an extended thinking feature where Claude can use a dedicated thinking block to reason internally before responding. This is especially useful for math, logic, analysis, and any task where the first intuition might be wrong. The thinking process helps Claude catch its own errors.',
      'Prompt chaining is the technique of breaking a complex task into smaller, sequential steps — where the output of one step becomes the input for the next. Instead of asking Claude to "write a blog post about AI safety," you might first ask it to outline the key points, then draft each section, then review for consistency.',
      'Chaining works because each step gets Claude\'s full attention. A single prompt trying to do everything at once forces Claude to juggle multiple concerns simultaneously. Chaining lets it focus on one thing at a time, and you can review and adjust between steps.'
    ],
    skillCallout: 'The Think block in your prompt builder tells Claude to reason through its response before answering. The Chain block is where you define multi-step workflows. In your SKILL.md, the Steps block naturally creates a chain — each step builds on the previous one.',
    quiz: [
      {
        question: 'Why does asking Claude to "think step by step" improve results?',
        options: [
          'It activates a special reasoning mode in the model',
          'It gives Claude space to work through reasoning before committing to a final answer',
          'It forces Claude to write longer responses',
          'It makes Claude access more of its training data'
        ],
        correct: 1,
        explanationCorrect: 'Step-by-step reasoning gives Claude room to work through a problem before jumping to conclusions. This reduces errors, especially on complex tasks.',
        explanationWrong: 'There is no special "mode" activated by these words. What happens is practical: when Claude is asked to reason step by step, it works through the logic before reaching a conclusion. This process of intermediate reasoning catches errors that a direct answer might miss.'
      },
      {
        question: 'What is prompt chaining?',
        options: [
          'Sending the same prompt to multiple AI models',
          'Writing prompts that link to external databases',
          'Breaking a complex task into sequential steps where each step\'s output feeds the next',
          'Combining multiple users\' prompts into one'
        ],
        correct: 2,
        explanationCorrect: 'Chaining splits a big task into focused steps. Each step gets Claude\'s full attention, and you can review and adjust between steps.',
        explanationWrong: 'Prompt chaining is about sequential decomposition — breaking one big task into smaller, focused steps. The output of step 1 becomes input for step 2, and so on. This lets Claude focus on one thing at a time instead of juggling everything at once.'
      },
      {
        question: 'Why does chaining often produce better results than a single complex prompt?',
        options: [
          'Claude has a limit on how many instructions it can follow',
          'Each step gets Claude\'s full attention instead of forcing it to juggle multiple concerns',
          'Chained prompts use less of the context window',
          'Claude was specifically trained on chained prompts'
        ],
        correct: 1,
        explanationCorrect: 'Chaining lets Claude focus entirely on one sub-task at a time, reducing the cognitive load and improving quality at each step.',
        explanationWrong: 'Claude can follow many instructions in one prompt, but quality improves when it focuses on one thing at a time. A single prompt asking Claude to research, outline, draft, and edit forces it to split attention. Chaining gives full focus to each step.'
      }
    ],
    extras: {
      visuals: ['Diagram: a chaining workflow showing three steps with arrows — outline, draft, review'],
      links: [
        { text: 'Anthropic — Chain complex prompts', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-prompts' },
        { text: 'Anthropic — Extended thinking', url: 'https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking' }
      ],
      whyItMatters: 'Thinking and chaining are how you handle complexity. Simple tasks rarely need either. But the moment a task involves analysis, multi-step reasoning, or producing something longer than a paragraph, these techniques prevent the kind of shallow, rushed output that makes people think AI is not useful.'
    }
  },
  {
    id: 6,
    title: 'Tools, Memory, and Safety',
    subtitle: 'Extending what Claude can do and keeping it on track',
    content: [
      'By default, Claude can only generate text. It cannot search the web, run code, read files, or interact with external services. But Claude can be given tools — defined functions it can call during a conversation. When Claude decides a tool would help answer a question, it generates a structured request, the tool runs externally, and the result comes back into the conversation.',
      'Claude does not have memory between conversations on its own. But you can build memory into your workflow by saving important information and loading it into the system prompt of future conversations. This is exactly what a SKILL.md file does — it persists your instructions across sessions. Some platforms also offer built-in memory features that automate this pattern.',
      'Safety is about setting boundaries on what Claude should and should not do in a given context. This includes things like refusing to generate harmful content, staying on topic, acknowledging uncertainty instead of guessing, and following specific policies. Claude has built-in safety training, but you can add your own constraints to make it stricter or more specific to your use case.',
      'The combination of tools, memory, and safety constraints is what turns Claude from a text generator into a reliable assistant. Tools give it capabilities. Memory gives it continuity. Safety constraints give it judgement boundaries. Your SKILL.md file can specify all three.'
    ],
    skillCallout: 'The Tool block in your prompt builder defines what external functions Claude can call. The Memory block specifies what information should persist. The Safety block sets boundaries. In your SKILL.md, the Notes block is where you capture safety rules and edge cases.',
    quiz: [
      {
        question: 'How does Claude use tools?',
        options: [
          'Tools are built into Claude and always available',
          'Claude generates a structured request for a tool, it runs externally, and the result comes back into the conversation',
          'Claude directly executes code on the server',
          'Tools replace Claude\'s text generation with specialised outputs'
        ],
        correct: 1,
        explanationCorrect: 'Claude does not run tools itself. It generates a structured call, an external system executes it, and the result is fed back into the conversation for Claude to use.',
        explanationWrong: 'Claude does not have built-in tools or execute anything directly. When given tool definitions, Claude can decide when to call one by generating a structured request. The actual execution happens externally, and the result is returned to Claude as part of the conversation.'
      },
      {
        question: 'How can you give Claude "memory" across conversations?',
        options: [
          'Claude automatically remembers important things',
          'You need to use a special memory API endpoint',
          'Save important information and load it into the system prompt of future conversations',
          'Memory only works with Claude\'s paid plans'
        ],
        correct: 2,
        explanationCorrect: 'Memory is built by saving key information and including it in the system prompt of new conversations. A SKILL.md file is exactly this pattern — persistent instructions loaded at the start.',
        explanationWrong: 'Claude does not remember anything between conversations automatically. You create memory by saving important information and loading it into the system prompt of future conversations. This is the pattern behind SKILL.md files — they persist your instructions and context across sessions.'
      },
      {
        question: 'Why should you add your own safety constraints beyond Claude\'s built-in training?',
        options: [
          'Claude\'s built-in safety is unreliable',
          'Custom constraints are required for the API to work',
          'Your use case may have specific boundaries that general training does not cover',
          'Safety constraints make Claude respond faster'
        ],
        correct: 2,
        explanationCorrect: 'Claude\'s built-in safety is general-purpose. Your specific application may need additional boundaries — like staying on a particular topic, following company policies, or handling sensitive data in specific ways.',
        explanationWrong: 'Claude\'s built-in safety training is solid for general use. But your specific application likely has boundaries that general training cannot anticipate — industry regulations, company policies, topic restrictions, or data handling rules. Adding your own safety constraints fills those gaps.'
      }
    ],
    extras: {
      visuals: ['Diagram: tool use flow — Claude generates call, external system executes, result returns to conversation'],
      links: [
        { text: 'Anthropic — Tool use (function calling)', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview' },
        { text: 'Anthropic — Claude\'s character and safety', url: 'https://docs.anthropic.com/en/docs/about-claude/claude-is' }
      ],
      whyItMatters: 'Tools, memory, and safety are what separate a toy demo from a real application. Understanding these three concepts lets you build Claude-powered workflows that actually work in practice — with real capabilities, continuity between sessions, and appropriate guardrails.'
    }
  }
];
