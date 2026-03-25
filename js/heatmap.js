/* ===== HEATMAP MODE ===== */

var heatmapActive = false;

function initHeatmap() {
  var toolBtn = document.getElementById('tool-heatmap');
  if (!toolBtn) return;

  toolBtn.addEventListener('click', function() {
    closeToolsDropdown();
    toggleHeatmap();
  });
}

function toggleHeatmap() {
  heatmapActive = !heatmapActive;
  document.body.classList.toggle('heatmap-active', heatmapActive);

  var toolBtn = document.getElementById('tool-heatmap');
  if (toolBtn) toolBtn.classList.toggle('active', heatmapActive);

  if (heatmapActive) {
    applyHeatmap();
  } else {
    clearHeatmap();
  }
}

function buildHeatmapData() {
  var counts = {};
  var maxCount = 0;
  var profileList = getProfileList();

  profileList.forEach(function(profileName) {
    try {
      var raw = localStorage.getItem(profileStorageKey(profileName));
      var data = raw ? ensureV2(JSON.parse(raw)) : ensureV2({});

      LAYERS.forEach(function(layer) {
        var layerData = data.layers[layer] || {};
        Object.keys(layerData).forEach(function(code) {
          var label = (layerData[code].label || '').trim();
          if (!label) return;
          counts[code] = (counts[code] || 0) + 1;
          if (counts[code] > maxCount) maxCount = counts[code];
        });
      });
    } catch (_) {}
  });

  return { counts: counts, max: maxCount };
}

function applyHeatmap() {
  var heatData = buildHeatmapData();
  if (heatData.max === 0) heatData.max = 1; // Prevent division by zero

  document.querySelectorAll('.key[data-key]').forEach(function(keyEl) {
    var code = keyEl.dataset.key;
    var count = heatData.counts[code] || 0;
    var intensity = count / heatData.max;

    // HSL: 240 (blue/cold) -> 0 (red/hot)
    var hue = Math.round(240 * (1 - intensity));
    var lightness = 15 + Math.round(intensity * 35);
    var saturation = 20 + Math.round(intensity * 60);

    if (count === 0) {
      keyEl.style.background = 'rgba(30, 30, 30, 0.6)';
      keyEl.style.opacity = '0.3';
    } else {
      keyEl.style.background = 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
      keyEl.style.opacity = '';
    }
  });
}

function clearHeatmap() {
  document.querySelectorAll('.key[data-key]').forEach(function(keyEl) {
    keyEl.style.background = '';
    keyEl.style.opacity = '';
  });
}
