// Terminal Guide — Step-by-step walkthrough that teaches users to build
// a fun emoji memory puzzle game using Claude Code, with live preview.

const TerminalGuide = {
  currentStep: 0,
  completedSteps: [],
  previewVisible: false,

  // The puzzle game HTML that gets "built" step by step
  PUZZLE_STAGES: [
    // Stage 0: empty
    '',
    // Stage 1: project folder created
    '<div class="pz-status">Project folder created: ~/emoji-puzzle/</div>',
    // Stage 2: basic HTML scaffold
    `<div class="pz-scaffold">
      <div class="pz-title-bar">Emoji Memory Puzzle</div>
      <div class="pz-empty-grid">Empty page — ready for code</div>
    </div>`,
    // Stage 3: grid appears
    `<div class="pz-scaffold">
      <div class="pz-title-bar">Emoji Memory Puzzle</div>
      <div class="pz-grid pz-grid--hidden">
        <div class="pz-card pz-card--back">?</div>
        <div class="pz-card pz-card--back">?</div>
        <div class="pz-card pz-card--back">?</div>
        <div class="pz-card pz-card--back">?</div>
        <div class="pz-card pz-card--back">?</div>
        <div class="pz-card pz-card--back">?</div>
        <div class="pz-card pz-card--back">?</div>
        <div class="pz-card pz-card--back">?</div>
      </div>
    </div>`,
    // Stage 4: game logic — cards become clickable (simulated)
    `<div class="pz-scaffold">
      <div class="pz-title-bar">Emoji Memory Puzzle</div>
      <div class="pz-grid pz-grid--interactive" id="pz-live-grid">
        <div class="pz-card pz-card--back" data-emoji="0">?</div>
        <div class="pz-card pz-card--back" data-emoji="1">?</div>
        <div class="pz-card pz-card--back" data-emoji="2">?</div>
        <div class="pz-card pz-card--back" data-emoji="0">?</div>
        <div class="pz-card pz-card--back" data-emoji="3">?</div>
        <div class="pz-card pz-card--back" data-emoji="1">?</div>
        <div class="pz-card pz-card--back" data-emoji="3">?</div>
        <div class="pz-card pz-card--back" data-emoji="2">?</div>
      </div>
      <div class="pz-score">Matches: <span id="pz-match-count">0</span> / 4</div>
    </div>`,
    // Stage 5: styled + polished
    `<div class="pz-scaffold pz-scaffold--polished">
      <div class="pz-title-bar pz-title-bar--fancy">Emoji Memory Puzzle</div>
      <div class="pz-subtitle">Find all matching pairs!</div>
      <div class="pz-grid pz-grid--interactive pz-grid--polished" id="pz-live-grid">
        <div class="pz-card pz-card--back pz-card--styled" data-emoji="0">?</div>
        <div class="pz-card pz-card--back pz-card--styled" data-emoji="1">?</div>
        <div class="pz-card pz-card--back pz-card--styled" data-emoji="2">?</div>
        <div class="pz-card pz-card--back pz-card--styled" data-emoji="0">?</div>
        <div class="pz-card pz-card--back pz-card--styled" data-emoji="3">?</div>
        <div class="pz-card pz-card--back pz-card--styled" data-emoji="1">?</div>
        <div class="pz-card pz-card--back pz-card--styled" data-emoji="3">?</div>
        <div class="pz-card pz-card--back pz-card--styled" data-emoji="2">?</div>
      </div>
      <div class="pz-score pz-score--fancy">Matches: <span id="pz-match-count">0</span> / 4</div>
      <div class="pz-moves">Moves: <span id="pz-move-count">0</span></div>
    </div>`,
    // Stage 6: final — with win detection
    `<div class="pz-scaffold pz-scaffold--polished pz-scaffold--final">
      <div class="pz-title-bar pz-title-bar--fancy">Emoji Memory Puzzle</div>
      <div class="pz-subtitle">Find all matching pairs!</div>
      <div class="pz-grid pz-grid--interactive pz-grid--polished pz-grid--final" id="pz-live-grid">
        <div class="pz-card pz-card--back pz-card--styled" data-emoji="0">?</div>
        <div class="pz-card pz-card--back pz-card--styled" data-emoji="1">?</div>
        <div class="pz-card pz-card--back pz-card--styled" data-emoji="2">?</div>
        <div class="pz-card pz-card--back pz-card--styled" data-emoji="0">?</div>
        <div class="pz-card pz-card--back pz-card--styled" data-emoji="3">?</div>
        <div class="pz-card pz-card--back pz-card--styled" data-emoji="1">?</div>
        <div class="pz-card pz-card--back pz-card--styled" data-emoji="3">?</div>
        <div class="pz-card pz-card--back pz-card--styled" data-emoji="2">?</div>
      </div>
      <div class="pz-score pz-score--fancy">Matches: <span id="pz-match-count">0</span> / 4</div>
      <div class="pz-moves">Moves: <span id="pz-move-count">0</span></div>
      <div class="pz-win" id="pz-win" style="display:none">You won! Well done!</div>
    </div>`
  ],

  EMOJIS: ['\u2B50', '\u2764\uFE0F', '\u26A1', '\u2618\uFE0F'],

  STEPS: [
    {
      id: 0,
      title: 'Create Your Project',
      instruction: 'Every project starts with a folder. This command creates a new empty folder called "emoji-puzzle", moves into it, and launches Claude Code. The <code>mkdir</code> part means "make directory" (a folder). The <code>&&</code> means "then do the next thing." You are chaining three small actions into one line — that is all terminal commands are: short instructions joined together.',
      prompt: 'mkdir emoji-puzzle && cd emoji-puzzle && claude',
      promptExplain: '<strong>mkdir</strong> = create folder &nbsp; <strong>cd</strong> = go into folder &nbsp; <strong>claude</strong> = start Claude Code',
      what_claude_does: 'Claude Code launches inside your new empty project folder. It sees there are no files yet and is ready to create whatever you describe. You are now talking directly to Claude through the terminal.',
      stage: 1
    },
    {
      id: 1,
      title: 'Describe What You Want to Build',
      instruction: 'This is the key insight: you do not need to write code. You describe what you want in plain English, and Claude writes the code for you. The more specific your description, the better the result. Notice how this prompt explains the layout (8 cards, 4x2 grid), the behaviour (click to flip, match to keep), and the timing (flip back after 1 second). These details prevent Claude from having to guess.',
      prompt: 'Create a simple emoji memory puzzle game. An HTML page with 8 cards in a 4x2 grid. Each card shows "?" face-down. There are 4 emoji pairs. Clicking a card flips it. If two flipped cards match, they stay revealed. If not, they flip back after 1 second.',
      promptExplain: 'This is just a conversation — you are telling Claude what to build, the same way you would explain it to a friend.',
      what_claude_does: 'Claude creates an index.html file — that is the web page. It writes the basic structure: a title, a grid of 8 empty card slots, and starter styling. If you open this file in a browser, you will see the skeleton of your game. Claude did in seconds what would normally take a developer 15-20 minutes.',
      stage: 2
    },
    {
      id: 2,
      title: 'Add the Emoji Cards',
      instruction: 'Now you are building on what Claude already created. This is how working with Claude Code feels: you keep adding instructions, and Claude keeps improving the same files. Here you are telling it exactly which emojis to use and how many of each. "Shuffle them randomly" means the positions change every time — so the game is different each round.',
      prompt: 'Add 8 cards to the grid. Use these 4 emoji pairs: star, heart, lightning, clover. Each emoji appears exactly twice. Shuffle them randomly. Show "?" when face-down.',
      promptExplain: '4 emoji types x 2 copies each = 8 cards total. Shuffled means randomised positions.',
      what_claude_does: 'Claude updates the HTML file it already created. It places 8 cards into the grid, assigns an emoji to each one (in hidden pairs), shuffles their order randomly, and displays a "?" on every card. The game board now exists — you just cannot see the emojis yet because they are face-down.',
      stage: 3
    },
    {
      id: 3,
      title: 'Make the Cards Interactive',
      instruction: 'A game needs to respond when you do something. This step adds the core game logic: click a card and it flips over to reveal the emoji. Click a second card — if the two emojis match, both stay visible. If they do not match, both flip back after a short pause. The instruction "do not allow clicking more than 2 cards at once" prevents a common bug where fast clicking breaks the game.',
      prompt: 'Add click-to-flip logic. When I click a card, it flips to show its emoji. When two cards are flipped: if they match, keep them face-up. If not, flip both back after 1 second. Don\'t allow clicking more than 2 cards at once.',
      promptExplain: 'You are describing <em>behaviour</em> — what happens when someone interacts. Claude turns this into working code.',
      what_claude_does: 'Claude adds JavaScript — the programming language that makes web pages interactive. It creates logic that listens for clicks, tracks which cards are flipped, compares pairs, and handles both matching (keep visible) and mismatching (flip back with a 1-second delay). Your game is now playable.',
      stage: 4
    },
    {
      id: 4,
      title: 'Make It Look Great',
      instruction: 'Functionality is done — now it is time for polish. This prompt asks Claude to improve the visual design: a dark background, smooth animations when cards flip, rounded corners, and counters that track your progress. You do not need to know CSS (the language for visual styling) — just describe what you want it to look like. "Subtle glow" and "polished and modern" are exactly the kind of language Claude understands well.',
      prompt: 'Style the game: dark background, rounded cards with a subtle glow, smooth flip animation, a match counter at the bottom, and a move counter. Make it look polished and modern.',
      promptExplain: 'Design instructions work just like build instructions — describe the look you want in everyday words.',
      what_claude_does: 'Claude adds and updates the CSS (visual styling) throughout the file. Cards now have rounded corners, a hover glow effect, and a smooth 3D flip animation when clicked. A match counter and move counter appear below the grid. The whole game has a dark, modern look. Same game, but now it feels professional.',
      stage: 5
    },
    {
      id: 5,
      title: 'Add the Winning Moment',
      instruction: 'Every game needs an ending. This final step asks Claude to detect when all pairs have been found and celebrate the win. It also asks for a "Play Again" button — because a good game makes you want to play again. Notice how each step built on the last: structure, content, logic, design, and now completion. That is how real software gets built — layer by layer.',
      prompt: 'Add win detection. When all 4 pairs are matched, show a "You won!" message with the total number of moves. Add a "Play Again" button that reshuffles and resets everything.',
      promptExplain: 'The final feature — Claude adds the win condition, a celebration, and a way to replay.',
      what_claude_does: 'Claude adds a check that runs after every successful match. When all 4 pairs are found, a "You won!" message appears with your total move count. A "Play Again" button reshuffles the cards and resets the counters. Your game is complete — built entirely through conversation, without writing a single line of code yourself.',
      stage: 6
    }
  ],

  init() {
    this.guideEl = document.getElementById('terminal-guide');
    this.previewEl = document.getElementById('terminal-preview');
    if (!this.guideEl || !this.previewEl) return;

    this.loadProgress();
    this.render();
    this.bindEvents();
  },

  loadProgress() {
    try {
      const raw = localStorage.getItem('dualground_guide');
      if (raw) {
        const data = JSON.parse(raw);
        this.completedSteps = data.completed || [];
        this.currentStep = data.current || 0;
      }
    } catch (e) { /* fresh start */ }
  },

  saveProgress() {
    try {
      localStorage.setItem('dualground_guide', JSON.stringify({
        completed: this.completedSteps,
        current: this.currentStep
      }));
    } catch (e) { /* silent */ }
  },

  render() {
    const step = this.STEPS[this.currentStep];
    const total = this.STEPS.length;
    const done = this.completedSteps.length;
    const allDone = done >= total;

    this.guideEl.innerHTML = `
      <div class="guide-header">
        <div class="guide-header__left">
          <div class="guide-header__badge">Step-by-Step Project</div>
          <div class="guide-header__title">Build an Emoji Puzzle Game</div>
          <div class="guide-header__subtitle">Follow along — type each prompt into Claude Code and watch your game come to life</div>
        </div>
        <div class="guide-header__progress">
          <div class="guide-pips">
            ${this.STEPS.map((s, i) => {
              const cls = i === this.currentStep ? 'guide-pip--active' :
                          this.completedSteps.includes(i) ? 'guide-pip--done' : '';
              return `<span class="guide-pip ${cls}" data-step="${i}"></span>`;
            }).join('')}
          </div>
          <div class="guide-progress-label">${done} / ${total} steps</div>
        </div>
      </div>

      ${allDone ? this.renderComplete() : this.renderStep(step)}
    `;

    // Update preview
    this.updatePreview();
  },

  renderStep(step) {
    const isDone = this.completedSteps.includes(step.id);
    const isFirst = step.id === 0;
    const isLast = step.id === this.STEPS.length - 1;

    return `
      <div class="guide-step ${isDone ? 'guide-step--done' : ''}">
        <div class="guide-step__number">
          <span class="guide-step__num-circle ${isDone ? 'guide-step__num-circle--done' : ''}">${isDone ? '\u2713' : step.id + 1}</span>
          <span class="guide-step__title">${step.title}</span>
        </div>

        <p class="guide-step__instruction">${step.instruction}</p>

        <div class="guide-prompt-box">
          <div class="guide-prompt-box__label">Type this into Claude Code:</div>
          <div class="guide-prompt-box__content" id="guide-prompt-text">${step.prompt}</div>
          <button class="guide-prompt-box__copy" id="guide-copy-btn" title="Copy to clipboard">Copy</button>
          ${step.promptExplain ? `<div class="guide-prompt-box__explain">${step.promptExplain}</div>` : ''}
        </div>

        <div class="guide-claude-does">
          <div class="guide-claude-does__icon">&gt;</div>
          <div class="guide-claude-does__text">
            <span class="guide-claude-does__label">What Claude does:</span>
            ${step.what_claude_does}
          </div>
        </div>

        <div class="guide-actions">
          <button class="guide-btn guide-btn--prev" id="guide-prev" ${isFirst ? 'disabled' : ''}>Back</button>
          <button class="guide-btn guide-btn--done" id="guide-mark-done">${isDone ? 'Done \u2713' : 'I did this \u2014 next!'}</button>
          <button class="guide-btn guide-btn--skip" id="guide-next" ${isLast ? 'disabled' : ''}>Skip</button>
        </div>
      </div>
    `;
  },

  renderComplete() {
    return `
      <div class="guide-complete">
        <div class="guide-complete__stars">\u2B50 \u2B50 \u2B50</div>
        <div class="guide-complete__title">You Built a Game!</div>
        <p class="guide-complete__text">In 6 prompts, you went from an empty folder to a working emoji memory puzzle. No coding knowledge needed — just clear instructions to Claude Code. That is what the terminal can do for you.</p>
        <p class="guide-complete__cta">Try the puzzle below, then go build something of your own.</p>
        <button class="guide-btn guide-btn--restart" id="guide-restart">Start Over</button>
      </div>
    `;
  },

  updatePreview() {
    // Find the highest completed stage
    let stage = 0;
    for (const s of this.STEPS) {
      if (this.completedSteps.includes(s.id)) {
        stage = s.stage;
      }
    }

    // If current step is completed, show its stage
    const currentStepData = this.STEPS[this.currentStep];
    if (currentStepData && this.completedSteps.includes(currentStepData.id)) {
      stage = Math.max(stage, currentStepData.stage);
    }

    const stageHtml = this.PUZZLE_STAGES[stage] || this.PUZZLE_STAGES[0];
    const isEmpty = stage === 0;

    this.previewEl.innerHTML = `
      <div class="preview-header">
        <div class="preview-header__dots">
          <span class="preview-header__dot preview-header__dot--red"></span>
          <span class="preview-header__dot preview-header__dot--yellow"></span>
          <span class="preview-header__dot preview-header__dot--green"></span>
        </div>
        <div class="preview-header__url">localhost:3000/emoji-puzzle</div>
      </div>
      <div class="preview-body ${isEmpty ? 'preview-body--empty' : ''}">
        ${isEmpty ? '<div class="preview-empty">Complete Step 1 to see your game appear here</div>' : stageHtml}
      </div>
    `;

    // If interactive stage, bind puzzle logic
    if (stage >= 4) {
      this.initPuzzle();
    }
  },

  // Mini puzzle game logic for the preview
  initPuzzle() {
    const grid = document.getElementById('pz-live-grid');
    if (!grid) return;

    const cards = grid.querySelectorAll('.pz-card');
    let flipped = [];
    let matched = 0;
    let moves = 0;
    let locked = false;
    const emojis = this.EMOJIS;

    // Shuffle card positions
    const positions = [];
    cards.forEach(card => positions.push(card));
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      grid.appendChild(positions[j]);
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    cards.forEach(card => {
      card.addEventListener('click', () => {
        if (locked || card.classList.contains('pz-card--revealed') || flipped.includes(card)) return;

        // Flip card
        const emojiIdx = parseInt(card.dataset.emoji);
        card.textContent = emojis[emojiIdx];
        card.classList.remove('pz-card--back');
        card.classList.add('pz-card--flipped');
        flipped.push(card);

        if (flipped.length === 2) {
          moves++;
          const moveEl = document.getElementById('pz-move-count');
          if (moveEl) moveEl.textContent = moves;

          const [a, b] = flipped;
          if (a.dataset.emoji === b.dataset.emoji) {
            // Match!
            a.classList.add('pz-card--revealed', 'pz-card--match-pop');
            b.classList.add('pz-card--revealed', 'pz-card--match-pop');
            matched++;
            const matchEl = document.getElementById('pz-match-count');
            if (matchEl) matchEl.textContent = matched;
            flipped = [];

            // Win check
            if (matched >= 4) {
              const winEl = document.getElementById('pz-win');
              if (winEl) {
                winEl.style.display = '';
                winEl.textContent = `You won in ${moves} moves!`;
              }
            }
          } else {
            // No match — flip back
            locked = true;
            setTimeout(() => {
              a.textContent = '?';
              b.textContent = '?';
              a.classList.remove('pz-card--flipped');
              b.classList.remove('pz-card--flipped');
              a.classList.add('pz-card--back');
              b.classList.add('pz-card--back');
              flipped = [];
              locked = false;
            }, 900);
          }
        }
      });
    });
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('button, .guide-pip');
      if (!btn) return;

      // Only handle events inside guide or preview
      if (!btn.closest('#terminal-guide, #terminal-preview')) return;

      if (btn.id === 'guide-mark-done') this.markDone();
      else if (btn.id === 'guide-prev') this.nav(-1);
      else if (btn.id === 'guide-next') this.nav(1);
      else if (btn.id === 'guide-restart') this.restart();
      else if (btn.id === 'guide-copy-btn') this.copyPrompt();
      else if (btn.classList.contains('guide-pip')) {
        const idx = parseInt(btn.dataset.step);
        if (!isNaN(idx)) {
          this.currentStep = idx;
          this.saveProgress();
          this.render();
        }
      }
    });
  },

  markDone() {
    const step = this.STEPS[this.currentStep];
    if (!step) return;

    if (!this.completedSteps.includes(step.id)) {
      this.completedSteps.push(step.id);
    }

    // Auto-advance if not last
    if (this.currentStep < this.STEPS.length - 1) {
      this.currentStep++;
    }

    this.saveProgress();
    this.render();
  },

  nav(dir) {
    const next = this.currentStep + dir;
    if (next >= 0 && next < this.STEPS.length) {
      this.currentStep = next;
      this.saveProgress();
      this.render();
    }
  },

  restart() {
    this.completedSteps = [];
    this.currentStep = 0;
    this.saveProgress();
    this.render();
  },

  copyPrompt() {
    const text = document.getElementById('guide-prompt-text');
    if (!text) return;
    const btn = document.getElementById('guide-copy-btn');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text.textContent).then(() => {
        if (btn) {
          btn.textContent = 'Copied!';
          setTimeout(() => { btn.textContent = 'Copy'; }, 1200);
        }
      }).catch(() => {
        this.fallbackCopy(text.textContent, btn);
      });
    } else {
      this.fallbackCopy(text.textContent, btn);
    }
  },

  fallbackCopy(str, btn) {
    const ta = document.createElement('textarea');
    ta.value = str;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      if (btn) {
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1200);
      }
    } catch (e) {
      if (btn) {
        btn.textContent = 'Select & copy manually';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      }
    }
    document.body.removeChild(ta);
  }
};
