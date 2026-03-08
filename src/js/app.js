// Main initialisation and state management
const App = {
  STORAGE_KEY: 'dualground_state',

  state: {
    currentModule: 1,
    completedModules: [],
    unlockedPromptBlocks: [],
    unlockedSkillBlocks: [],
    promptBlocks: [],
    skillBlocks: []
  },

  // Module -> block unlock mapping (10 modules)
  UNLOCK_MAP: {
    1: { prompt: ['role', 'context'], skill: ['name'] },
    2: { prompt: ['task'], skill: ['description'] },
    3: { prompt: ['constraint', 'example'], skill: ['trigger'] },
    4: { prompt: ['format', 'prefill'], skill: ['steps'] },
    5: { prompt: ['think'], skill: ['notes'] },
    6: { prompt: ['tool'], skill: [] },
    7: { prompt: ['chain'], skill: [] },
    8: { prompt: ['memory'], skill: [] },
    9: { prompt: ['safety'], skill: [] },
    10: { prompt: [], skill: [] }
  },

  init() {
    this.loadState();
    this.initIntro();
    Curriculum.init();
    PromptForge.init();
    SkillForge.init();
    Output.init();
    TerminalGame.init();
    TerminalGuide.init();

    // Restore unlocked blocks from saved state
    this.restoreUnlocks();
    this.updateFinishButton();
    this.initPopoverToggles();

    // Ensure scroll is at top after all content is rendered
    window.scrollTo(0, 0);
  },

  initIntro() {
    const introScreen = document.getElementById('intro-screen');
    const topbar = document.getElementById('topbar');
    const app = document.querySelector('.app');
    const reviewGuide = document.getElementById('review-guide');
    const startBtn = document.getElementById('intro-start-btn');
    const terminalSection = document.getElementById('terminal-section');
    const logo = document.querySelector('.topbar__logo');

    // Always show intro on page load — hide the rest
    if (reviewGuide) reviewGuide.style.display = 'none';
    if (terminalSection) terminalSection.style.display = 'none';

    const footer = document.getElementById('site-footer');

    const showApp = () => {
      introScreen.classList.add('intro--hidden');
      topbar.classList.remove('topbar--hidden');
      app.classList.remove('app--hidden');
      if (reviewGuide) reviewGuide.style.display = '';
      if (terminalSection) terminalSection.style.display = '';
      if (footer) footer.style.display = '';
      window.scrollTo(0, 0);
    };

    const showIntro = () => {
      introScreen.classList.remove('intro--hidden');
      topbar.classList.add('topbar--hidden');
      app.classList.add('app--hidden');
      if (reviewGuide) reviewGuide.style.display = 'none';
      if (terminalSection) terminalSection.style.display = 'none';
      if (footer) footer.style.display = 'none';
      // Hide output screen if visible
      const outputScreen = document.getElementById('output-screen');
      if (outputScreen) outputScreen.classList.remove('output-screen--visible');
      window.scrollTo(0, 0);
    };

    startBtn.addEventListener('click', showApp);

    // Logo click returns to intro / start page
    if (logo) {
      logo.style.cursor = 'pointer';
      logo.addEventListener('click', showIntro);
    }
  },

  saveState() {
    try {
      const data = {
        currentModule: this.state.currentModule,
        completedModules: this.state.completedModules,
        unlockedPromptBlocks: this.state.unlockedPromptBlocks,
        unlockedSkillBlocks: this.state.unlockedSkillBlocks,
        quizState: Curriculum.quizState,
        promptBlocks: PromptForge.blocks.map(b => ({
          type: b.type, label: b.label, color: b.color, content: b.content
        })),
        skillBlocks: SkillForge.blocks.map(b => ({
          type: b.type, label: b.label, color: b.color, content: b.content
        }))
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // localStorage unavailable or full — fail silently
    }
  },

  loadState() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      // Validate types before restoring
      if (typeof data !== 'object' || data === null) return;
      const num = data.currentModule;
      this.state.currentModule = (Number.isInteger(num) && num >= 1 && num <= 10) ? num : 1;
      this.state.completedModules = Array.isArray(data.completedModules) ? data.completedModules : [];
      this.state.unlockedPromptBlocks = Array.isArray(data.unlockedPromptBlocks) ? data.unlockedPromptBlocks : [];
      this.state.unlockedSkillBlocks = Array.isArray(data.unlockedSkillBlocks) ? data.unlockedSkillBlocks : [];
      this._savedQuizState = (typeof data.quizState === 'object' && data.quizState) ? data.quizState : {};
      this._savedPromptBlocks = Array.isArray(data.promptBlocks) ? data.promptBlocks : [];
      this._savedSkillBlocks = Array.isArray(data.skillBlocks) ? data.skillBlocks : [];
    } catch (e) {
      // Corrupted data — start fresh
      localStorage.removeItem(this.STORAGE_KEY);
    }
  },

  restoreUnlocks() {
    // Restore quiz state
    if (this._savedQuizState) {
      Curriculum.quizState = this._savedQuizState;
    }

    // Unlock buttons without animation for previously unlocked blocks
    if (this.state.unlockedPromptBlocks.length) {
      PromptForge.onUnlock(this.state.unlockedPromptBlocks);
    }
    if (this.state.unlockedSkillBlocks.length) {
      SkillForge.onUnlock(this.state.unlockedSkillBlocks);
    }

    // Restore prompt blocks
    if (this._savedPromptBlocks && this._savedPromptBlocks.length) {
      this._savedPromptBlocks.forEach(b => {
        const type = PromptForge.BLOCK_TYPES.find(t => t.id === b.type);
        if (type) {
          const block = {
            id: Date.now() + Math.random(),
            type: b.type, label: b.label, color: b.color, content: b.content
          };
          PromptForge.blocks.push(block);
          PromptForge.renderBlock(block);
          // Set textarea content
          const card = PromptForge.container.lastElementChild;
          if (card) {
            const textarea = card.querySelector('.block-card__input');
            if (textarea) {
              textarea.value = b.content;
              PromptForge.autoResize(textarea);
            }
          }
        }
      });
      PromptForge.updatePreview();
    }

    // Restore skill blocks
    if (this._savedSkillBlocks && this._savedSkillBlocks.length) {
      this._savedSkillBlocks.forEach(b => {
        const type = SkillForge.BLOCK_TYPES.find(t => t.id === b.type);
        if (type) {
          const block = {
            id: Date.now() + Math.random(),
            type: b.type, label: b.label, color: b.color, content: b.content
          };
          SkillForge.blocks.push(block);
          SkillForge.renderBlock(block);
          const card = SkillForge.container.lastElementChild;
          if (card) {
            const textarea = card.querySelector('.block-card__input');
            if (textarea) {
              textarea.value = b.content;
              SkillForge.autoResize(textarea);
            }
          }
        }
      });
      SkillForge.updatePreview();
    }

    // Update progress dots for completed modules
    this.state.completedModules.forEach(modId => {
      Curriculum.markDotCompleted(modId);
    });

    // Clean up temp references
    delete this._savedQuizState;
    delete this._savedPromptBlocks;
    delete this._savedSkillBlocks;
  },

  onModuleComplete(moduleId) {
    if (this.state.completedModules.includes(moduleId)) return;
    this.state.completedModules.push(moduleId);

    const unlock = this.UNLOCK_MAP[moduleId];
    if (!unlock) return;

    const newPrompt = unlock.prompt.filter(b => !this.state.unlockedPromptBlocks.includes(b));
    const newSkill = unlock.skill.filter(b => !this.state.unlockedSkillBlocks.includes(b));

    this.state.unlockedPromptBlocks.push(...newPrompt);
    this.state.unlockedSkillBlocks.push(...newSkill);

    PromptForge.onUnlock(newPrompt);
    SkillForge.onUnlock(newSkill);

    // Update progress dot
    Curriculum.markDotCompleted(moduleId);

    // Show unlock toast with bridge prompt
    const allNames = [...newPrompt, ...newSkill]
      .map(id => id.charAt(0).toUpperCase() + id.slice(1));
    if (allNames.length) {
      this.showToast(`Unlocked: ${allNames.join(', ')} — try them in the builder panel →`);
    }

    this.updateFinishButton();
    this.saveState();

    // If all modules done, show completion prompt
    if (this.state.completedModules.length >= MODULES.length) {
      setTimeout(() => {
        this.showToast('All modules complete! Click "Finish & Reveal" in the top bar to see your results.');
      }, 3500);
    }
  },

  updateFinishButton() {
    const btn = document.querySelector('.topbar__finish');
    if (this.state.completedModules.length >= MODULES.length) {
      btn.disabled = false;
      btn.classList.add('topbar__finish--ready');
    }
  },

  initPopoverToggles() {
    // Click-to-toggle for all sample-guide and review-guide popovers
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.sample-guide__trigger, .review-guide__trigger');
      if (trigger) {
        e.stopPropagation();
        const parent = trigger.closest('.sample-guide, .review-guide');
        const wasOpen = parent.classList.contains('sample-guide--open') || parent.classList.contains('review-guide--open');

        // Close all open popovers first
        this.closeAllPopovers();

        // Toggle the clicked one
        if (!wasOpen) {
          const cls = parent.classList.contains('sample-guide') ? 'sample-guide--open' : 'review-guide--open';
          parent.classList.add(cls);
        }
        return;
      }

      // If click is inside an open popover, don't close it
      if (e.target.closest('.sample-guide__popover, .review-guide__popover')) {
        return;
      }

      // Click outside — close all
      this.closeAllPopovers();
    });
  },

  closeAllPopovers() {
    document.querySelectorAll('.sample-guide--open').forEach(el => el.classList.remove('sample-guide--open'));
    document.querySelectorAll('.review-guide--open').forEach(el => el.classList.remove('review-guide--open'));
  },

  showToast(message) {
    const existing = document.querySelector('.unlock-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'unlock-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
  }
};

// Force page to load from the top — prevent browser scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  App.init();
});

// Some browsers restore scroll after DOMContentLoaded — catch it on load too
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});
