/* ===== DATA MODEL & STORAGE ===== */

const STORAGE_KEY = 'masterKeybindChart';
const PROFILE_LIST_KEY = 'masterKeybindChartProfileList';
const CURRENT_PROFILE_KEY = 'masterKeybindChartCurrentProfile';
const SIZE_STORAGE_KEY = 'masterKeybindChartSize';
const THEME_STORAGE_KEY = 'masterKeybindChartTheme';
const EFFECT_STORAGE_KEY = 'masterKeybindChartEffect';
const LAYER_STORAGE_KEY = 'masterKeybindChartActiveLayer';

const DATA_VERSION = 2;
const LAYERS = ['base', 'ctrl', 'alt', 'shift'];
const DEFAULT_LAYER = 'base';

let currentLayer = DEFAULT_LAYER;

function profileStorageKey(name) {
  return 'masterKeybindChart_profile_' + name;
}

// Migrate v1 flat data { "KeyA": "label" } to v2 layered format
function migrateV1ToV2(flatData) {
  var base = {};
  Object.keys(flatData).forEach(function(code) {
    if (code === 'version' || code === 'layers' || code === 'categories') return;
    base[code] = {
      label: flatData[code] || '',
      category: null,
      description: ''
    };
  });
  return {
    version: DATA_VERSION,
    layers: {
      base: base,
      ctrl: {},
      alt: {},
      shift: {}
    },
    categories: {}
  };
}

// Ensure data is in v2 format
function ensureV2(data) {
  if (!data || typeof data !== 'object') {
    return { version: DATA_VERSION, layers: { base: {}, ctrl: {}, alt: {}, shift: {} }, categories: {} };
  }
  if (data.version === DATA_VERSION) return data;
  // v1 flat format
  return migrateV1ToV2(data);
}

// Get keybind entry for a key in the current layer
function getKeyEntry(data, layer, code) {
  if (!data.layers[layer] || !data.layers[layer][code]) {
    return { label: '', category: null, description: '' };
  }
  return data.layers[layer][code];
}

// Set keybind entry for a key in a layer
function setKeyEntry(data, layer, code, entry) {
  if (!data.layers[layer]) data.layers[layer] = {};
  data.layers[layer][code] = entry;
}

// Get just the label for display (convenience)
function getKeyLabel(data, layer, code) {
  return getKeyEntry(data, layer, code).label;
}
