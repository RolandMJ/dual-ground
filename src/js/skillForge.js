// SKILL.md block builder logic
const SkillForge = {
  BLOCK_TYPES: [
    { id: 'name', label: 'Name', color: '#d4a54a' },
    { id: 'description', label: 'Description', color: '#c49840' },
    { id: 'trigger', label: 'Trigger', color: '#e0b85a' },
    { id: 'steps', label: 'Steps', color: '#b08a3a' },
    { id: 'notes', label: 'Notes', color: '#ecc96a' }
  ],

  blocks: [],
  styledView: true,
  dragState: null,

  init() {
    this.container = document.getElementById('skill-blocks-container');
    this.buttonsRow = document.getElementById('skill-add-buttons');
    this.previewContent = document.getElementById('skill-preview-content');
    this.previewToggle = document.getElementById('skill-preview-toggle');

    this.renderAddButtons();
    this.bindPreviewToggle();
    this.bindExportActions();
    this.updatePreview();
  },

  renderAddButtons() {
    this.BLOCK_TYPES.forEach(type => {
      const btn = document.createElement('button');
      btn.className = 'add-block-btn add-block-btn--skill';
      btn.dataset.type = type.id;
      btn.style.setProperty('--block-color', type.color);
      btn.innerHTML = `<span class="add-block-btn__plus">+</span> ${type.label}`;
      btn.addEventListener('click', () => this.addBlock(type));
      this.buttonsRow.appendChild(btn);
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
    App.state.skillBlocks = this.blocks;
  },

  renderBlock(block) {
    const card = document.createElement('div');
    card.className = 'block-card block-card--skill';
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
      App.state.skillBlocks = this.blocks;
    });

    card.querySelector('.block-card__delete').addEventListener('click', () => {
      this.blocks = this.blocks.filter(b => b.id !== block.id);
      card.remove();
      this.updatePreview();
      App.state.skillBlocks = this.blocks;
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
    App.state.skillBlocks = this.blocks;
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
      this.previewContent.innerHTML = '<span class="preview-pane__empty">Your SKILL.md file will preview here as you build it...</span>';
      return;
    }

    if (this.styledView) {
      this.previewContent.innerHTML = this.blocks.map(b => {
        const content = this.escapeHtml(b.content) || '<em class="preview-pane__empty-block">empty</em>';
        return `<div class="preview-block preview-block--skill" style="--block-color: ${b.color}">
          <span class="preview-block__label">${b.label}</span>
          <span class="preview-block__content">${content}</span>
        </div>`;
      }).join('');
    } else {
      const raw = this.getMarkdown();
      this.previewContent.textContent = raw;
    }
  },

  getMarkdown() {
    return this.blocks.map(b => {
      const heading = `## ${b.label}`;
      const content = b.content || '...';
      return `${heading}\n${content}`;
    }).join('\n\n');
  },

  bindExportActions() {
    document.getElementById('skill-copy-btn').addEventListener('click', () => {
      const text = this.getMarkdown();
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        this.flashButton('skill-copy-btn', 'Copied!');
      });
    });

    document.getElementById('skill-export-btn').addEventListener('click', () => {
      const text = this.getMarkdown();
      if (!text) return;
      const blob = new Blob([`# SKILL.md\n\n${text}`], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'SKILL.md';
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
