/* ===== THEMES & EFFECTS ===== */

const THEMES = {
  default: {
    '--key-bg': '#3a3a3a',
    '--key-border': '#555',
    '--key-text': '#f0f0f0',
    '--keybind-text': '#e8e8e8',
    '--key-hover': '#4a4a4a',
    '--key-edit': '#5a5a8a',
    '--bg': '#1e1e1e',
    '--header': '#2a2a2a'
  },
  crimson: {
    '--key-bg': '#3d2a2a',
    '--key-border': '#6b4040',
    '--key-text': '#f5e6e6',
    '--keybind-text': '#e8d8d8',
    '--key-hover': '#4d3535',
    '--key-edit': '#8a4a5a',
    '--bg': '#1a1212',
    '--header': '#2d1f1f'
  },
  ocean: {
    '--key-bg': '#2a323d',
    '--key-border': '#40556b',
    '--key-text': '#e6eef5',
    '--keybind-text': '#d8e2e8',
    '--key-hover': '#353d4d',
    '--key-edit': '#4a6a8a',
    '--bg': '#12181a',
    '--header': '#1f252d'
  },
  forest: {
    '--key-bg': '#2a3d2a',
    '--key-border': '#406b40',
    '--key-text': '#e6f5e6',
    '--keybind-text': '#d8e8d8',
    '--key-hover': '#354d35',
    '--key-edit': '#5a8a5a',
    '--bg': '#121a12',
    '--header': '#1f2d1f'
  },
  violet: {
    '--key-bg': '#322a3d',
    '--key-border': '#50406b',
    '--key-text': '#efe6f5',
    '--keybind-text': '#e0d8e8',
    '--key-hover': '#3d354d',
    '--key-edit': '#6a4a8a',
    '--bg': '#18121a',
    '--header': '#251f2d'
  },
  amber: {
    '--key-bg': '#3d352a',
    '--key-border': '#6b5a40',
    '--key-text': '#f5f0e6',
    '--keybind-text': '#e8e2d8',
    '--key-hover': '#4d4535',
    '--key-edit': '#8a7a4a',
    '--bg': '#1a1812',
    '--header': '#2d251f'
  },
  steel: {
    '--key-bg': '#2a3238',
    '--key-border': '#4a5a65',
    '--key-text': '#e8eef2',
    '--keybind-text': '#dce2e6',
    '--key-hover': '#353d45',
    '--key-edit': '#4a6a7a',
    '--bg': '#12161a',
    '--header': '#1f2528'
  },
  midnight: {
    '--key-bg': '#252830',
    '--key-border': '#3d4555',
    '--key-text': '#e8eaf0',
    '--keybind-text': '#dce0e8',
    '--key-hover': '#303540',
    '--key-edit': '#4a5568',
    '--bg': '#0e1014',
    '--header': '#181c22'
  },
  light: {
    '--key-bg': '#d8d8d8',
    '--key-border': '#999',
    '--key-text': '#1a1a1a',
    '--keybind-text': '#333',
    '--key-hover': '#c8c8c8',
    '--key-edit': '#7a9aca',
    '--bg': '#ececec',
    '--header': '#e0e0e0'
  }
};

function applyTheme(themeId) {
  var theme = THEMES[themeId] || THEMES.default;
  var root = document.documentElement;
  Object.keys(theme).forEach(function(key) {
    root.style.setProperty(key, theme[key]);
  });
  document.body.classList.toggle('theme-light', themeId === 'light');
  localStorage.setItem(THEME_STORAGE_KEY, themeId);
}

function initTheme() {
  var saved = localStorage.getItem(THEME_STORAGE_KEY);
  var themeId = THEMES[saved] ? saved : 'default';
  applyTheme(themeId);
  var sel = document.getElementById('theme-select');
  if (sel) sel.value = themeId;
}

var EFFECT_IDS = ['none', 'pulse', 'wave', 'breathe', 'rainbow'];

function applyEffect(effectId) {
  // Apply to all keyboard sections
  var keyboards = document.querySelectorAll('.keyboard');
  keyboards.forEach(function(kb) {
    EFFECT_IDS.forEach(function(id) { kb.classList.remove('effect-' + id); });
    if (effectId && effectId !== 'none') kb.classList.add('effect-' + effectId);
  });
  localStorage.setItem(EFFECT_STORAGE_KEY, effectId || 'none');
}

function initEffect() {
  var saved = localStorage.getItem(EFFECT_STORAGE_KEY);
  var effectId = EFFECT_IDS.indexOf(saved) >= 0 ? saved : 'none';
  applyEffect(effectId);
  var sel = document.getElementById('effect-select');
  if (sel) sel.value = effectId;
}
