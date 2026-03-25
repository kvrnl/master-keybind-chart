/* ===== TOOLTIP DESCRIPTIONS ===== */

function initTooltips() {
  var tooltip = document.getElementById('key-tooltip');
  var labelEl = document.getElementById('tooltip-label');
  var descEl = document.getElementById('tooltip-desc');
  var catEl = document.getElementById('tooltip-category');
  if (!tooltip) return;

  var hideTimer = null;

  document.querySelector('.keyboard-wrapper').addEventListener('mouseover', function(e) {
    var keyEl = e.target.closest('.key[data-key]');
    if (!keyEl || keyEl.classList.contains('key-spacer')) {
      return;
    }

    clearTimeout(hideTimer);

    var code = keyEl.dataset.key;
    var data = getProfileData();
    var entry = getKeyEntry(data, currentLayer, code);

    // Only show tooltip if there's a description or category
    if (!entry.description && !entry.category) {
      tooltip.classList.remove('visible');
      return;
    }

    labelEl.textContent = entry.label || code;
    descEl.textContent = entry.description || '';
    descEl.style.display = entry.description ? '' : 'none';

    if (entry.category) {
      var cats = data.categories || {};
      catEl.textContent = entry.category;
      catEl.style.display = '';
      if (cats[entry.category]) {
        catEl.style.color = cats[entry.category];
      } else {
        catEl.style.color = '';
      }
    } else {
      catEl.style.display = 'none';
    }

    // Position tooltip below the key
    var rect = keyEl.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.bottom + 8) + 'px';
    tooltip.classList.add('visible');
  });

  document.querySelector('.keyboard-wrapper').addEventListener('mouseout', function(e) {
    var keyEl = e.target.closest('.key[data-key]');
    if (!keyEl) return;
    hideTimer = setTimeout(function() {
      tooltip.classList.remove('visible');
    }, 100);
  });

  // Add "Edit description" to context menu
  addDescriptionContextMenuItem();
}

function addDescriptionContextMenuItem() {
  var menu = document.getElementById('key-context-menu');
  var clearBtn = document.getElementById('key-context-clear');
  if (!menu || !clearBtn) return;

  var descBtn = document.createElement('button');
  descBtn.type = 'button';
  descBtn.role = 'menuitem';
  descBtn.textContent = 'Edit description\u2026';
  descBtn.id = 'key-context-desc';

  // Insert after clear button
  clearBtn.after(descBtn);

  descBtn.addEventListener('click', function() {
    menu.classList.remove('visible');
    if (!window._contextKeyEl) return;

    var code = window._contextKeyEl.dataset.key;
    var data = getProfileData();
    var entry = getKeyEntry(data, currentLayer, code);
    var newDesc = prompt('Description for ' + (entry.label || code) + ':', entry.description || '');

    if (newDesc !== null) {
      entry.description = newDesc;
      setKeyEntry(data, currentLayer, code, entry);
      saveToStorage(getCurrentKeybinds());
    }
  });
}
