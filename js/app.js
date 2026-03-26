/* ===== APP INIT & EVENT WIRING ===== */

// ===== Core keybind read/write (layer-aware) =====

var _profileData = null;
var _selectedKeyCode = null;

function getProfileData() {
  if (!_profileData) _profileData = loadFromStorage();
  return _profileData;
}

function setProfileData(data) {
  _profileData = data;
}

function getCurrentKeybinds() {
  var data = getProfileData();
  document.querySelectorAll('.key[data-key]').forEach(function(keyEl) {
    var code = keyEl.dataset.key;
    var keybindEl = keyEl.querySelector('.keybind');
    if (code && keybindEl) {
      var label = keybindEl.textContent.trim();
      var existing = getKeyEntry(data, currentLayer, code);
      setKeyEntry(data, currentLayer, code, {
        label: label,
        category: existing.category,
        description: existing.description
      });
    }
  });
  return data;
}

function applyKeybinds(data) {
  data = ensureV2(data);
  setProfileData(data);
  document.querySelectorAll('.key[data-key]').forEach(function(keyEl) {
    var code = keyEl.dataset.key;
    var keybindEl = keyEl.querySelector('.keybind');
    if (code && keybindEl) {
      keybindEl.textContent = getKeyLabel(data, currentLayer, code);
    }
  });
}

function clearOneKey(keyEl) {
  var keybindEl = keyEl && keyEl.querySelector('.keybind');
  if (keybindEl) {
    keybindEl.textContent = '';
    var code = keyEl.dataset.key;
    if (code) {
      var data = getProfileData();
      var entry = getKeyEntry(data, currentLayer, code);
      entry.label = '';
      entry.category = null;
      entry.description = '';
      setKeyEntry(data, currentLayer, code, entry);
    }
    saveToStorage(getCurrentKeybinds());
    applyCategoryColors();
    updateCategoryLegend();
    detectConflicts();
    if (code === _selectedKeyCode) openKeyEditor(code);
  }
}

// ===== Size controls =====

var SIZE_MIN = 50;
var SIZE_MAX = 100;
var SIZE_STEP = 4;
var SIZE_DEFAULT = 80;

function getStoredSize() {
  var n = parseInt(localStorage.getItem(SIZE_STORAGE_KEY), 10);
  return (isNaN(n) || n < SIZE_MIN || n > SIZE_MAX) ? SIZE_DEFAULT : n;
}

function applySize(keyU) {
  keyU = Math.max(SIZE_MIN, Math.min(SIZE_MAX, keyU));
  var scale = keyU / SIZE_DEFAULT;
  var gap = Math.round(scale * 12 * 10) / 10;
  var wrapperGap = Math.round(scale * 24);
  var padding = Math.round(scale * 20);
  var keyPadV = Math.round(scale * 8);
  var keyPadH = Math.round(scale * 10);
  var keyCapFont = Math.round(scale * 13);
  var keyCapMargin = Math.round(scale * 2);
  var keybindFont = Math.round(scale * 13 * 10) / 10;
  var keybindMaxHeight = Math.round(scale * 13 * 1.3 * 2 * 10) / 10;
  document.documentElement.style.setProperty('--key-u', keyU + 'px');
  document.documentElement.style.setProperty('--key-gap', gap + 'px');
  document.documentElement.style.setProperty('--wrapper-gap', wrapperGap + 'px');
  document.documentElement.style.setProperty('--keyboard-padding', padding + 'px');
  document.documentElement.style.setProperty('--key-padding-v', keyPadV + 'px');
  document.documentElement.style.setProperty('--key-padding-h', keyPadH + 'px');
  document.documentElement.style.setProperty('--key-cap-font', keyCapFont + 'px');
  document.documentElement.style.setProperty('--key-cap-margin', keyCapMargin + 'px');
  document.documentElement.style.setProperty('--keybind-font', keybindFont + 'px');
  document.documentElement.style.setProperty('--keybind-max-height', keybindMaxHeight + 'px');
  document.getElementById('size-minus').disabled = keyU <= SIZE_MIN;
  document.getElementById('size-plus').disabled = keyU >= SIZE_MAX;
  // Update size label
  var sizeVal = document.getElementById('size-value');
  if (sizeVal) sizeVal.textContent = Math.round((keyU / SIZE_DEFAULT) * 100) + '%';
  localStorage.setItem(SIZE_STORAGE_KEY, String(keyU));
}

