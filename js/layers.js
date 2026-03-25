/* ===== MODIFIER COMBO LAYERS ===== */

function initLayers() {
  var bar = document.getElementById('layer-bar');
  if (!bar) return;

  var buttons = bar.querySelectorAll('.layer-btn');

  // Restore saved layer
  var saved = localStorage.getItem(LAYER_STORAGE_KEY);
  if (saved && LAYERS.indexOf(saved) >= 0) {
    currentLayer = saved;
  }

  // Set initial active state
  buttons.forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.layer === currentLayer);
  });

  // Update layer indicator text
  updateLayerIndicator();

  bar.addEventListener('click', function(e) {
    var btn = e.target.closest('.layer-btn');
    if (!btn) return;
    var newLayer = btn.dataset.layer;
    if (newLayer === currentLayer) return;

    // Save current layer's DOM state before switching
    saveToStorage(getCurrentKeybinds());

    // Switch layer
    currentLayer = newLayer;
    localStorage.setItem(LAYER_STORAGE_KEY, newLayer);

    // Update button states
    buttons.forEach(function(b) {
      b.classList.toggle('active', b.dataset.layer === newLayer);
    });

    // Reload keybinds for new layer
    applyKeybinds(loadFromStorage());
    updateLayerIndicator();
  });
}

function updateLayerIndicator() {
  var indicator = document.getElementById('layer-indicator');
  if (!indicator) return;
  if (currentLayer === 'base') {
    indicator.textContent = '';
    indicator.style.display = 'none';
  } else {
    var prefix = currentLayer.charAt(0).toUpperCase() + currentLayer.slice(1) + '+';
    indicator.textContent = prefix;
    indicator.style.display = '';
  }
}
