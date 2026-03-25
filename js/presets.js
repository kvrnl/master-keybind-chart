/* ===== GAME/APP PRESETS ===== */

var PRESETS = {
  'FiveM (GTA V)': {
    categories: {
      'Movement': '#4CAF50',
      'Combat': '#f44336',
      'Vehicle': '#FF9800',
      'UI': '#2196F3',
      'Comms': '#9C27B0'
    },
    layers: {
      base: {
        KeyW: { label: 'Forward', category: 'Movement', description: 'Move forward / Accelerate' },
        KeyA: { label: 'Left', category: 'Movement', description: 'Move left / Steer left' },
        KeyS: { label: 'Back', category: 'Movement', description: 'Move backward / Brake/Reverse' },
        KeyD: { label: 'Right', category: 'Movement', description: 'Move right / Steer right' },
        Space: { label: 'Jump/Brake', category: 'Movement', description: 'Jump on foot / Handbrake in vehicle' },
        ShiftLeft: { label: 'Sprint', category: 'Movement', description: 'Sprint / Boost (vehicle)' },
        ControlLeft: { label: 'Crouch', category: 'Movement', description: 'Crouch / Duck in vehicle' },
        KeyQ: { label: 'Cover', category: 'Combat', description: 'Take cover behind objects' },
        KeyR: { label: 'Reload', category: 'Combat', description: 'Reload weapon' },
        KeyG: { label: 'Grenade', category: 'Combat', description: 'Throw grenade' },
        KeyE: { label: 'Enter', category: 'Vehicle', description: 'Enter/exit vehicle' },
        KeyF: { label: 'Interact', category: 'UI', description: 'Secondary interact / Melee' },
        KeyT: { label: 'Chat', category: 'Comms', description: 'Open text chat' },
        KeyY: { label: 'Team Chat', category: 'Comms', description: 'Open team text chat' },
        KeyN: { label: 'Push Talk', category: 'Comms', description: 'Push to talk voice chat' },
        KeyZ: { label: 'Radio', category: 'Comms', description: 'Toggle radio' },
        Tab: { label: 'Weapon', category: 'Combat', description: 'Weapon wheel' },
        KeyM: { label: 'Map', category: 'UI', description: 'Open interaction menu / Map' },
        KeyX: { label: 'Dive/Drop', category: 'Movement', description: 'Dive / Drop weapon' },
        KeyH: { label: 'Headlights', category: 'Vehicle', description: 'Toggle headlights' },
        KeyL: { label: 'Lock', category: 'Vehicle', description: 'Lock/unlock vehicle' },
        KeyI: { label: 'Inventory', category: 'UI', description: 'Open inventory' },
        KeyP: { label: 'Phone', category: 'UI', description: 'Open phone' },
        KeyB: { label: 'Point', category: 'Comms', description: 'Point finger' },
        F1: { label: 'Menu', category: 'UI', description: 'Radial / Main menu' },
        F2: { label: 'Emotes', category: 'UI', description: 'Emote menu' },
        F3: { label: 'Anim', category: 'UI', description: 'Animation menu' },
        F5: { label: 'Garage', category: 'Vehicle', description: 'Open garage' },
        F6: { label: 'Job', category: 'UI', description: 'Job menu' },
        Escape: { label: 'Pause', category: 'UI', description: 'Pause menu' }
      },
      ctrl: {},
      alt: {},
      shift: {}
    }
  },

  'Valorant': {
    categories: {
      'Movement': '#4CAF50',
      'Combat': '#f44336',
      'Abilities': '#FF9800',
      'UI': '#2196F3',
      'Comms': '#9C27B0'
    },
    layers: {
      base: {
        KeyW: { label: 'Forward', category: 'Movement', description: 'Move forward' },
        KeyA: { label: 'Left', category: 'Movement', description: 'Strafe left' },
        KeyS: { label: 'Back', category: 'Movement', description: 'Move backward' },
        KeyD: { label: 'Right', category: 'Movement', description: 'Strafe right' },
        Space: { label: 'Jump', category: 'Movement', description: 'Jump' },
        ShiftLeft: { label: 'Walk', category: 'Movement', description: 'Walk (silent movement)' },
        ControlLeft: { label: 'Crouch', category: 'Movement', description: 'Crouch / Hold crouch' },
        KeyR: { label: 'Reload', category: 'Combat', description: 'Reload weapon' },
        KeyB: { label: 'Buy', category: 'UI', description: 'Open buy menu' },
        KeyM: { label: 'Map', category: 'UI', description: 'Toggle map' },
        KeyC: { label: 'Ability C', category: 'Abilities', description: 'Ability: C (first basic)' },
        KeyQ: { label: 'Ability Q', category: 'Abilities', description: 'Ability: Q (second basic)' },
        KeyE: { label: 'Ability E', category: 'Abilities', description: 'Ability: E (signature)' },
        KeyX: { label: 'Ultimate', category: 'Abilities', description: 'Ultimate ability' },
        KeyF: { label: 'Use/Spike', category: 'UI', description: 'Use object / Plant-defuse spike' },
        KeyG: { label: 'Drop', category: 'Combat', description: 'Drop equipped item' },
        Digit1: { label: 'Primary', category: 'Combat', description: 'Equip primary weapon' },
        Digit2: { label: 'Secondary', category: 'Combat', description: 'Equip secondary weapon' },
        Digit3: { label: 'Knife', category: 'Combat', description: 'Equip melee' },
        Digit4: { label: 'Spike', category: 'Combat', description: 'Equip spike' },
        Tab: { label: 'Scores', category: 'UI', description: 'Show scoreboard' },
        Escape: { label: 'Menu', category: 'UI', description: 'Escape / Settings menu' },
        KeyV: { label: 'Push Talk', category: 'Comms', description: 'Push to talk' },
        KeyZ: { label: 'Ping', category: 'Comms', description: 'Radio command wheel' },
        Period: { label: 'Spray', category: 'Comms', description: 'Use spray' }
      },
      ctrl: {},
      alt: {},
      shift: {}
    }
  },

  'OBS Studio': {
    categories: {
      'Recording': '#f44336',
      'Streaming': '#9C27B0',
      'Scenes': '#4CAF50',
      'Audio': '#2196F3',
      'UI': '#FF9800'
    },
    layers: {
      base: {
        F1: { label: 'Scene 1', category: 'Scenes', description: 'Switch to scene 1' },
        F2: { label: 'Scene 2', category: 'Scenes', description: 'Switch to scene 2' },
        F3: { label: 'Scene 3', category: 'Scenes', description: 'Switch to scene 3' },
        F4: { label: 'Scene 4', category: 'Scenes', description: 'Switch to scene 4' },
        F5: { label: 'Scene 5', category: 'Scenes', description: 'Switch to scene 5' },
        F9: { label: 'Rec Start', category: 'Recording', description: 'Start recording' },
        F10: { label: 'Rec Stop', category: 'Recording', description: 'Stop recording' },
        F11: { label: 'Stream On', category: 'Streaming', description: 'Start streaming' },
        F12: { label: 'Stream Off', category: 'Streaming', description: 'Stop streaming' }
      },
      ctrl: {},
      alt: {},
      shift: {}
    }
  },

  'Photoshop': {
    categories: {
      'Tools': '#4CAF50',
      'Edit': '#f44336',
      'View': '#2196F3',
      'File': '#FF9800',
      'Layers': '#9C27B0'
    },
    layers: {
      base: {
        KeyV: { label: 'Move', category: 'Tools', description: 'Move tool' },
        KeyM: { label: 'Marquee', category: 'Tools', description: 'Rectangular marquee selection' },
        KeyL: { label: 'Lasso', category: 'Tools', description: 'Lasso selection tool' },
        KeyW: { label: 'Wand', category: 'Tools', description: 'Magic wand / Quick selection' },
        KeyC: { label: 'Crop', category: 'Tools', description: 'Crop tool' },
        KeyI: { label: 'Eyedrop', category: 'Tools', description: 'Eyedropper tool' },
        KeyJ: { label: 'Heal', category: 'Tools', description: 'Healing brush / Spot healing' },
        KeyB: { label: 'Brush', category: 'Tools', description: 'Brush tool' },
        KeyS: { label: 'Stamp', category: 'Tools', description: 'Clone stamp tool' },
        KeyY: { label: 'History', category: 'Tools', description: 'History brush' },
        KeyE: { label: 'Eraser', category: 'Tools', description: 'Eraser tool' },
        KeyG: { label: 'Gradient', category: 'Tools', description: 'Gradient / Paint bucket' },
        KeyO: { label: 'Dodge', category: 'Tools', description: 'Dodge / Burn / Sponge' },
        KeyP: { label: 'Pen', category: 'Tools', description: 'Pen tool' },
        KeyT: { label: 'Type', category: 'Tools', description: 'Text / Type tool' },
        KeyA: { label: 'Path Sel', category: 'Tools', description: 'Path selection tool' },
        KeyU: { label: 'Shape', category: 'Tools', description: 'Rectangle / Shape tool' },
        KeyH: { label: 'Hand', category: 'View', description: 'Hand tool (pan view)' },
        KeyR: { label: 'Rotate', category: 'View', description: 'Rotate view tool' },
        KeyZ: { label: 'Zoom', category: 'View', description: 'Zoom tool' },
        KeyD: { label: 'Default', category: 'Tools', description: 'Default foreground/background colors' },
        KeyX: { label: 'Swap FG', category: 'Tools', description: 'Swap foreground/background colors' },
        KeyQ: { label: 'Quick Msk', category: 'Tools', description: 'Quick mask mode' },
        Space: { label: 'Hand', category: 'View', description: 'Temporary hand tool while held' },
        BracketLeft: { label: 'Brush -', category: 'Tools', description: 'Decrease brush size' },
        BracketRight: { label: 'Brush +', category: 'Tools', description: 'Increase brush size' },
        Tab: { label: 'Hide UI', category: 'View', description: 'Toggle UI panels visibility' }
      },
      ctrl: {
        KeyZ: { label: 'Undo', category: 'Edit', description: 'Undo last action' },
        KeyS: { label: 'Save', category: 'File', description: 'Save file' },
        KeyN: { label: 'New', category: 'File', description: 'New document' },
        KeyO: { label: 'Open', category: 'File', description: 'Open file' },
        KeyA: { label: 'Sel All', category: 'Edit', description: 'Select all' },
        KeyD: { label: 'Deselect', category: 'Edit', description: 'Deselect all' },
        KeyC: { label: 'Copy', category: 'Edit', description: 'Copy selection' },
        KeyV: { label: 'Paste', category: 'Edit', description: 'Paste' },
        KeyX: { label: 'Cut', category: 'Edit', description: 'Cut selection' },
        KeyT: { label: 'Transform', category: 'Edit', description: 'Free transform' },
        KeyJ: { label: 'Dup Layer', category: 'Layers', description: 'Duplicate layer' },
        KeyE: { label: 'Merge', category: 'Layers', description: 'Merge layers' },
        KeyG: { label: 'Group', category: 'Layers', description: 'Group layers' }
      },
      alt: {},
      shift: {}
    }
  },

  'Generic FPS': {
    categories: {
      'Movement': '#4CAF50',
      'Combat': '#f44336',
      'Equipment': '#FF9800',
      'UI': '#2196F3',
      'Comms': '#9C27B0'
    },
    layers: {
      base: {
        KeyW: { label: 'Forward', category: 'Movement', description: 'Move forward' },
        KeyA: { label: 'Left', category: 'Movement', description: 'Strafe left' },
        KeyS: { label: 'Back', category: 'Movement', description: 'Move backward' },
        KeyD: { label: 'Right', category: 'Movement', description: 'Strafe right' },
        Space: { label: 'Jump', category: 'Movement', description: 'Jump' },
        ControlLeft: { label: 'Crouch', category: 'Movement', description: 'Crouch / Toggle crouch' },
        ShiftLeft: { label: 'Sprint', category: 'Movement', description: 'Sprint' },
        KeyC: { label: 'Prone', category: 'Movement', description: 'Go prone' },
        KeyR: { label: 'Reload', category: 'Combat', description: 'Reload weapon' },
        KeyG: { label: 'Grenade', category: 'Combat', description: 'Throw grenade' },
        KeyF: { label: 'Interact', category: 'UI', description: 'Use / Interact' },
        KeyE: { label: 'Lean R', category: 'Movement', description: 'Lean right' },
        KeyQ: { label: 'Lean L', category: 'Movement', description: 'Lean left' },
        KeyV: { label: 'Melee', category: 'Combat', description: 'Melee attack' },
        KeyB: { label: 'Fire Mode', category: 'Combat', description: 'Toggle fire mode' },
        KeyT: { label: 'Chat', category: 'Comms', description: 'Text chat' },
        KeyZ: { label: 'Voice', category: 'Comms', description: 'Push to talk' },
        KeyM: { label: 'Map', category: 'UI', description: 'Open map' },
        KeyI: { label: 'Inventory', category: 'UI', description: 'Open inventory' },
        Tab: { label: 'Scores', category: 'UI', description: 'Scoreboard' },
        Digit1: { label: 'Primary', category: 'Equipment', description: 'Primary weapon' },
        Digit2: { label: 'Secondary', category: 'Equipment', description: 'Secondary weapon' },
        Digit3: { label: 'Melee', category: 'Equipment', description: 'Melee weapon' },
        Digit4: { label: 'Equipment', category: 'Equipment', description: 'Equipment slot' },
        Digit5: { label: 'Special', category: 'Equipment', description: 'Special item' },
        Escape: { label: 'Menu', category: 'UI', description: 'Pause / Settings menu' }
      },
      ctrl: {},
      alt: {},
      shift: {}
    }
  },

  'Minecraft': {
    categories: {
      'Movement': '#4CAF50',
      'Combat': '#f44336',
      'Inventory': '#FF9800',
      'UI': '#2196F3',
      'Comms': '#9C27B0'
    },
    layers: {
      base: {
        KeyW: { label: 'Forward', category: 'Movement', description: 'Walk forward' },
        KeyA: { label: 'Left', category: 'Movement', description: 'Strafe left' },
        KeyS: { label: 'Back', category: 'Movement', description: 'Walk backward' },
        KeyD: { label: 'Right', category: 'Movement', description: 'Strafe right' },
        Space: { label: 'Jump', category: 'Movement', description: 'Jump / Fly up' },
        ShiftLeft: { label: 'Sneak', category: 'Movement', description: 'Sneak / Fly down' },
        ControlLeft: { label: 'Sprint', category: 'Movement', description: 'Sprint' },
        KeyE: { label: 'Inventory', category: 'Inventory', description: 'Open inventory' },
        KeyQ: { label: 'Drop', category: 'Inventory', description: 'Drop item' },
        KeyF: { label: 'Swap Hand', category: 'Inventory', description: 'Swap item to offhand' },
        KeyT: { label: 'Chat', category: 'Comms', description: 'Open chat' },
        Slash: { label: 'Command', category: 'Comms', description: 'Open command chat' },
        Tab: { label: 'Players', category: 'UI', description: 'Player list' },
        Escape: { label: 'Pause', category: 'UI', description: 'Pause menu' },
        Digit1: { label: 'Slot 1', category: 'Inventory', description: 'Hotbar slot 1' },
        Digit2: { label: 'Slot 2', category: 'Inventory', description: 'Hotbar slot 2' },
        Digit3: { label: 'Slot 3', category: 'Inventory', description: 'Hotbar slot 3' },
        Digit4: { label: 'Slot 4', category: 'Inventory', description: 'Hotbar slot 4' },
        Digit5: { label: 'Slot 5', category: 'Inventory', description: 'Hotbar slot 5' },
        Digit6: { label: 'Slot 6', category: 'Inventory', description: 'Hotbar slot 6' },
        Digit7: { label: 'Slot 7', category: 'Inventory', description: 'Hotbar slot 7' },
        Digit8: { label: 'Slot 8', category: 'Inventory', description: 'Hotbar slot 8' },
        Digit9: { label: 'Slot 9', category: 'Inventory', description: 'Hotbar slot 9' },
        F1: { label: 'Hide HUD', category: 'UI', description: 'Toggle HUD visibility' },
        F2: { label: 'Screenshot', category: 'UI', description: 'Take screenshot' },
        F3: { label: 'Debug', category: 'UI', description: 'Debug screen' },
        F5: { label: 'Persp.', category: 'UI', description: 'Toggle camera perspective' },
        F11: { label: 'Fullscr', category: 'UI', description: 'Toggle fullscreen' }
      },
      ctrl: {},
      alt: {},
      shift: {}
    }
  }
};

