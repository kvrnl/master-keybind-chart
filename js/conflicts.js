/* ===== CONFLICT DETECTION ===== */

function detectConflicts() {
  var data = getProfileData();

  // Build map: for each key code, collect which layers have a non-empty label
  var conflictMap = {};

  LAYERS.forEach(function(layer) {
    var layerData = data.layers[layer] || {};
    Object.keys(layerData).forEach(function(code) {
      var label = (layerData[code].label || '').trim();
      if (!label) return;
      if (!conflictMap[code]) conflictMap[code] = [];
      conflictMap[code].push(layer);
    });
  });

  // Also detect same label on different keys within the same layer
  var labelMap = {};
  var layerData = data.layers[currentLayer] || {};
  Object.keys(layerData).forEach(function(code) {
    var label = (layerData[code].label || '').trim().toLowerCase();
    if (!label) return;
    if (!labelMap[label]) labelMap[label] = [];
    labelMap[label].push(code);
  });

  // Find duplicate labels (same label, different keys, same layer)
  var duplicateCodes = {};
  Object.keys(labelMap).forEach(function(label) {
    if (labelMap[label].length > 1) {
      labelMap[label].forEach(function(code) {
        duplicateCodes[code] = labelMap[label].filter(function(c) { return c !== code; });
      });
    }
  });

  // Apply conflict indicators to DOM
  document.querySelectorAll('.key[data-key]').forEach(function(keyEl) {
    var code = keyEl.dataset.key;
    var hasConflict = false;
    var conflictInfo = [];

    // Check cross-layer conflicts
    if (conflictMap[code] && conflictMap[code].length > 1) {
      hasConflict = true;
      var otherLayers = conflictMap[code].filter(function(l) { return l !== currentLayer; });
      if (otherLayers.length > 0) {
        conflictInfo.push('Also bound in: ' + otherLayers.join(', '));
      }
    }

    // Check duplicate label conflicts
    if (duplicateCodes[code]) {
      hasConflict = true;
      conflictInfo.push('Same label on: ' + duplicateCodes[code].join(', '));
    }

    keyEl.classList.toggle('has-conflict', hasConflict);

    // Add/remove badge
    var oldBadge = keyEl.querySelector('.conflict-badge');
    if (oldBadge) oldBadge.remove();

    if (hasConflict) {
      var badge = document.createElement('span');
      badge.className = 'conflict-badge';
      badge.textContent = '!';
      badge.title = conflictInfo.join('\n');
      keyEl.appendChild(badge);
    }
  });
}
