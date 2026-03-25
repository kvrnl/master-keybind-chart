/* ===== PRINT / SCREENSHOT MODE ===== */

function initPrint() {
  var toolBtn = document.getElementById('tool-print');
  var exitBtn = document.getElementById('print-exit');
  if (!toolBtn) return;

  toolBtn.addEventListener('click', function() {
    closeToolsDropdown();
    enterPrintMode();
  });

  if (exitBtn) {
    exitBtn.addEventListener('click', exitPrintMode);
  }

  // Escape to exit print mode
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.body.classList.contains('print-mode')) {
      exitPrintMode();
    }
  });
}

function enterPrintMode() {
  document.body.classList.add('print-mode');
  buildPrintLegend();

  // Disable all contenteditable
  document.querySelectorAll('.keybind').forEach(function(el) {
    el.contentEditable = 'false';
  });
}

function exitPrintMode() {
  document.body.classList.remove('print-mode');

  // Re-enable contenteditable
  document.querySelectorAll('.keybind').forEach(function(el) {
    el.contentEditable = 'true';
  });
}

function buildPrintLegend() {
  var legend = document.getElementById('print-legend');
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
