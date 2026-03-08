// Module content data — 10 modules
// Beginner (1-4): Foundations — Intermediate (5-7): Power Techniques — Advanced (8-10): Claude Code
// Content cross-checked against Anthropic's public documentation (docs.anthropic.com, March 2026)

const MODULES = [
  {
    id: 1,
    title: 'What Claude Actually Is',
    subtitle: 'Understanding the model before you prompt it',
    keyTerms: ['context window', '200,000 tokens', 'system prompt', 'Claude 4.6'],
    content: [
      'Claude is a large language model built by Anthropic. The current generation is the Claude 4.6 family — Opus (most capable), Sonnet (best balance of speed and intelligence), and Haiku (fastest and lightest). Each model predicts the most helpful next response based on the conversation so far. Claude does not search the internet, run code, or remember past conversations unless specifically given tools to do so.',
      'Every time you start a new conversation, Claude begins with zero memory of you. It only knows what is inside the current conversation window — your messages, its replies, and any system prompt set before the conversation started. This is called the context window. Current models support 200,000 tokens by default, with a 1 million token window available in beta for large projects.',
      'Claude processes the entire conversation from the top every time it replies. It does not read your latest message in isolation — it re-reads everything. This means the order and structure of your earlier messages shape every response that follows.',
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
        question: 'What is the standard context window size for current Claude 4.6 models?',
        options: [
          '8,000 tokens',
          '32,000 tokens',
          '200,000 tokens',
          '1 million tokens is the only option'
        ],
        correct: 2,
        explanationCorrect: 'Claude 4.6 models support 200,000 tokens by default. A 1 million token window is available in beta for larger projects, but 200K is the standard.',
        explanationWrong: 'Current Claude 4.6 models (Opus and Sonnet) support 200,000 tokens by default. A 1 million token extended context is available in beta, but the standard window is 200K — enough for roughly 150,000 words or a medium-sized codebase.'
      }
    ],
    extras: {
      visuals: [
        'Diagram: Context window showing system prompt at the top, followed by user messages and assistant responses stacked below, with a token counter on the side'
      ],
      links: [
        { text: 'Anthropic — Claude model overview', url: 'https://docs.anthropic.com/en/docs/about-claude/models' },
        { text: 'Anthropic — Context window and model comparison', url: 'https://docs.anthropic.com/en/docs/about-claude/models#model-comparison' }
      ],
      whyItMatters: 'Understanding how Claude actually works — stateless, context-driven, processing everything from the top — prevents the single most common mistake: assuming it "knows" things it does not. Every prompting technique you will learn builds on this foundation.'
    }
  },
  {
    id: 2,
    title: 'Roles and Context',
    subtitle: 'Telling Claude who to be and what to know',
    keyTerms: ['role', 'context', 'system prompt'],
    content: [
      'A role tells Claude what perspective to adopt. "You are a senior Python developer" is different from "You are a writing tutor." The role shapes Claude\'s vocabulary, assumptions, and level of detail. It is not pretending — it is adjusting which patterns in its training are most relevant.',
      'Context gives Claude the background information it needs to respond well. This includes things like who the audience is, what has already been tried, what the constraints are, and any domain-specific details Claude would not know on its own.',
      'The system prompt is where roles and context work best. It sits at the top of the conversation and gets read first every time Claude responds. Think of it as the brief you hand someone before a meeting — it frames everything that follows.',
      'A common mistake is giving Claude a role without context, or context without a role. "You are a doctor" without specifying the audience or purpose leads to generic responses. "Here is a patient history" without a role leaves Claude guessing what kind of analysis you want. The combination is what makes responses specific and useful.'
    ],
    skillCallout: 'Your SKILL.md file starts with a role and context. The Name and Description blocks you see in the builder define the role. The Trigger block becomes the context — it tells Claude when and how this skill should activate.',
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
      visuals: ['Side-by-side comparison: a prompt with role only ("You are a doctor") produces a generic response, while role + context ("You are a doctor explaining test results to an anxious patient with no medical background") produces a specific, empathetic one'],
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
    keyTerms: ['task', 'constraints', 'few-shot'],
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
      visuals: ['Before/after: a single-paragraph prompt with embedded constraints versus the same prompt reorganised into clear Task and Constraint sections — both produce responses, but the structured version produces a noticeably more focused one'],
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
    keyTerms: ['few-shot prompting', 'examples', 'structured outputs', 'prefill'],
    content: [
      'Examples are the most powerful prompting technique available. When you show Claude what a good response looks like, it calibrates its output to match. This is called few-shot prompting — giving one or more examples before asking Claude to generate its own.',
      'The quality of your examples matters more than the quantity. One precise, representative example teaches Claude more than five sloppy ones. Make sure your examples match the format, tone, and level of detail you actually want in the output.',
      'Formatting instructions tell Claude how to structure its response. This includes specifying things like JSON, markdown, bullet points, numbered steps, or plain paragraphs. Claude follows explicit format instructions reliably, but if you do not specify a format, it picks one on its own. For the API, structured outputs let you define a JSON schema that Claude must follow exactly.',
      'The prefill technique lets you start Claude\'s response with specific text — like an opening JSON bracket or a heading — to steer the format from the first token. Note: prefilling is available on Sonnet models and via the API, but is not supported on Opus 4.6, where structured outputs are the recommended alternative for controlling response format.'
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
        question: 'What is the recommended way to control output format on Claude Opus 4.6?',
        options: [
          'The prefill technique — start the response with specific text',
          'Structured outputs — define a JSON schema the response must follow',
          'Sending the prompt twice with different formatting',
          'There is no way to control output format on Opus'
        ],
        correct: 1,
        explanationCorrect: 'Opus 4.6 does not support prefilling. Structured outputs — where you define a schema — are the recommended way to control response format on current Opus models.',
        explanationWrong: 'Prefilling (starting Claude\'s response with specific text) is not supported on Opus 4.6. The recommended alternative is structured outputs, which let you define a JSON schema that Claude must follow. Prefilling still works on Sonnet models.'
      }
    ],
    extras: {
      visuals: ['Side-by-side: the same request without an example produces a generic response, while adding one well-crafted example produces output that closely matches the desired style and structure'],
      links: [
        { text: 'Anthropic — Use examples (few-shot prompting)', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-examples' },
        { text: 'Anthropic — Structured outputs', url: 'https://docs.anthropic.com/en/docs/build-with-claude/structured-output' }
      ],
      whyItMatters: 'Examples bridge the gap between what you imagine and what Claude produces. They are not extra work — they are the fastest way to get exactly the output you want. If you are unhappy with Claude\'s responses, adding one good example is almost always the best first fix.'
    }
  },
  {
    id: 5,
    title: 'Thinking and Reasoning',
    subtitle: 'How Claude works through complex problems',
    keyTerms: ['adaptive thinking', 'effort parameter', 'extended thinking'],
    content: [
      'Claude can reason through complex problems, but how it does so has evolved significantly. On current Claude 4.6 models, adaptive thinking is the default — Claude automatically decides when and how deeply to reason based on the problem\'s complexity. You do not need to tell it to "think step by step" anymore, though being explicit still helps on tricky problems.',
      'Adaptive thinking has an effort parameter with levels: low, medium, high, and max. Low effort gives quick answers for simple questions. High effort (the default) makes Claude think carefully on almost everything. Max effort is available on Opus 4.6 for the hardest problems. You can set this in the API to balance quality against speed and cost.',
      'Extended thinking is the deeper version — Claude uses a dedicated, visible thinking block to reason internally before responding. This is especially valuable for math, logic, code debugging, and any task where the first intuition might be wrong. The thinking process is transparent: you can see Claude\'s reasoning steps and understand how it reached its conclusion.',
      'Practical tip: for simple factual questions or casual conversation, Claude does not need extra thinking time. For multi-step analysis, complex code, or anything where you would want a human to "think before speaking," adaptive thinking at high or max effort makes a real difference. The model is good at calibrating this automatically, but you can guide it when stakes are high.'
    ],
    skillCallout: 'The Think block in your prompt builder tells Claude to reason through its response carefully. In practice, adaptive thinking handles most of this automatically on Claude 4.6, but adding explicit thinking instructions is still valuable when you want to see the reasoning or ensure thoroughness on critical tasks.',
    quiz: [
      {
        question: 'What is adaptive thinking in Claude 4.6?',
        options: [
          'A feature that lets Claude adapt to different languages',
          'Claude automatically deciding when and how deeply to reason based on problem complexity',
          'A way to make Claude think faster by skipping steps',
          'A premium feature that requires a separate subscription'
        ],
        correct: 1,
        explanationCorrect: 'Adaptive thinking means Claude dynamically adjusts its reasoning depth based on how complex the problem is — simple questions get quick answers, complex problems get thorough analysis.',
        explanationWrong: 'Adaptive thinking is not about language or speed shortcuts. It is Claude automatically calibrating how much reasoning to do based on the complexity of your request. Simple questions get fast, direct answers. Complex problems get step-by-step analysis. You can influence this with the effort parameter.'
      },
      {
        question: 'When is extended thinking most valuable?',
        options: [
          'For all conversations, regardless of complexity',
          'Only for creative writing tasks',
          'For math, logic, code debugging, and tasks where the first intuition might be wrong',
          'Only when using the API, not in the browser'
        ],
        correct: 2,
        explanationCorrect: 'Extended thinking shines on problems that require careful analysis — where jumping to the first answer would likely miss something important.',
        explanationWrong: 'Extended thinking is most valuable for tasks that require multi-step reasoning: math problems, logic puzzles, complex code analysis, and anything where a hasty answer would likely be wrong. For simple questions or casual chat, it adds overhead without improving quality.'
      },
      {
        question: 'What does the effort parameter control?',
        options: [
          'How many words Claude uses in its response',
          'The balance between reasoning depth and speed — from quick answers to maximum analysis',
          'How much the API call costs, independent of quality',
          'Whether Claude uses thinking at all'
        ],
        correct: 1,
        explanationCorrect: 'The effort parameter lets you control the tradeoff: low effort for fast, simple answers; high or max effort for thorough reasoning on complex problems.',
        explanationWrong: 'The effort parameter controls reasoning depth. At "low," Claude gives quick, direct answers. At "high" (the default), it thinks carefully about most things. At "max" (Opus only), it applies its deepest analysis. This directly affects quality and cost — more thinking means better answers but more tokens used.'
      }
    ],
    extras: {
      visuals: [
        'Diagram: effort scale from Low → Medium → High → Max, with example use cases at each level. Low: "What\'s the capital of France?" Medium: "Summarise this article." High: "Debug this async function." Max: "Architect a distributed system."'
      ],
      links: [
        { text: 'Anthropic — Extended thinking', url: 'https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking' },
        { text: 'Anthropic — Extended thinking tips', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/extended-thinking-tips' }
      ],
      whyItMatters: 'Thinking and reasoning are how you handle complexity. Simple tasks rarely need extra effort. But the moment a task involves analysis, multi-step reasoning, or producing something that needs to be correct rather than just plausible, knowing how to use thinking effectively is the difference between a helpful assistant and a unreliable one.'
    }
  },
  {
    id: 6,
    title: 'Tools and Real-World Capabilities',
    subtitle: 'What Claude can actually do beyond generating text',
    keyTerms: ['tool use', 'function calling', 'vision', 'web search'],
    content: [
      'By default, Claude generates text. But Claude can be given tools — defined functions it can call during a conversation. When Claude decides a tool would help, it generates a structured request, the tool runs externally, and the result comes back into the conversation. This is called function calling or tool use.',
      'In Claude.ai, several tools are built in: web search lets Claude look up current information, code execution lets it write and run code to verify answers or process data, and file handling lets it read documents you upload (PDFs, images, spreadsheets, code files). Vision capabilities let Claude analyse images directly — screenshots, diagrams, photos, charts.',
      'For developers, tool use through the API is where things get powerful. You define tools as JSON schemas, Claude decides when to call them, and your application executes the function and returns the result. This pattern lets Claude interact with databases, APIs, file systems, and any external service you connect.',
      'The key mental model: Claude does not execute anything directly. It generates a structured request ("I want to call this function with these arguments"), your system runs it, and the result comes back as context. Claude then uses that result to continue its response. This separation is important for understanding both the power and the limits of tool use.'
    ],
    skillCallout: 'The Tool block in your prompt builder defines what external functions Claude can access. When building real applications, tool definitions become a core part of your system prompt. In your SKILL.md, you can specify which tools a skill expects to have available.',
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
        question: 'Which of these can Claude do in the claude.ai browser interface?',
        options: [
          'Only generate text — no other capabilities',
          'Search the web, run code, read uploaded files, and analyse images',
          'Connect to any database or API automatically',
          'Execute system commands on your computer'
        ],
        correct: 1,
        explanationCorrect: 'Claude.ai includes built-in tools for web search, code execution, file handling, and vision. These extend Claude beyond pure text generation without needing any setup.',
        explanationWrong: 'In Claude.ai, several tools are available out of the box: web search for current information, code execution for running and verifying code, file uploads for reading documents, and vision for analysing images. These do not require any developer setup — they work directly in the browser.'
      },
      {
        question: 'Why does Claude not execute tools directly?',
        options: [
          'It would be too slow',
          'The separation lets your application control what actually runs, which is important for security and reliability',
          'Claude does not understand how tools work',
          'Direct execution is only available on Opus models'
        ],
        correct: 1,
        explanationCorrect: 'The separation between Claude requesting a tool and your system executing it gives you full control over what happens. This is a deliberate design choice for security and reliability.',
        explanationWrong: 'Claude generates tool requests but does not execute them directly. This separation is intentional: your application controls what actually runs, can validate parameters, enforce permissions, and handle errors. It is a security and reliability pattern, not a limitation.'
      }
    ],
    extras: {
      visuals: [
        'Flow diagram: User asks question → Claude decides a tool would help → Claude generates structured tool call → External system executes → Result returns to Claude → Claude uses result in its response'
      ],
      links: [
        { text: 'Anthropic — Tool use overview', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview' },
        { text: 'Anthropic — Vision and image analysis', url: 'https://docs.anthropic.com/en/docs/build-with-claude/vision' }
      ],
      whyItMatters: 'Tools are what turn Claude from a text generator into something genuinely useful. Understanding the tool-use pattern — Claude requests, your system executes, results return — is essential whether you are using built-in tools in claude.ai or building custom integrations through the API.'
    }
  },
  {
    id: 7,
    title: 'Working with Claude.ai',
    subtitle: 'Getting the most from the browser interface',
    keyTerms: ['Projects', 'Artifacts', 'Opus', 'Sonnet'],
    content: [
      'Claude.ai is where most people start. The browser interface gives you access to all Claude models, built-in tools, and features like Projects and Artifacts — without writing any code. Understanding what is available helps you work faster and get better results.',
      'Projects let you organise conversations around a topic or task. You can set a project-level system prompt (called "project instructions") that applies to every conversation in that project, and upload reference documents that Claude can access across all conversations. This is the browser equivalent of a system prompt plus persistent context.',
      'Artifacts are interactive outputs Claude generates during a conversation — code snippets, documents, diagrams, small applications, and more. They appear in a separate panel and can be iterated on, copied, or downloaded. When Claude creates an interactive artifact like a small web app, that artifact can even make its own calls to Claude\'s API, giving it a kind of embedded intelligence.',
      'Model selection matters. Free users get access to Sonnet with rate limits. Pro subscribers ($20/month) get higher limits and access to Opus for complex tasks. Choose Sonnet for everyday conversations and quick tasks. Switch to Opus when you need deep reasoning, complex code, or thorough analysis. Do not use Opus for simple questions — it is slower and you will hit rate limits faster.'
    ],
    skillCallout: 'The Chain block in your prompt builder maps to how you work in Claude.ai. Multi-step workflows — outline first, then draft, then review — are natural in a conversation. Each message in the chain builds on the previous one. Projects make this reusable across sessions.',
    quiz: [
      {
        question: 'What do Projects in Claude.ai allow you to do?',
        options: [
          'Share conversations publicly',
          'Set a persistent system prompt and upload reference documents that apply across conversations',
          'Run code on Anthropic\'s servers',
          'Access Claude\'s training data'
        ],
        correct: 1,
        explanationCorrect: 'Projects give you a persistent system prompt (project instructions) and reference files that Claude can access in every conversation within that project.',
        explanationWrong: 'Projects organise your work around a topic. You set project-level instructions (a persistent system prompt) and upload reference documents. Every conversation in that project benefits from the same context, so you do not have to repeat yourself each time.'
      },
      {
        question: 'When should you choose Opus over Sonnet in Claude.ai?',
        options: [
          'Always — Opus is better at everything',
          'For deep reasoning, complex code, or thorough analysis where quality matters more than speed',
          'Only for creative writing tasks',
          'When you want faster responses'
        ],
        correct: 1,
        explanationCorrect: 'Opus excels at complex reasoning and analysis. Sonnet is better for everyday tasks where speed matters. Matching the model to the task gets better results and conserves your usage limits.',
        explanationWrong: 'Opus is the most capable model but also slower and uses more of your rate limit. It shines on complex reasoning, hard code problems, and deep analysis. For everyday questions, quick edits, and casual conversation, Sonnet is faster and more than capable. Use each where it fits.'
      },
      {
        question: 'What are Artifacts in Claude.ai?',
        options: [
          'Saved conversation bookmarks',
          'Interactive outputs like code, documents, or small apps that appear in a separate panel and can be iterated on',
          'Plugins you install to extend Claude',
          'Conversation summaries generated automatically'
        ],
        correct: 1,
        explanationCorrect: 'Artifacts are standalone outputs — code, documents, diagrams, mini-apps — that Claude creates in a side panel. You can refine them through conversation and download or copy the result.',
        explanationWrong: 'Artifacts are interactive outputs Claude generates alongside the conversation. They live in their own panel and can be code snippets, formatted documents, diagrams, or even small web applications. You can iterate on them by asking Claude to modify them, then copy or download the finished result.'
      }
    ],
    extras: {
      visuals: [
        'Screenshot layout: Claude.ai interface showing a Project with custom instructions on the left, a conversation in the center, and an Artifact (code output) in the right panel'
      ],
      links: [
        { text: 'Claude.ai — Getting started', url: 'https://support.anthropic.com/en/collections/4121204-getting-started' },
        { text: 'Anthropic — Claude plans and pricing', url: 'https://www.anthropic.com/pricing' }
      ],
      whyItMatters: 'Most people use 10% of what Claude.ai offers. Projects, Artifacts, model selection, and built-in tools are already there — you just need to know they exist. This module turns you from a "type and hope" user into someone who uses the interface intentionally.'
    }
  },
  {
    id: 8,
    title: 'Getting Started with Claude Code',
    subtitle: 'Moving from browser to terminal',
    keyTerms: ['Claude Code', 'CLAUDE.md', 'API key'],
    content: [
      'Claude Code is Anthropic\'s command-line tool that brings Claude directly into your terminal. Instead of copying code between a browser and your editor, Claude Code works inside your project — it can read your files, edit code, run commands, and manage git workflows. It is the same Claude, but it lives where your code lives.',
      'Installation is one command: <code>curl -fsSL https://claude.ai/install.sh | bash</code> on macOS or Linux. On first run, type <code>claude</code> in any project folder and it will prompt you to authenticate. You can use Claude Code with a Pro or Max subscription (no API key needed) or with an API key from the Anthropic console. New API accounts get $5 in free credits to start.',
      'The CLAUDE.md file is how you give Claude Code persistent context about your project. Place it in your project root and it gets read at the start of every session. Use it for coding standards, architecture decisions, build commands, and anything you would tell a new team member. It is version-controlled with your code, so everyone on the team benefits.',
      'Claude Code also builds memory automatically across sessions. It learns your build commands, project patterns, and debugging approaches over time. This auto-memory supplements your CLAUDE.md — you write the important stuff explicitly, and Claude Code picks up the patterns through use.'
    ],
    skillCallout: 'The Memory block in your prompt builder connects directly to how CLAUDE.md works. Both are ways of giving Claude persistent instructions it reads at the start of every interaction. The difference: a prompt\'s memory block is for a single conversation, while CLAUDE.md persists across every session in a project.',
    quiz: [
      {
        question: 'How do you authenticate Claude Code for the first time?',
        options: [
          'You need to generate a special token from the Anthropic website',
          'Run "claude" in a project folder — it will prompt you to log in with your subscription or API key',
          'You must email Anthropic to request access',
          'Authentication is automatic if you have a Claude.ai account'
        ],
        correct: 1,
        explanationCorrect: 'Just run "claude" in your terminal. It walks you through authentication, supporting both subscription-based login and API keys.',
        explanationWrong: 'Getting started is straightforward: install Claude Code, navigate to your project folder, and run "claude." It prompts you to authenticate — either with your existing Pro/Max subscription or with an API key. No special tokens or manual setup required.'
      },
      {
        question: 'What is the purpose of a CLAUDE.md file?',
        options: [
          'It stores Claude\'s conversation history',
          'It gives Claude Code persistent project context — coding standards, architecture decisions, and build commands — read at every session start',
          'It is a log file that tracks Claude\'s actions',
          'It is required for Claude Code to function'
        ],
        correct: 1,
        explanationCorrect: 'CLAUDE.md is your project brief for Claude Code. It is read at the start of every session and tells Claude about your project\'s conventions, architecture, and workflows.',
        explanationWrong: 'CLAUDE.md is a markdown file in your project root that Claude Code reads at the start of every session. It contains project-specific context: how to build, how to test, coding conventions, architecture decisions. Think of it as a README specifically for Claude. It is not required, but it dramatically improves Claude Code\'s effectiveness.'
      },
      {
        question: 'What are the two main ways to access Claude Code?',
        options: [
          'Browser only or mobile app only',
          'With a Pro/Max subscription (no API key needed) or with an Anthropic API key',
          'Free tier or enterprise tier',
          'Through VS Code only or through the terminal only'
        ],
        correct: 1,
        explanationCorrect: 'Claude Code works with either a Claude Pro/Max subscription (browser-based auth) or an Anthropic API key. Both give you full access to the tool.',
        explanationWrong: 'Claude Code supports two authentication methods: subscription-based (if you have a Claude Pro or Max plan, you just log in) or API-based (using a key from the Anthropic console). New API accounts get $5 in free credits. Both methods give you the same capabilities.'
      }
    ],
    extras: {
      visuals: [
        'Terminal screenshot: running "claude" in a project folder for the first time, showing the authentication prompt, then a successful first interaction where Claude reads a file and suggests an improvement'
      ],
      links: [
        { text: 'Claude Code — Getting started', url: 'https://docs.anthropic.com/en/docs/claude-code/overview' },
        { text: 'Anthropic — CLAUDE.md configuration', url: 'https://docs.anthropic.com/en/docs/claude-code/overview#memory' }
      ],
      whyItMatters: 'Claude Code is where AI assistance becomes practical for real work. Instead of context-switching between a browser chat and your editor, Claude works directly in your project. The CLAUDE.md file means it gets smarter about your codebase over time. This module gets you from zero to your first productive session.'
    }
  },
  {
    id: 9,
    title: 'Claude Code Workflows',
    subtitle: 'Skills, MCP, and everyday patterns',
    keyTerms: ['Skills', 'MCP', 'Model Context Protocol'],
    content: [
      'Claude Code is most powerful when you use it as part of a workflow, not just for one-off questions. It can edit multiple files at once, run your tests, manage git commits, and chain actions together. A common pattern: ask Claude Code to implement a feature, then tell it to run the tests, and if they fail, fix the issues — all in one session.',
      'Skills are custom, reusable commands you define for Claude Code. Instead of typing the same complex instruction every time, you create a skill file — like "/review-pr" or "/deploy-staging" — that packages a workflow into a single command. Skills live in your project and can be shared with your team. They are the Claude Code equivalent of the SKILL.md file you are building here.',
      'MCP (Model Context Protocol) lets Claude Code connect to external services: GitHub, Slack, databases, Google Drive, Jira, and over 300 other integrations. Instead of Claude only seeing your local files, MCP gives it access to your entire development ecosystem. You configure MCP servers per project or globally, and Claude Code uses lazy loading to keep context usage minimal.',
      'Claude Code also works inside VS Code, JetBrains IDEs, and as a desktop app — not just the terminal. The IDE integrations add features like inline diff review, file @-mentions, and visual plan review. Pick whichever environment fits your workflow. The commands and capabilities are the same.'
    ],
    skillCallout: 'The Safety block in your prompt builder maps to how you set boundaries in Claude Code workflows. When Claude Code has access to your files, git, and terminal, clear safety constraints — what to commit, what to test before committing, what not to touch — become essential. Your SKILL.md Notes block is where you capture these rules.',
    quiz: [
      {
        question: 'What are Skills in Claude Code?',
        options: [
          'Built-in capabilities Claude Code always has',
          'Custom, reusable commands you define to package workflows into a single command',
          'A premium feature that requires a Max subscription',
          'AI-generated suggestions for improving your code'
        ],
        correct: 1,
        explanationCorrect: 'Skills are custom commands you create — like "/review-pr" or "/deploy-staging" — that package complex, repeatable workflows into a single trigger.',
        explanationWrong: 'Skills are not built-in or auto-generated. You create them as files that define a reusable workflow. Instead of typing the same complex instructions repeatedly, you package them into a skill with a simple command name. Your team can share skills through version control.'
      },
      {
        question: 'What does MCP (Model Context Protocol) allow Claude Code to do?',
        options: [
          'Run faster by using multiple processors',
          'Connect to external services like GitHub, Slack, databases, and 300+ other integrations',
          'Translate between programming languages',
          'Automatically generate test files'
        ],
        correct: 1,
        explanationCorrect: 'MCP extends Claude Code beyond your local files, giving it access to your broader development ecosystem through standardised integrations.',
        explanationWrong: 'MCP is a protocol that lets Claude Code connect to external services — GitHub for PRs and issues, Slack for messaging, databases for queries, and hundreds of other integrations. It uses lazy loading and a tool search system to keep context usage minimal, only loading the tools Claude actually needs.'
      },
      {
        question: 'Where can you use Claude Code?',
        options: [
          'Only in the terminal',
          'Terminal, VS Code, JetBrains IDEs, desktop app, and web — same capabilities everywhere',
          'Only in VS Code with the Claude extension',
          'Only on macOS and Linux'
        ],
        correct: 1,
        explanationCorrect: 'Claude Code works across multiple environments — terminal, VS Code, JetBrains, desktop app, and web — with the same core capabilities in each.',
        explanationWrong: 'Claude Code is not limited to the terminal. It runs in VS Code (with inline diffs and @-mentions), JetBrains IDEs (IntelliJ, PyCharm, WebStorm), as a standalone desktop app (with visual diff review and session management), and even on the web. The core commands and capabilities are consistent across all of these.'
      }
    ],
    extras: {
      visuals: [
        'Diagram: Claude Code ecosystem — terminal at the center, connected to: local files, git, MCP servers (GitHub, Slack, databases), IDE integrations (VS Code, JetBrains), and custom skills'
      ],
      links: [
        { text: 'Claude Code — MCP servers', url: 'https://docs.anthropic.com/en/docs/claude-code/mcp' },
        { text: 'Claude Code — IDE integrations', url: 'https://docs.anthropic.com/en/docs/claude-code/ide-integrations' }
      ],
      whyItMatters: 'One-off questions are useful, but workflows are transformative. Skills, MCP, and multi-step sessions turn Claude Code from a smart assistant into an integrated part of how you develop software. The patterns in this module are what separate people who "use AI sometimes" from people who build with it daily.'
    }
  },
  {
    id: 10,
    title: 'Building Your Own System',
    subtitle: 'Putting everything together into a real workflow',
    keyTerms: ['Hooks', 'CLAUDE.md', 'safety'],
    content: [
      'This module ties everything together. You now understand how Claude works, how to prompt it effectively, how to use Claude.ai, and how to work with Claude Code. The final step is building a system — a combination of CLAUDE.md instructions, skills, safety rules, and workflow patterns that make Claude reliably useful for your specific work.',
      'Hooks are automated actions that trigger at specific points in Claude Code\'s lifecycle — when a session starts, when a file is edited, before a commit, after a commit, and more. They let you enforce rules automatically. For example: a pre-commit hook that runs your linter, a session-start hook that loads project context, or a file-edit hook that checks for security patterns. Hooks turn guidelines into guarantees.',
      'Safety in practice means setting clear boundaries on what Claude should and should not do in your workflow. This includes: what files it can modify, what commits it can make without asking, what tests must pass before it considers a task done, and how it handles uncertainty. Claude has built-in safety training, but your project has specific rules that general training does not cover. Write them down — in your CLAUDE.md, in your skills, and in your hooks.',
      'The best systems are specific and evolving. Start with a simple CLAUDE.md and one or two skills. Add hooks when you find yourself repeating the same checks. Connect MCP servers as you need external access. Your system grows with your experience. The goal is not perfection on day one — it is a workflow that gets a little better every week.'
    ],
    skillCallout: 'This is where your SKILL.md file comes full circle. The skill you built throughout these modules is one piece of a larger system — it works alongside your CLAUDE.md, your hooks, and your MCP connections. Every block you filled in maps to a real part of how Claude Code operates in practice.',
    quiz: [
      {
        question: 'What are hooks in Claude Code?',
        options: [
          'Ways to connect Claude to external APIs',
          'Automated actions that trigger at specific lifecycle points — session start, file edit, pre-commit, and more',
          'Keyboard shortcuts for common commands',
          'Visual indicators showing Claude\'s progress on a task'
        ],
        correct: 1,
        explanationCorrect: 'Hooks are automated triggers at lifecycle points. They let you enforce rules — like running linters before commits or loading context at session start — without relying on Claude to remember.',
        explanationWrong: 'Hooks are not shortcuts or API connectors. They are automated actions tied to specific events in Claude Code\'s workflow: when a session starts, when a file is edited, before a commit, after a commit, and other lifecycle points. They enforce rules automatically, turning "Claude should do X" into "Claude must do X."'
      },
      {
        question: 'Why should you add your own safety constraints beyond Claude\'s built-in training?',
        options: [
          'Claude\'s built-in safety is unreliable',
          'Custom constraints are required for the API to work',
          'Your project has specific rules that general training does not cover',
          'Safety constraints make Claude respond faster'
        ],
        correct: 2,
        explanationCorrect: 'Claude\'s built-in safety is solid for general use. Your specific project likely has boundaries — which files to modify, what tests to run, how to handle sensitive data — that need to be stated explicitly.',
        explanationWrong: 'Claude\'s built-in safety is general-purpose and reliable. But your project has specific rules: which files are safe to edit, what must pass before committing, how to handle credentials, what requires human review. These are not things general training can anticipate — you need to write them down in your CLAUDE.md, skills, and hooks.'
      },
      {
        question: 'What is the recommended approach to building a Claude-assisted workflow?',
        options: [
          'Set up everything perfectly before starting any real work',
          'Start with a simple CLAUDE.md and a few skills, then add hooks and MCP connections as needs emerge',
          'Only use Claude for one-off questions until you are an expert',
          'Copy someone else\'s configuration and use it as-is'
        ],
        correct: 1,
        explanationCorrect: 'Start simple and iterate. A basic CLAUDE.md and one or two skills give you immediate value. Add complexity (hooks, MCP, more skills) as you discover what your workflow actually needs.',
        explanationWrong: 'The best systems grow organically. Start with a CLAUDE.md that covers the basics (build commands, coding standards, architecture notes) and one or two skills for your most common tasks. Add hooks when you catch yourself repeating checks. Connect MCP servers when you need external access. Perfection on day one is not the goal — steady improvement is.'
      }
    ],
    extras: {
      visuals: [
        'System diagram: Your workflow — CLAUDE.md (project context) at the center, connected to Skills (reusable commands), Hooks (automated rules), MCP (external services), and your codebase. Arrows show how information flows between each component.'
      ],
      links: [
        { text: 'Claude Code — Hooks reference', url: 'https://docs.anthropic.com/en/docs/claude-code/hooks' },
        { text: 'Claude Code — Settings and configuration', url: 'https://docs.anthropic.com/en/docs/claude-code/settings' }
      ],
      whyItMatters: 'Individual techniques are useful. Systems are transformative. This module is about going from "I know how to prompt Claude" to "I have a workflow that makes Claude reliably useful for my actual work, every day." The SKILL.md you built here is your first piece. Now you know how to build the rest.'
    }
  }
];
