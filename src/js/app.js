// Main initialisation and state management
const App = {
  state: {
    currentModule: 1,
    completedModules: [],
    unlockedPromptBlocks: [],
    unlockedSkillBlocks: [],
    promptBlocks: [],
    skillBlocks: []
  },

  // Module -> block unlock mapping
  UNLOCK_MAP: {
    1: { prompt: ['role', 'context'], skill: ['name'] },
    2: { prompt: ['task', 'constraint'], skill: ['description'] },
    3: { prompt: ['example', 'prefill'], skill: ['trigger'] },
    4: { prompt: ['format', 'think'], skill: ['steps'] },
    5: { prompt: ['chain', 'tool'], skill: ['notes'] },
    6: { prompt: ['memory', 'safety'], skill: [] }
  },

  init() {
    Curriculum.init();
    PromptForge.init();
    SkillForge.init();
    Output.init();
    this.updateFinishButton();
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

    // Show unlock toast
    const allNames = [...newPrompt, ...newSkill]
      .map(id => id.charAt(0).toUpperCase() + id.slice(1));
    if (allNames.length) {
      this.showToast(`Unlocked: ${allNames.join(', ')}`);
    }

    this.updateFinishButton();
  },

  updateFinishButton() {
    const btn = document.querySelector('.topbar__finish');
    if (this.state.completedModules.length >= MODULES.length) {
      btn.disabled = false;
      btn.classList.add('topbar__finish--ready');
    }
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

document.addEventListener('DOMContentLoaded', () => App.init());