function initSize() {
  applySize(getStoredSize());
}

// ===== Key editor panel =====

function openKeyEditor(code) {
  var editorBody = document.getElementById('editor-body');
  var editorTitle = document.getElementById('editor-key-name');
  var labelInput = document.getElementById('editor-label');
  var descInput = document.getElementById('editor-desc');
  var catSelect = document.getElementById('editor-category');

  if (!code) {
    editorBody.style.display = 'none';
    editorTitle.textContent = 'Click a key to edit';
    _selectedKeyCode = null;
    // Remove selected state from all keys
    document.querySelectorAll('.key.selected').forEach(function(k) { k.classList.remove('selected'); });
    return;
  }

  _selectedKeyCode = code;
  var data = getProfileData();
  var entry = getKeyEntry(data, currentLayer, code);

  // Find the key cap label for this code
  var keyEl = document.querySelector('.key[data-key="' + code + '"]');
  var capLabel = keyEl ? keyEl.querySelector('.key-cap').textContent : code;

  editorTitle.textContent = capLabel + ' Key';
  editorBody.style.display = '';
  labelInput.value = entry.label || '';
  descInput.value = entry.description || '';

  // Populate category dropdown
  var cats = data.categories || {};
  catSelect.innerHTML = '<option value="">None</option>';
  Object.keys(cats).forEach(function(name) {
    var opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    if (entry.category === name) opt.selected = true;
    catSelect.appendChild(opt);
  });

  // Highlight selected key
  document.querySelectorAll('.key.selected').forEach(function(k) { k.classList.remove('selected'); });
  if (keyEl) keyEl.classList.add('selected');
}

function syncEditorToData() {
  if (!_selectedKeyCode) return;
  var data = getProfileData();
  var entry = getKeyEntry(data, currentLayer, _selectedKeyCode);
  var labelInput = document.getElementById('editor-label');
  var descInput = document.getElementById('editor-desc');
  var catSelect = document.getElementById('editor-category');

  entry.label = (labelInput.value || '').slice(0, KEYBIND_MAX_CHARS);
  entry.description = descInput.value || '';
  entry.category = catSelect.value || null;
  setKeyEntry(data, currentLayer, _selectedKeyCode, entry);

  // Sync label back to key on keyboard
  var keyEl = document.querySelector('.key[data-key="' + _selectedKeyCode + '"]');
  if (keyEl) {
    var keybindEl = keyEl.querySelector('.keybind');
    if (keybindEl) keybindEl.textContent = entry.label;
  }

  saveToStorage(getCurrentKeybinds());
  applyCategoryColors();
  updateCategoryLegend();
  detectConflicts();
}

// ===== Category legend =====

function updateCategoryLegend() {
  var legend = document.getElementById('category-legend');
  if (!legend) return;
  legend.innerHTML = '';

  var data = getProfileData();
  var cats = data.categories || {};
  var catNames = Object.keys(cats);
  if (catNames.length === 0) return;

  catNames.forEach(function(name) {
    var item = document.createElement('div');
    item.className = 'legend-item';
    var swatch = document.createElement('span');
    swatch.className = 'legend-swatch';
    swatch.style.background = cats[name];
    var label = document.createElement('span');
    label.textContent = name;
    item.appendChild(swatch);
    item.appendChild(label);
    legend.appendChild(item);
  });
}

// ===== Edit handlers =====

function setupEditHandlers() {
  function preventScroll(el) {
    el.scrollTop = 0;
    el.scrollLeft = 0;
  }
  document.querySelectorAll('.key .keybind').forEach(function(keybindEl) {
    keybindEl.addEventListener('focus', function() { keybindEl.closest('.key').classList.add('editing'); });
    keybindEl.addEventListener('blur', function() {
      keybindEl.closest('.key').classList.remove('editing');
      saveToStorage(getCurrentKeybinds());
      if (typeof detectConflicts === 'function') detectConflicts();
      // Sync editor if this key is selected
      var keyEl = keybindEl.closest('.key');
      if (keyEl && keyEl.dataset.key === _selectedKeyCode) {
        openKeyEditor(_selectedKeyCode);
      }
    });
    keybindEl.addEventListener('input', function() {
      var keyEl = keybindEl.closest('.key');
      var code = keyEl && keyEl.dataset.key;
      var maxChars = code && F_ROW_CODES[code] ? KEYBIND_MAX_CHARS_FROW : KEYBIND_MAX_CHARS;
      var text = keybindEl.textContent;
      if (text.length > maxChars) {
        keybindEl.textContent = text.slice(0, maxChars);
        var node = keybindEl.firstChild;
        if (node) {
          var range = document.createRange();
          range.setStart(node, maxChars);
          range.collapse(true);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
      showSaveStatus('saving');
      preventScroll(keybindEl);
    });
    keybindEl.addEventListener('scroll', function() { preventScroll(keybindEl); }, true);
    keybindEl.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') keybindEl.blur();
    });
  });
}

