// Prompt block builder logic
const PromptForge = {
  BLOCK_TYPES: [
    { id: 'role', label: 'Role', color: '#4d9de0' },
    { id: 'context', label: 'Context', color: '#b8a078' },
    { id: 'task', label: 'Task', color: '#e8913a' },
    { id: 'constraint', label: 'Constraint', color: '#e05555' },
    { id: 'example', label: 'Example', color: '#45b877' },
    { id: 'prefill', label: 'Prefill', color: '#38c9c9' },
    { id: 'think', label: 'Think', color: '#9b6dd7' },
    { id: 'format', label: 'Format', color: '#e0c445' },
    { id: 'chain', label: 'Chain', color: '#6678d0' },
    { id: 'tool', label: 'Tool', color: '#38bdd8' },
    { id: 'memory', label: 'Memory', color: '#6b9fc4' },
    { id: 'safety', label: 'Safety', color: '#e07088' }
  ],

  blocks: [],
  styledView: true,
  dragState: null,
  buttonEls: {},

  init() {
    this.container = document.getElementById('prompt-blocks-container');
    this.buttonsRow = document.getElementById('prompt-add-buttons');
    this.previewContent = document.getElementById('prompt-preview-content');
    this.previewToggle = document.getElementById('prompt-preview-toggle');

    this.renderAddButtons();
    this.bindPreviewToggle();
    this.bindExportActions();
    this.updatePreview();
  },

  renderAddButtons() {
    this.BLOCK_TYPES.forEach(type => {
      const btn = document.createElement('button');
      btn.className = 'add-block-btn add-block-btn--locked';
      btn.dataset.type = type.id;
      btn.style.setProperty('--block-color', type.color);
      btn.innerHTML = `<span class="add-block-btn__icon">&#x1F512;</span> ${type.label}`;
      btn.disabled = true;
      btn.addEventListener('click', () => {
        if (!btn.disabled) this.addBlock(type);
      });
      this.buttonsRow.appendChild(btn);
      this.buttonEls[type.id] = btn;
    });
  },

  onUnlock(blockIds) {
    if (!blockIds.length) return;

    blockIds.forEach(id => {
      const btn = this.buttonEls[id];
      if (!btn) return;
      btn.disabled = false;
      btn.classList.remove('add-block-btn--locked');
      btn.classList.add('add-block-btn--unlocking');

      const type = this.BLOCK_TYPES.find(t => t.id === id);
      btn.innerHTML = `<span class="add-block-btn__plus">+</span> ${type.label}`;

      // Remove animation class after it plays
      setTimeout(() => btn.classList.remove('add-block-btn--unlocking'), 600);
    });
  },

  addBlock(type) {
    const block = {
      id: Date.now() + Math.random(),
      type: type.id,
      label: type.label,
      color: type.color,
      content: ''
    };
    this.blocks.push(block);
    this.renderBlock(block);
    this.updatePreview();
    App.state.promptBlocks = this.blocks;
  },

  renderBlock(block) {
    const card = document.createElement('div');
    card.className = 'block-card';
    card.dataset.blockId = block.id;
    card.style.setProperty('--block-color', block.color);
    card.draggable = true;

    card.innerHTML = `
      <div class="block-card__handle" title="Drag to reorder">&#x2630;</div>
      <div class="block-card__body">
        <div class="block-card__label">${block.label}</div>
        <textarea class="block-card__input" placeholder="Type your ${block.label.toLowerCase()} here..." rows="2"></textarea>
      </div>
      <button class="block-card__delete" title="Remove block">&times;</button>
    `;

    const textarea = card.querySelector('.block-card__input');
    textarea.addEventListener('input', (e) => {
      block.content = e.target.value;
      this.autoResize(e.target);
      this.updatePreview();
      App.state.promptBlocks = this.blocks;
    });

    card.querySelector('.block-card__delete').addEventListener('click', () => {
      this.blocks = this.blocks.filter(b => b.id !== block.id);
      card.remove();
      this.updatePreview();
      App.state.promptBlocks = this.blocks;
    });

    // Drag events
    card.addEventListener('dragstart', (e) => {
      this.dragState = block.id;
      card.classList.add('block-card--dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('block-card--dragging');
      this.dragState = null;
      document.querySelectorAll('.block-card--drag-over').forEach(el =>
        el.classList.remove('block-card--drag-over'));
    });
    card.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (this.dragState && this.dragState !== block.id) {
        card.classList.add('block-card--drag-over');
      }
    });
    card.addEventListener('dragleave', () => {
      card.classList.remove('block-card--drag-over');
    });
    card.addEventListener('drop', (e) => {
      e.preventDefault();
      card.classList.remove('block-card--drag-over');
      if (!this.dragState || this.dragState === block.id) return;
      this.reorderBlocks(this.dragState, block.id);
    });

    this.container.appendChild(card);
    textarea.focus();
    this.autoResize(textarea);
  },

  reorderBlocks(draggedId, targetId) {
    const dragIdx = this.blocks.findIndex(b => b.id === draggedId);
    const targetIdx = this.blocks.findIndex(b => b.id === targetId);
    if (dragIdx === -1 || targetIdx === -1) return;

    const [dragged] = this.blocks.splice(dragIdx, 1);
    this.blocks.splice(targetIdx, 0, dragged);

    this.container.innerHTML = '';
    this.blocks.forEach(b => this.renderBlock(b));
    this.updatePreview();
    App.state.promptBlocks = this.blocks;
  },

  autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  },

  bindPreviewToggle() {
    this.previewToggle.addEventListener('click', () => {
      this.styledView = !this.styledView;
      this.previewToggle.textContent = this.styledView ? 'Raw' : 'Styled';
      this.updatePreview();
    });
  },

  updatePreview() {
    if (!this.blocks.length) {
      this.previewContent.innerHTML = '<span class="preview-pane__empty">Your assembled prompt will appear here as you add blocks...</span>';
      return;
    }

    if (this.styledView) {
      this.previewContent.innerHTML = this.blocks.map(b => {
        const content = this.escapeHtml(b.content) || '<em class="preview-pane__empty-block">empty</em>';
        return `<div class="preview-block" style="--block-color: ${b.color}">
          <span class="preview-block__label">${b.label}</span>
          <span class="preview-block__content">${content}</span>
        </div>`;
      }).join('');
    } else {
      const raw = this.blocks.map(b =>
        `[${b.label}]\n${b.content || '...'}`
      ).join('\n\n');
      this.previewContent.textContent = raw;
    }
  },

  getRawText() {
    return this.blocks.map(b =>
      `[${b.label}]\n${b.content || '...'}`
    ).join('\n\n');
  },

  bindExportActions() {
    document.getElementById('prompt-copy-btn').addEventListener('click', () => {
      const text = this.getRawText();
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        this.flashButton('prompt-copy-btn', 'Copied!');
      }).catch(() => {
        this.flashButton('prompt-copy-btn', 'Copy failed');
      });
    });

    document.getElementById('prompt-export-btn').addEventListener('click', () => {
      const text = this.getRawText();
      if (!text) return;
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'prompt.txt';
      a.click();
      URL.revokeObjectURL(url);
    });
  },

  flashButton(id, message) {
    const btn = document.getElementById(id);
    const original = btn.textContent;
    btn.textContent = message;
    btn.classList.add('btn--flash');
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('btn--flash');
    }, 1200);
  },

  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
};
