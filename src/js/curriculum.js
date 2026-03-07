// Curriculum rendering and quiz logic
const Curriculum = {
  currentModule: null,
  quizState: {}, // { moduleId: { answered: [0,1,2], correct: [true,false,true] } }

  init() {
    this.titleEl = document.querySelector('.module-title');
    this.subtitleEl = document.querySelector('.module-subtitle');
    this.contentEl = document.querySelector('.module-content');
    this.calloutEl = document.querySelector('.skills-callout');
    this.quizEl = document.querySelector('.quiz-area');
    this.extrasEl = document.querySelector('.extras-section');
    this.progressEl = document.querySelector('.topbar__progress');

    this.bindNavigation();
    this.loadModule(App.state.currentModule);
  },

  bindNavigation() {
    document.getElementById('nav-prev').addEventListener('click', () => {
      if (App.state.currentModule > 1) {
        this.loadModule(App.state.currentModule - 1);
      }
    });
    document.getElementById('nav-next').addEventListener('click', () => {
      if (App.state.currentModule < MODULES.length) {
        this.loadModule(App.state.currentModule + 1);
      }
    });
  },

  loadModule(id) {
    const mod = MODULES.find(m => m.id === id);
    if (!mod) return;

    this.currentModule = mod;
    App.state.currentModule = id;

    // Update progress
    this.progressEl.textContent = `Module ${id} of ${MODULES.length}`;

    // Update navigation buttons
    document.getElementById('nav-prev').disabled = id <= 1;
    document.getElementById('nav-next').disabled = id >= MODULES.length;

    // Render sections
    this.renderTitle(mod);
    this.renderContent(mod);
    this.renderCallout(mod);
    this.renderQuiz(mod);
    this.renderExtras(mod);

    // Scroll to top of panel
    document.querySelector('.panel--learn').scrollTop = 0;
  },

  renderTitle(mod) {
    this.subtitleEl.textContent = `Module ${mod.id} of ${MODULES.length}`;
    this.titleEl.textContent = mod.title;
  },

  renderContent(mod) {
    if (!mod.content.length) {
      this.contentEl.innerHTML = '<p class="module-content__placeholder">Content coming soon.</p>';
      return;
    }
    this.contentEl.innerHTML = mod.content.map(p => `<p>${p}</p>`).join('');
  },

  renderCallout(mod) {
    if (!mod.skillCallout) {
      this.calloutEl.style.display = 'none';
      return;
    }
    this.calloutEl.style.display = '';
    this.calloutEl.innerHTML = `
      <div class="skills-callout__label">Skills Connection</div>
      <p class="skills-callout__text">${mod.skillCallout}</p>
    `;
  },

  renderQuiz(mod) {
    if (!mod.quiz.length) {
      this.quizEl.innerHTML = `
        <div class="quiz-area__label">Quiz</div>
        <p class="quiz-area__placeholder">Quiz questions coming soon.</p>
      `;
      return;
    }

    // Initialise quiz state for this module if needed
    if (!this.quizState[mod.id]) {
      this.quizState[mod.id] = { answered: {}, correct: {} };
    }
    const state = this.quizState[mod.id];

    const questionsHtml = mod.quiz.map((q, idx) => {
      const isAnswered = state.answered[idx] !== undefined;
      const wasCorrect = state.correct[idx];
      const selectedOption = state.answered[idx];

      const optionsHtml = q.options.map((opt, optIdx) => {
        let classes = 'quiz-option';
        if (isAnswered) {
          if (optIdx === q.correct) classes += ' quiz-option--correct';
          else if (optIdx === selectedOption) classes += ' quiz-option--wrong';
          classes += ' quiz-option--disabled';
        }
        return `<button class="${classes}" data-question="${idx}" data-option="${optIdx}" ${isAnswered ? 'disabled' : ''}>${opt}</button>`;
      }).join('');

      let feedbackHtml = '';
      if (isAnswered) {
        const feedbackClass = wasCorrect ? 'quiz-feedback--correct' : 'quiz-feedback--wrong';
        const feedbackText = wasCorrect ? q.explanationCorrect : q.explanationWrong;
        const feedbackIcon = wasCorrect ? '&#10003;' : '&#10007;';
        feedbackHtml = `<div class="quiz-feedback ${feedbackClass}"><span class="quiz-feedback__icon">${feedbackIcon}</span> ${feedbackText}</div>`;
      }

      return `
        <div class="quiz-question">
          <div class="quiz-question__number">Question ${idx + 1}</div>
          <p class="quiz-question__text">${q.question}</p>
          <div class="quiz-options">${optionsHtml}</div>
          ${feedbackHtml}
        </div>
      `;
    }).join('');

    // Score summary if all answered
    const allAnswered = Object.keys(state.answered).length === mod.quiz.length;
    let summaryHtml = '';
    if (allAnswered) {
      const correctCount = Object.values(state.correct).filter(Boolean).length;
      summaryHtml = `
        <div class="quiz-summary">
          <span class="quiz-summary__score">${correctCount}/${mod.quiz.length}</span>
          <span class="quiz-summary__text">${correctCount === mod.quiz.length ? 'Perfect score!' : correctCount >= 2 ? 'Well done!' : 'Review the explanations above and try the next module.'}</span>
        </div>
      `;
    }

    this.quizEl.innerHTML = `
      <div class="quiz-area__label">Quiz</div>
      ${questionsHtml}
      ${summaryHtml}
    `;

    // Bind click events for unanswered questions
    this.quizEl.querySelectorAll('.quiz-option:not(.quiz-option--disabled)').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const qIdx = parseInt(e.target.dataset.question);
        const oIdx = parseInt(e.target.dataset.option);
        this.answerQuestion(mod.id, qIdx, oIdx);
      });
    });
  },

  answerQuestion(moduleId, questionIdx, optionIdx) {
    const mod = MODULES.find(m => m.id === moduleId);
    const q = mod.quiz[questionIdx];
    const isCorrect = optionIdx === q.correct;

    if (!this.quizState[moduleId]) {
      this.quizState[moduleId] = { answered: {}, correct: {} };
    }
    this.quizState[moduleId].answered[questionIdx] = optionIdx;
    this.quizState[moduleId].correct[questionIdx] = isCorrect;

    // Check if all questions in this module are answered — trigger unlock
    const state = this.quizState[moduleId];
    if (Object.keys(state.answered).length === mod.quiz.length) {
      App.onModuleComplete(moduleId);
    }

    // Re-render quiz to show feedback
    this.renderQuiz(mod);
  },

  renderExtras(mod) {
    if (!mod.extras || (!mod.extras.links.length && !mod.extras.whyItMatters)) {
      this.extrasEl.innerHTML = `
        <div class="extras-section__label">Extras</div>
        <p class="extras-section__placeholder">Extras coming soon.</p>
      `;
      return;
    }

    const linksHtml = mod.extras.links.map(link =>
      `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="extras-link">${link.text}</a>`
    ).join('');

    const visualsHtml = mod.extras.visuals.map(v =>
      `<div class="extras-visual">${v}</div>`
    ).join('');

    this.extrasEl.innerHTML = `
      <div class="extras-section__label">Extras</div>
      ${visualsHtml ? `<div class="extras-visuals">${visualsHtml}</div>` : ''}
      ${linksHtml ? `<div class="extras-links"><div class="extras-links__label">References</div>${linksHtml}</div>` : ''}
      ${mod.extras.whyItMatters ? `<div class="extras-why"><div class="extras-why__label">Why this matters</div><p>${mod.extras.whyItMatters}</p></div>` : ''}
    `;
  }
};
