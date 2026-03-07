// Main initialisation and state management
const App = {
  state: {
    currentModule: 1,
    completedModules: [],
    unlockedBlocks: [],
    promptBlocks: [],
    skillBlocks: []
  },

  init() {
    Curriculum.init();
    PromptForge.init();
    SkillForge.init();
    Output.init();
    console.log('Dual Ground initialised');
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