function initPresets() {
  var toolBtn = document.getElementById('tool-presets');
  var manager = document.getElementById('preset-manager');
  var overlay = document.getElementById('preset-overlay');
  var closeBtn = document.getElementById('preset-close');
  var listEl = document.getElementById('preset-list');

  if (!toolBtn || !manager) return;

  toolBtn.addEventListener('click', function() {
    closeToolsDropdown();
    renderPresetList();
    manager.classList.add('visible');
    overlay.classList.add('visible');
  });

  closeBtn.addEventListener('click', function() {
    manager.classList.remove('visible');
    overlay.classList.remove('visible');
  });

  overlay.addEventListener('click', function() {
    manager.classList.remove('visible');
    overlay.classList.remove('visible');
  });

  function renderPresetList() {
    listEl.innerHTML = '';

    Object.keys(PRESETS).forEach(function(name) {
      var row = document.createElement('div');
      row.className = 'cat-row';
      row.style.cursor = 'pointer';

      var label = document.createElement('span');
      label.style.flex = '1';
      label.style.fontSize = '14px';
      label.style.fontWeight = '600';
      label.textContent = name;

      var keyCount = 0;
      var preset = PRESETS[name];
      LAYERS.forEach(function(layer) {
        if (preset.layers[layer]) keyCount += Object.keys(preset.layers[layer]).length;
      });

      var count = document.createElement('span');
      count.style.fontSize = '12px';
      count.style.opacity = '0.6';
      count.textContent = keyCount + ' binds';

      var loadBtn = document.createElement('button');
      loadBtn.className = 'cat-delete';
      loadBtn.style.background = '#5a7a5a';
      loadBtn.style.borderColor = '#4a6a4a';
      loadBtn.textContent = 'Load';
      loadBtn.addEventListener('click', function() {
        loadPreset(name);
        manager.classList.remove('visible');
        overlay.classList.remove('visible');
      });

      row.appendChild(label);
      row.appendChild(count);
      row.appendChild(loadBtn);
      listEl.appendChild(row);
    });
  }
}

function loadPreset(presetName) {
  var preset = PRESETS[presetName];
  if (!preset) return;

  // Create as a new profile
  var profileName = presetName;
  var list = getProfileList();
  var suffix = 1;
  while (list.indexOf(profileName) >= 0) {
    profileName = presetName + ' (' + suffix + ')';
    suffix++;
  }

  var data = {
    version: DATA_VERSION,
    layers: {
      base: {},
      ctrl: {},
      alt: {},
      shift: {}
    },
    categories: JSON.parse(JSON.stringify(preset.categories || {}))
  };

  // Deep copy layer data
  LAYERS.forEach(function(layer) {
    if (preset.layers[layer]) {
      data.layers[layer] = JSON.parse(JSON.stringify(preset.layers[layer]));
    }
  });

  list.push(profileName);
  setProfileList(list);
  setCurrentProfileName(profileName);
  localStorage.setItem(profileStorageKey(profileName), JSON.stringify(data));

  applyKeybinds(data);
  refreshProfileDropdown();
  setupEditHandlers();
  applyCategoryColors();
  refreshCategoryContextMenu();
  detectConflicts();
  showSaveStatus('saved');
}
