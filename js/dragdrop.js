/* ===== DRAG AND DROP SWAP ===== */

function initDragDrop() {
  var dragSourceCode = null;

  document.querySelectorAll('.key[data-key]').forEach(function(keyEl) {
    if (keyEl.classList.contains('key-spacer')) return;

    keyEl.setAttribute('draggable', 'true');

    keyEl.addEventListener('dragstart', function(e) {
      dragSourceCode = keyEl.dataset.key;
      keyEl.classList.add('dragging');

      // Temporarily disable contenteditable during drag
      var keybindEl = keyEl.querySelector('.keybind');
      if (keybindEl) keybindEl.contentEditable = 'false';

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', dragSourceCode);
    });

    keyEl.addEventListener('dragend', function() {
      keyEl.classList.remove('dragging');
      // Re-enable contenteditable
      var keybindEl = keyEl.querySelector('.keybind');
      if (keybindEl) keybindEl.contentEditable = 'true';
      dragSourceCode = null;

      // Clean up all drag-over states
      document.querySelectorAll('.key.drag-over').forEach(function(el) {
        el.classList.remove('drag-over');
      });
    });

    keyEl.addEventListener('dragover', function(e) {
      if (!dragSourceCode || keyEl.dataset.key === dragSourceCode) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      keyEl.classList.add('drag-over');
    });

    keyEl.addEventListener('dragleave', function() {
      keyEl.classList.remove('drag-over');
    });

    keyEl.addEventListener('drop', function(e) {
      e.preventDefault();
      keyEl.classList.remove('drag-over');

      var targetCode = keyEl.dataset.key;
      if (!dragSourceCode || targetCode === dragSourceCode) return;

      // Swap entries in data
      var data = getProfileData();
      var sourceEntry = getKeyEntry(data, currentLayer, dragSourceCode);
      var targetEntry = getKeyEntry(data, currentLayer, targetCode);

      // Clone entries to avoid reference issues
      var sourceCopy = { label: sourceEntry.label, category: sourceEntry.category, description: sourceEntry.description };
      var targetCopy = { label: targetEntry.label, category: targetEntry.category, description: targetEntry.description };

      setKeyEntry(data, currentLayer, dragSourceCode, targetCopy);
      setKeyEntry(data, currentLayer, targetCode, sourceCopy);

      // Update DOM
      var sourceKeybind = document.querySelector('.key[data-key="' + dragSourceCode + '"] .keybind');
      var targetKeybind = keyEl.querySelector('.keybind');
      if (sourceKeybind) sourceKeybind.textContent = targetCopy.label;
      if (targetKeybind) targetKeybind.textContent = sourceCopy.label;

      saveToStorage(getCurrentKeybinds());
      applyCategoryColors();
      detectConflicts();
    });
  });
}
