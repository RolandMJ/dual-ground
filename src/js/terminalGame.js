// Terminal Hero — Interactive Claude Code terminal simulator
// Always accessible, no unlock needed. Teaches terminal use through guided challenges.

const TerminalGame = {
  currentChallenge: 0,
  completedChallenges: [],
  isAnimating: false,

  RANKS: [
    { min: 0, title: 'Terminal Curious', icon: '?' },
    { min: 1, title: 'First Commands', icon: '>' },
    { min: 3, title: 'Command Crafter', icon: '>>' },
    { min: 5, title: 'Code Navigator', icon: '>>>' },
    { min: 7, title: 'Terminal Hero', icon: '*' },
    { min: 9, title: 'Master of Terminal', icon: '***' }
  ],

  CHALLENGES: [
    {
      id: 0,
      title: 'Start Claude Code',
      brief: 'Open your terminal in any project folder and start Claude Code.',
      hint: 'Just type the command name to launch it.',
      command: 'claude',
      accept: ['claude'],
      output: [
        { text: '', delay: 0 },
        { text: '  Claude Code v1.0.32', type: 'info', delay: 300 },
        { text: '  Model: claude-sonnet-4-6', type: 'info', delay: 150 },
        { text: '', delay: 100 },
        { text: '  Authenticated as you@example.com', type: 'success', delay: 400 },
        { text: '  Project: ~/my-project (3 files)', type: 'muted', delay: 200 },
        { text: '', delay: 100 },
        { text: '  Type your request, or try /help for commands.', type: 'muted', delay: 300 },
        { text: '  >', type: 'prompt', delay: 200 }
      ],
      explanation: 'That\'s it. One command to start. Claude Code reads your project files and is ready to help. No setup needed beyond the initial install.'
    },
    {
      id: 1,
      title: 'Ask a Quick Question',
      brief: 'Use the -p flag to ask Claude a question without entering interactive mode.',
      hint: 'claude -p followed by your question in quotes.',
      command: 'claude -p "what does this project do?"',
      accept: ['claude -p "what does this project do?"', "claude -p 'what does this project do?'", 'claude -p "what does this project do"'],
      output: [
        { text: '', delay: 0 },
        { text: '  Scanning project files...', type: 'muted', delay: 600 },
        { text: '', delay: 200 },
        { text: '  This is a task management API built with Express.js.', type: 'info', delay: 400 },
        { text: '  It has three endpoints:', type: 'info', delay: 200 },
        { text: '    - GET  /tasks      (list all tasks)', type: 'info', delay: 150 },
        { text: '    - POST /tasks      (create a task)', type: 'info', delay: 150 },
        { text: '    - PUT  /tasks/:id  (update a task)', type: 'info', delay: 150 },
        { text: '', delay: 100 },
        { text: '  The project uses SQLite for storage and has', type: 'info', delay: 200 },
        { text: '  basic validation but no authentication yet.', type: 'info', delay: 200 }
      ],
      explanation: 'The -p flag runs a one-shot query — Claude reads your project, answers, and exits. Great for quick questions without starting a full session.'
    },
    {
      id: 2,
      title: 'Read a File',
      brief: 'Inside a Claude Code session, ask Claude to look at a specific file.',
      hint: 'Just describe what you want in plain English.',
      command: 'read the main server file',
      accept: ['read the main server file', 'read server.js', 'show me server.js', 'read index.js', 'show me the main file', 'open server.js'],
      output: [
        { text: '', delay: 0 },
        { text: '  Reading server.js...', type: 'muted', delay: 500 },
        { text: '', delay: 200 },
        { text: '  server.js (42 lines)', type: 'label', delay: 300 },
        { text: '  ─────────────────────────────────────', type: 'muted', delay: 100 },
        { text: '   1  const express = require(\'express\');', type: 'code', delay: 80 },
        { text: '   2  const db = require(\'./db\');', type: 'code', delay: 80 },
        { text: '   3', type: 'code', delay: 40 },
        { text: '   4  const app = express();', type: 'code', delay: 80 },
        { text: '   5  app.use(express.json());', type: 'code', delay: 80 },
        { text: '   6', type: 'code', delay: 40 },
        { text: '   7  // Routes', type: 'code', delay: 80 },
        { text: '   8  app.get(\'/tasks\', async (req, res) => {', type: 'code', delay: 80 },
        { text: '   ...', type: 'muted', delay: 100 },
        { text: '  ─────────────────────────────────────', type: 'muted', delay: 100 },
        { text: '', delay: 100 },
        { text: '  Standard Express setup. Uses a local db module', type: 'info', delay: 300 },
        { text: '  for SQLite. Routes are defined inline.', type: 'info', delay: 200 }
      ],
      explanation: 'You don\'t need to know exact file names. Claude Code understands your project structure and finds the right file. Plain English works.'
    },
    {
      id: 3,
      title: 'Fix a Bug',
      brief: 'Ask Claude to find and fix an issue in your code.',
      hint: 'Describe the problem. Claude will find it and show you the fix.',
      command: 'the POST /tasks endpoint crashes when title is empty. fix it',
      accept: ['the POST /tasks endpoint crashes when title is empty. fix it', 'fix the crash when title is empty', 'fix the post tasks endpoint', 'fix the bug in post tasks'],
      output: [
        { text: '', delay: 0 },
        { text: '  Analyzing POST /tasks endpoint...', type: 'muted', delay: 700 },
        { text: '  Found the issue in server.js:15', type: 'warn', delay: 500 },
        { text: '', delay: 200 },
        { text: '  server.js', type: 'label', delay: 200 },
        { text: '  ─────────────────────────────────────', type: 'muted', delay: 100 },
        { text: '  - app.post(\'/tasks\', async (req, res) => {', type: 'diff-remove', delay: 200 },
        { text: '  -   const task = await db.create(req.body);', type: 'diff-remove', delay: 200 },
        { text: '  + app.post(\'/tasks\', async (req, res) => {', type: 'diff-add', delay: 200 },
        { text: '  +   const { title } = req.body;', type: 'diff-add', delay: 150 },
        { text: '  +   if (!title || !title.trim()) {', type: 'diff-add', delay: 150 },
        { text: '  +     return res.status(400).json({', type: 'diff-add', delay: 150 },
        { text: '  +       error: \'Title is required\'', type: 'diff-add', delay: 150 },
        { text: '  +     });', type: 'diff-add', delay: 150 },
        { text: '  +   }', type: 'diff-add', delay: 150 },
        { text: '  +   const task = await db.create(req.body);', type: 'diff-add', delay: 150 },
        { text: '  ─────────────────────────────────────', type: 'muted', delay: 100 },
        { text: '', delay: 100 },
        { text: '  Added validation for empty title. Returns 400', type: 'success', delay: 400 },
        { text: '  with a clear error message.', type: 'success', delay: 200 }
      ],
      explanation: 'Claude Code shows diffs before applying changes. Green lines are additions, red are removals. You can approve, reject, or ask for modifications before anything changes.'
    },
    {
      id: 4,
      title: 'Run Your Tests',
      brief: 'Ask Claude to run the project\'s test suite and interpret the results.',
      hint: 'Just tell Claude to run the tests.',
      command: 'run the tests',
      accept: ['run the tests', 'run tests', 'test', 'npm test', 'run test suite'],
      output: [
        { text: '', delay: 0 },
        { text: '  > npm test', type: 'muted', delay: 400 },
        { text: '', delay: 300 },
        { text: '  PASS  tests/tasks.test.js', type: 'success', delay: 500 },
        { text: '    GET /tasks', type: 'info', delay: 150 },
        { text: '      + returns empty array initially (12ms)', type: 'success', delay: 150 },
        { text: '      + returns all tasks after creation (8ms)', type: 'success', delay: 150 },
        { text: '    POST /tasks', type: 'info', delay: 150 },
        { text: '      + creates a task with valid title (15ms)', type: 'success', delay: 150 },
        { text: '      + rejects empty title with 400 (3ms)', type: 'success', delay: 150 },
        { text: '', delay: 100 },
        { text: '  Tests: 4 passed, 4 total', type: 'success', delay: 300 },
        { text: '  Time:  0.847s', type: 'muted', delay: 100 },
        { text: '', delay: 200 },
        { text: '  All tests pass, including the new validation', type: 'success', delay: 400 },
        { text: '  test for empty titles.', type: 'success', delay: 200 }
      ],
      explanation: 'Claude Code runs terminal commands directly and reads the output. It understands test results and can fix failing tests automatically if you ask.'
    },
    {
      id: 5,
      title: 'Commit Your Work',
      brief: 'Ask Claude to commit the changes with a descriptive message.',
      hint: 'Tell Claude to commit. It writes the message for you.',
      command: 'commit these changes',
      accept: ['commit these changes', 'commit', 'git commit', 'commit the changes', 'commit this'],
      output: [
        { text: '', delay: 0 },
        { text: '  Staging changes...', type: 'muted', delay: 400 },
        { text: '  > git add server.js', type: 'muted', delay: 300 },
        { text: '', delay: 200 },
        { text: '  Commit message:', type: 'label', delay: 300 },
        { text: '  "Add input validation for POST /tasks endpoint"', type: 'info', delay: 400 },
        { text: '', delay: 200 },
        { text: '  Body:', type: 'label', delay: 200 },
        { text: '  - Validate that title is present and non-empty', type: 'info', delay: 150 },
        { text: '  - Return 400 with error message for invalid input', type: 'info', delay: 150 },
        { text: '  - Prevents crash on empty POST body', type: 'info', delay: 150 },
        { text: '', delay: 200 },
        { text: '  [main abc1234] Add input validation for', type: 'success', delay: 400 },
        { text: '  POST /tasks endpoint', type: 'success', delay: 100 },
        { text: '  1 file changed, 6 insertions(+), 1 deletion(-)', type: 'muted', delay: 200 }
      ],
      explanation: 'Claude Code writes meaningful commit messages based on what actually changed. No more "fix stuff" commits. It stages the right files and explains the change.'
    },
    {
      id: 6,
      title: 'Create a CLAUDE.md',
      brief: 'Use the /init command to generate a CLAUDE.md file for your project.',
      hint: 'Slash commands start with /.',
      command: '/init',
      accept: ['/init'],
      output: [
        { text: '', delay: 0 },
        { text: '  Analyzing project structure...', type: 'muted', delay: 600 },
        { text: '  Reading package.json, server.js, db.js...', type: 'muted', delay: 400 },
        { text: '', delay: 300 },
        { text: '  Generated CLAUDE.md:', type: 'label', delay: 400 },
        { text: '  ─────────────────────────────────────', type: 'muted', delay: 100 },
        { text: '  # CLAUDE.md', type: 'code', delay: 200 },
        { text: '  ## Build & Run', type: 'code', delay: 150 },
        { text: '  npm install && npm start', type: 'code', delay: 150 },
        { text: '  ## Test', type: 'code', delay: 150 },
        { text: '  npm test', type: 'code', delay: 150 },
        { text: '  ## Architecture', type: 'code', delay: 150 },
        { text: '  Express REST API with SQLite storage.', type: 'code', delay: 150 },
        { text: '  Routes in server.js, DB layer in db.js.', type: 'code', delay: 150 },
        { text: '  ─────────────────────────────────────', type: 'muted', delay: 100 },
        { text: '', delay: 200 },
        { text: '  Saved to ./CLAUDE.md', type: 'success', delay: 300 }
      ],
      explanation: '/init scans your project and creates a CLAUDE.md file automatically. This file is read at the start of every Claude Code session — it\'s your project\'s memory.'
    },
    {
      id: 7,
      title: 'Pipe a Log File',
      brief: 'Use Unix pipes to feed data into Claude Code for analysis.',
      hint: 'Use the pipe symbol | to send output from one command into Claude.',
      command: 'cat error.log | claude -p "what went wrong?"',
      accept: ['cat error.log | claude -p "what went wrong?"', "cat error.log | claude -p 'what went wrong?'", 'cat error.log | claude -p "what went wrong"'],
      output: [
        { text: '', delay: 0 },
        { text: '  Reading piped input (47 lines)...', type: 'muted', delay: 500 },
        { text: '', delay: 300 },
        { text: '  The error is a database connection timeout.', type: 'info', delay: 400 },
        { text: '', delay: 200 },
        { text: '  Timeline:', type: 'label', delay: 200 },
        { text: '  14:32:01  Server started normally', type: 'info', delay: 150 },
        { text: '  14:32:45  First DB query succeeded', type: 'info', delay: 150 },
        { text: '  14:33:12  Connection pool exhausted (max: 5)', type: 'warn', delay: 200 },
        { text: '  14:33:12  New requests queued, then timed out', type: 'warn', delay: 200 },
        { text: '', delay: 200 },
        { text: '  Fix: Increase the connection pool size in', type: 'success', delay: 300 },
        { text: '  db.js or add connection recycling.', type: 'success', delay: 200 }
      ],
      explanation: 'Claude Code works with Unix pipes. You can pipe in logs, diffs, command output — anything. The -p flag processes it as a one-shot query and returns the analysis.'
    },
    {
      id: 8,
      title: 'Multi-File Refactor',
      brief: 'Ask Claude to make a change that spans multiple files at once.',
      hint: 'Describe the change. Claude figures out which files need updating.',
      command: 'move all route handlers into a separate routes.js file',
      accept: ['move all route handlers into a separate routes.js file', 'move routes to routes.js', 'extract routes into routes.js', 'refactor routes into separate file'],
      output: [
        { text: '', delay: 0 },
        { text: '  Planning refactor...', type: 'muted', delay: 600 },
        { text: '  2 files will be modified, 1 created', type: 'info', delay: 400 },
        { text: '', delay: 200 },
        { text: '  + Created routes.js (28 lines)', type: 'diff-add', delay: 300 },
        { text: '    Moved GET /tasks, POST /tasks,', type: 'info', delay: 200 },
        { text: '    PUT /tasks/:id handlers', type: 'info', delay: 150 },
        { text: '', delay: 200 },
        { text: '  ~ Modified server.js', type: 'warn', delay: 300 },
        { text: '    - Removed inline route handlers', type: 'diff-remove', delay: 200 },
        { text: '    + Added: const routes = require(\'./routes\')', type: 'diff-add', delay: 200 },
        { text: '    + Added: app.use(routes)', type: 'diff-add', delay: 200 },
        { text: '', delay: 200 },
        { text: '  ~ Modified db.js', type: 'warn', delay: 300 },
        { text: '    + Exported query helper for routes.js', type: 'diff-add', delay: 200 },
        { text: '', delay: 200 },
        { text: '  All tests still pass after refactor.', type: 'success', delay: 500 }
      ],
      explanation: 'Claude Code edits multiple files in one go and keeps everything consistent — imports, exports, references. It can also run your tests afterward to verify nothing broke.'
    },
    {
      id: 9,
      title: 'Security Review',
      brief: 'Pipe a git diff into Claude for a focused security review.',
      hint: 'Combine git diff with a pipe and a specific question.',
      command: 'git diff main | claude -p "security review"',
      accept: ['git diff main | claude -p "security review"', "git diff main | claude -p 'security review'", 'git diff | claude -p "security review"'],
      output: [
        { text: '', delay: 0 },
        { text: '  Reviewing diff (3 files, +47 -12)...', type: 'muted', delay: 600 },
        { text: '', delay: 300 },
        { text: '  SECURITY REVIEW', type: 'label', delay: 300 },
        { text: '  ─────────────────────────────────────', type: 'muted', delay: 100 },
        { text: '', delay: 100 },
        { text: '  [OK] Input validation added for POST /tasks', type: 'success', delay: 300 },
        { text: '  [OK] SQL queries use parameterised statements', type: 'success', delay: 300 },
        { text: '  [!!] No rate limiting on API endpoints', type: 'warn', delay: 400 },
        { text: '  [!!] Error messages expose stack traces', type: 'warn', delay: 400 },
        { text: '', delay: 200 },
        { text: '  Recommendation: Add express-rate-limit and', type: 'info', delay: 300 },
        { text: '  a production error handler that hides internals.', type: 'info', delay: 300 },
        { text: '  ─────────────────────────────────────', type: 'muted', delay: 100 }
      ],
      explanation: 'Piping git diffs into Claude Code is a real workflow developers use daily. It catches security issues, logic errors, and style problems before code gets merged.'
    }
  ],

  init() {
    this.container = document.getElementById('terminal-game');
    if (!this.container) return;

    this.loadProgress();
    this.renderShell();
    this.bindEvents();
  },

  loadProgress() {
    try {
      const raw = localStorage.getItem('dualground_terminal');
      if (raw) {
        const data = JSON.parse(raw);
        this.completedChallenges = data.completed || [];
        this.currentChallenge = data.current || 0;
      }
    } catch (e) { /* start fresh */ }
  },

  saveProgress() {
    try {
      localStorage.setItem('dualground_terminal', JSON.stringify({
        completed: this.completedChallenges,
        current: this.currentChallenge
      }));
    } catch (e) { /* fail silently */ }
  },

  getRank() {
    const count = this.completedChallenges.length;
    let rank = this.RANKS[0];
    for (const r of this.RANKS) {
      if (count >= r.min) rank = r;
    }
    return rank;
  },

  renderShell() {
    const rank = this.getRank();
    const challenge = this.CHALLENGES[this.currentChallenge] || this.CHALLENGES[0];
    const total = this.CHALLENGES.length;
    const done = this.completedChallenges.length;
    const allDone = done >= total;

    this.container.innerHTML = `
      <div class="tg-header">
        <div class="tg-header__left">
          <div class="tg-header__title">Terminal Hero</div>
          <div class="tg-header__subtitle">Master Claude Code — one command at a time</div>
        </div>
        <div class="tg-header__right">
          <div class="tg-rank" title="Your terminal rank">
            <span class="tg-rank__icon">${rank.icon}</span>
            <span class="tg-rank__title">${rank.title}</span>
          </div>
          <div class="tg-progress-bar">
            <div class="tg-progress-bar__fill" style="width: ${(done / total) * 100}%"></div>
          </div>
          <div class="tg-progress-bar__label">${done} / ${total} challenges</div>
        </div>
      </div>

      ${allDone ? this.renderComplete() : this.renderChallenge(challenge)}

      <div class="tg-nav">
        <button class="tg-nav__btn" id="tg-prev" ${this.currentChallenge <= 0 ? 'disabled' : ''}>Previous</button>
        <div class="tg-nav__dots">
          ${this.CHALLENGES.map((c, i) => {
            const cls = i === this.currentChallenge ? 'tg-dot--active' :
                        this.completedChallenges.includes(i) ? 'tg-dot--done' : '';
            return `<span class="tg-dot ${cls}" data-idx="${i}" title="Challenge ${i + 1}: ${c.title}"></span>`;
          }).join('')}
        </div>
        <button class="tg-nav__btn" id="tg-next" ${this.currentChallenge >= total - 1 ? 'disabled' : ''}>Next</button>
      </div>
    `;
  },

  renderChallenge(c) {
    const isDone = this.completedChallenges.includes(c.id);
    return `
      <div class="tg-challenge">
        <div class="tg-challenge__header">
          <span class="tg-challenge__number">Challenge ${c.id + 1}</span>
          <span class="tg-challenge__title">${c.title}</span>
          ${isDone ? '<span class="tg-challenge__badge">Completed</span>' : ''}
        </div>
        <p class="tg-challenge__brief">${c.brief}</p>
      </div>

      <div class="tg-terminal">
        <div class="tg-terminal__bar">
          <span class="tg-terminal__dot tg-terminal__dot--red"></span>
          <span class="tg-terminal__dot tg-terminal__dot--yellow"></span>
          <span class="tg-terminal__dot tg-terminal__dot--green"></span>
          <span class="tg-terminal__title-bar">~/my-project</span>
        </div>
        <div class="tg-terminal__body" id="tg-output">
          <div class="tg-terminal__line tg-terminal__line--prompt">
            <span class="tg-prompt-symbol">$</span>
            <input type="text" class="tg-input" id="tg-input"
              placeholder="Type command here..."
              autocomplete="off" spellcheck="false"
              ${this.isAnimating ? 'disabled' : ''}>
          </div>
        </div>
      </div>

      <div class="tg-actions">
        <button class="tg-btn tg-btn--run" id="tg-run" ${this.isAnimating ? 'disabled' : ''}>Run</button>
        <button class="tg-btn tg-btn--hint" id="tg-hint">Hint</button>
        <button class="tg-btn tg-btn--type-for-me" id="tg-auto">Type it for me</button>
      </div>

      <div class="tg-hint-box" id="tg-hint-box" style="display:none">
        <span class="tg-hint-box__label">Hint:</span> ${c.hint}
      </div>

      <div class="tg-explanation" id="tg-explanation" style="display:none"></div>
    `;
  },

  renderComplete() {
    return `
      <div class="tg-complete">
        <div class="tg-complete__icon">***</div>
        <div class="tg-complete__title">Master of Terminal</div>
        <p class="tg-complete__text">You have completed all 10 challenges. You know how to start Claude Code, ask questions, fix bugs, run tests, commit, create project configs, pipe data, refactor across files, and run security reviews. The terminal is no longer unfamiliar territory — it is your workspace.</p>
        <button class="tg-btn tg-btn--replay" id="tg-replay">Replay All Challenges</button>
      </div>
    `;
  },

  bindEvents() {
    this.container.addEventListener('click', (e) => {
      const btn = e.target.closest('button, .tg-dot');
      if (!btn) return;

      if (btn.id === 'tg-run') this.runCommand();
      else if (btn.id === 'tg-hint') this.showHint();
      else if (btn.id === 'tg-auto') this.autoType();
      else if (btn.id === 'tg-prev') this.navigate(-1);
      else if (btn.id === 'tg-next') this.navigate(1);
      else if (btn.id === 'tg-replay') this.replay();
      else if (btn.classList.contains('tg-dot')) {
        const idx = parseInt(btn.dataset.idx);
        if (!isNaN(idx)) {
          this.currentChallenge = idx;
          this.renderShell();
          this.focusInput();
        }
      }
    });

    this.container.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.id === 'tg-input') {
        this.runCommand();
      }
    });
  },

  focusInput() {
    const input = document.getElementById('tg-input');
    if (input) setTimeout(() => input.focus(), 50);
  },

  navigate(dir) {
    const next = this.currentChallenge + dir;
    if (next >= 0 && next < this.CHALLENGES.length) {
      this.currentChallenge = next;
      this.saveProgress();
      this.renderShell();
      this.focusInput();
    }
  },

  replay() {
    this.completedChallenges = [];
    this.currentChallenge = 0;
    this.saveProgress();
    this.renderShell();
    this.focusInput();
  },

  showHint() {
    const box = document.getElementById('tg-hint-box');
    if (box) box.style.display = box.style.display === 'none' ? '' : 'none';
  },

  autoType() {
    const challenge = this.CHALLENGES[this.currentChallenge];
    if (!challenge) return;
    const input = document.getElementById('tg-input');
    if (!input || this.isAnimating) return;

    input.value = '';
    let i = 0;
    const text = challenge.command;
    this.isAnimating = true;

    const typeInterval = setInterval(() => {
      if (i < text.length) {
        input.value += text[i];
        i++;
      } else {
        clearInterval(typeInterval);
        this.isAnimating = false;
        // Auto-run after typing completes
        setTimeout(() => this.runCommand(), 400);
      }
    }, 45);
  },

  runCommand() {
    if (this.isAnimating) return;
    const challenge = this.CHALLENGES[this.currentChallenge];
    if (!challenge) return;

    const input = document.getElementById('tg-input');
    if (!input) return;
    const value = input.value.trim().toLowerCase();

    // Check if command matches (exact or user typed the full accepted form)
    const accepted = challenge.accept.some(a => {
      return value === a.toLowerCase();
    });

    if (!accepted && value.length > 0) {
      this.showWrongCommand(value, challenge);
      return;
    }

    if (!value) {
      // If empty, auto-fill the command
      input.value = challenge.command;
    }

    this.animateOutput(challenge);
  },

  showWrongCommand(typed, challenge) {
    const output = document.getElementById('tg-output');
    const line = document.createElement('div');
    line.className = 'tg-terminal__line tg-terminal__line--error';
    line.textContent = `  Command not recognized for this challenge. Try: ${challenge.command}`;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  },

  animateOutput(challenge) {
    this.isAnimating = true;
    const input = document.getElementById('tg-input');
    const runBtn = document.getElementById('tg-run');
    if (input) input.disabled = true;
    if (runBtn) runBtn.disabled = true;

    const output = document.getElementById('tg-output');
    const lines = challenge.output;
    let lineIdx = 0;
    let totalDelay = 0;

    lines.forEach((line, idx) => {
      totalDelay += line.delay;
      setTimeout(() => {
        const el = document.createElement('div');
        el.className = `tg-terminal__line tg-terminal__line--${line.type || 'default'}`;
        el.textContent = line.text;
        el.style.opacity = '0';
        el.style.transform = 'translateY(4px)';
        output.appendChild(el);

        // Trigger animation
        requestAnimationFrame(() => {
          el.style.transition = 'opacity 0.2s, transform 0.2s';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });

        output.scrollTop = output.scrollHeight;
      }, totalDelay);
    });

    // After all lines, show explanation and mark complete
    setTimeout(() => {
      this.isAnimating = false;

      // Mark challenge complete
      if (!this.completedChallenges.includes(challenge.id)) {
        this.completedChallenges.push(challenge.id);
        this.saveProgress();
      }

      // Show explanation
      const explEl = document.getElementById('tg-explanation');
      if (explEl) {
        explEl.innerHTML = `
          <div class="tg-explanation__icon">&#10003;</div>
          <div class="tg-explanation__text">${challenge.explanation}</div>
        `;
        explEl.style.display = '';
      }

      // Update rank and progress in header
      this.updateHeader();

      // Auto-advance hint
      if (this.currentChallenge < this.CHALLENGES.length - 1) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'tg-btn tg-btn--next-challenge';
        nextBtn.textContent = 'Next Challenge \u2192';
        nextBtn.addEventListener('click', () => this.navigate(1));
        const explContainer = document.getElementById('tg-explanation');
        if (explContainer) explContainer.appendChild(nextBtn);
      } else if (this.completedChallenges.length >= this.CHALLENGES.length) {
        // All done — re-render to show completion
        setTimeout(() => this.renderShell(), 600);
      }
    }, totalDelay + 400);
  },

  updateHeader() {
    const rank = this.getRank();
    const done = this.completedChallenges.length;
    const total = this.CHALLENGES.length;

    const rankTitle = this.container.querySelector('.tg-rank__title');
    const rankIcon = this.container.querySelector('.tg-rank__icon');
    const fill = this.container.querySelector('.tg-progress-bar__fill');
    const label = this.container.querySelector('.tg-progress-bar__label');

    if (rankTitle) rankTitle.textContent = rank.title;
    if (rankIcon) rankIcon.textContent = rank.icon;
    if (fill) fill.style.width = `${(done / total) * 100}%`;
    if (label) label.textContent = `${done} / ${total} challenges`;

    // Update dots
    this.container.querySelectorAll('.tg-dot').forEach(dot => {
      const idx = parseInt(dot.dataset.idx);
      dot.classList.toggle('tg-dot--done', this.completedChallenges.includes(idx));
    });
  }
};