// ===== Import / Export =====

function exportJson() {
  var data = getCurrentKeybinds();
  var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'keybinds.json';
  a.click();
  URL.revokeObjectURL(a.href);
}

function importJson(file) {
  var reader = new FileReader();
  reader.onload = function() {
    try {
      var raw = JSON.parse(reader.result);
      var data = ensureV2(raw);
      applyKeybinds(data);
      saveToStorage(getCurrentKeybinds());
      applyCategoryColors();
      updateCategoryLegend();
      detectConflicts();
    } catch (_) {
      alert('Invalid JSON file.');
    }
  };
  reader.readAsText(file);
}

// ===== Tools dropdown helper (no-op now, sidebar-based) =====

function closeToolsDropdown() {
  // Legacy compat — tools are now in sidebar, nothing to close
}

// ===== Init =====

(function init() {
  // Render all keyboard sections
  renderKeyboard('main-keyboard', mainKeys);
  renderKeyboard('nav-keyboard', navKeys);
  renderKeyboard('numpad-keyboard', numpadKeys);

  // Init size, theme, effect
  initSize();
  initTheme();
  initEffect();

  // Load profile and apply
  ensureProfilesExist();
  applyKeybinds(loadFromStorage());
  refreshProfileDropdown();
  setupEditHandlers();

  // ===== Sidebar toggle =====
  (function initSidebar() {
    var toggle = document.getElementById('sidebar-toggle');
    var sidebar = document.getElementById('sidebar');
    var saved = localStorage.getItem('masterKeybindChartSidebarCollapsed');
    if (saved === 'true') sidebar.classList.add('collapsed');

    toggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      localStorage.setItem('masterKeybindChartSidebarCollapsed', sidebar.classList.contains('collapsed'));
    });
  })();

  // ===== Key editor panel =====
  (function initKeyEditor() {
    var labelInput = document.getElementById('editor-label');
    var descInput = document.getElementById('editor-desc');
    var catSelect = document.getElementById('editor-category');
    var closeBtn = document.getElementById('editor-close');

    // Click a key to select and open editor
    document.querySelector('.keyboard-wrapper').addEventListener('click', function(e) {
      // Don't interfere with clear button
      if (e.target.closest('.key-clear-btn')) return;
      var keyEl = e.target.closest('.key[data-key]');
      if (!keyEl || keyEl.classList.contains('key-spacer')) return;
      openKeyEditor(keyEl.dataset.key);
    });

    // Editor inputs sync to data
    labelInput.addEventListener('input', syncEditorToData);
    descInput.addEventListener('input', syncEditorToData);
    catSelect.addEventListener('change', syncEditorToData);

    closeBtn.addEventListener('click', function() {
      openKeyEditor(null);
    });
  })();

  // ===== Event listeners =====

  window.addEventListener('pageshow', function(ev) {
    if (!ev.persisted) return;
    initSize();
    initTheme();
    initEffect();
  });

  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') saveToStorage(getCurrentKeybinds());
  });

  window.addEventListener('beforeunload', function() { saveToStorage(getCurrentKeybinds()); });

  // Theme & effect selects
  document.getElementById('theme-select').addEventListener('change', function() { applyTheme(this.value); });
  document.getElementById('effect-select').addEventListener('change', function() { applyEffect(this.value); });

  // Size controls
  document.getElementById('size-minus').addEventListener('click', function() { applySize(getStoredSize() - SIZE_STEP); });
  document.getElementById('size-plus').addEventListener('click', function() { applySize(getStoredSize() + SIZE_STEP); });

  // Profile select
  document.getElementById('profile-select').addEventListener('change', function() {
    var v = this.value;
    if (v === '__new__') {
      var name = prompt('Profile name (e.g. game or app):');
      if (name) createProfile(name);
      refreshProfileDropdown();
    } else {
      switchProfile(v);
    }
  });

  // Key clear buttons (delegated)
  document.querySelector('.keyboard-wrapper').addEventListener('click', function(e) {
    var btn = e.target.closest('.key-clear-btn');
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      var keyEl = btn.closest('.key');
      if (keyEl && keyEl.dataset.key) clearOneKey(keyEl);
    }
  });

  // Context menu
  (function keyContextMenu() {
    var menu = document.getElementById('key-context-menu');
    var clearItem = document.getElementById('key-context-clear');

    document.querySelector('.keyboard-wrapper').addEventListener('contextmenu', function(e) {
      var keyEl = e.target.closest('.key[data-key]');
      if (!keyEl || keyEl.classList.contains('key-spacer')) return;
      e.preventDefault();
      window._contextKeyEl = keyEl;
      menu.style.left = e.clientX + 'px';
      menu.style.top = e.clientY + 'px';
      menu.classList.add('visible');
    });

    clearItem.addEventListener('click', function() {
      if (window._contextKeyEl) clearOneKey(window._contextKeyEl);
      menu.classList.remove('visible');
      window._contextKeyEl = null;
    });

    document.addEventListener('click', function() {
      menu.classList.remove('visible');
      window._contextKeyEl = null;
    });
  })();

  // Master clear
  (function() {
    var confirmEl = document.getElementById('clear-confirm');
    document.getElementById('master-clear-btn').addEventListener('click', function() {
      confirmEl.classList.add('visible');
    });
    document.getElementById('clear-yes').addEventListener('click', function() {
      confirmEl.classList.remove('visible');
      var data = getProfileData();
      data.layers[currentLayer] = {};
      applyKeybinds(data);
      saveToStorage(getCurrentKeybinds());
      applyCategoryColors();
      updateCategoryLegend();
      detectConflicts();
      showSaveStatus('saved');
      openKeyEditor(null);
    });
    document.getElementById('clear-no').addEventListener('click', function() {
      confirmEl.classList.remove('visible');
    });
  })();

  // Export / Import
  document.getElementById('export-btn').addEventListener('click', exportJson);
  document.getElementById('import-btn').addEventListener('click', function() {
    document.getElementById('import-file').click();
  });
  document.getElementById('import-file').addEventListener('change', function(e) {
    var file = e.target.files[0];
    if (file) importJson(file);
    e.target.value = '';
  });

  // Share
  document.getElementById('share-btn').addEventListener('click', function() {
    var data = getCurrentKeybinds();
    var url = location.origin + location.pathname + '?keybinds=' + encodeURIComponent(JSON.stringify(data));
    navigator.clipboard.writeText(url).then(function() {
      showSaveStatus('saved');
      var el = document.getElementById('save-status');
      if (el) { el.textContent = 'Link copied!'; el.className = 'save-status saved'; }
    }).catch(function() {
      prompt('Copy this share link:', url);
    });
  });

  // Init all features
  initLayers();
  initCategories();
  initTooltips();
  initSearch();
  initDragDrop();
  initHeatmap();
  initPrint();
  initPresets();

  // Apply feature visuals on first load
  applyCategoryColors();
  refreshCategoryContextMenu();
  updateCategoryLegend();
  detectConflicts();

  // Load from share URL
  (function loadFromShareUrl() {
    var params = new URLSearchParams(location.search);
    var keybindsParam = params.get('keybinds');
    if (!keybindsParam) return;
    try {
      var raw = JSON.parse(decodeURIComponent(keybindsParam));
      var data = ensureV2(raw);
      applyKeybinds(data);
      saveToStorage(getCurrentKeybinds());
      applyCategoryColors();
      updateCategoryLegend();
      if (history.replaceState) history.replaceState(null, '', location.pathname);
    } catch (_) {}
  })();

  // Live reload (dev only)
  (function liveReload() {
    if (location.protocol !== 'http:' && location.protocol !== 'https:') return;
    var url = location.href.split('?')[0];
    var originalHtml = null;
    fetch(url + '?t=' + Date.now(), { cache: 'no-store' }).then(function(r) { return r.text(); }).then(function(html) {
      originalHtml = html;
      setInterval(function() {
        fetch(url + '?t=' + Date.now(), { cache: 'no-store' }).then(function(r) { return r.text(); }).then(function(html) {
          if (originalHtml !== null && html !== originalHtml) location.reload();
        }).catch(function() {});
      }, 2000);
    }).catch(function() {});
  })();
})();
