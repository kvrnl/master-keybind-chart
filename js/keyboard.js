/* ===== KEYBOARD LAYOUTS & RENDERING ===== */

const KEYBIND_MAX_CHARS = 12;
const KEYBIND_MAX_CHARS_FROW = 14;
const F_ROW_CODES = { Escape: 1, F1: 1, F2: 1, F3: 1, F4: 1, F5: 1, F6: 1, F7: 1, F8: 1, F9: 1, F10: 1, F11: 1, F12: 1 };

// ===== Main keyboard layout =====
const mainKeys = [
  [
    { code: 'Escape', label: 'Esc', width: 'u1-5' },
    { code: null, label: '', spacer: true, width: 'u1' },
    { code: 'F1', label: 'F1' }, { code: 'F2', label: 'F2' }, { code: 'F3', label: 'F3' }, { code: 'F4', label: 'F4' },
    { flexGap: true },
    { code: 'F5', label: 'F5' }, { code: 'F6', label: 'F6' }, { code: 'F7', label: 'F7' }, { code: 'F8', label: 'F8' },
    { flexGap: true },
    { code: 'F9', label: 'F9' }, { code: 'F10', label: 'F10' }, { code: 'F11', label: 'F11' }, { code: 'F12', label: 'F12' }
  ],
  [
    { code: 'Backquote', label: '`' }, { code: 'Digit1', label: '1' }, { code: 'Digit2', label: '2' }, { code: 'Digit3', label: '3' },
    { code: 'Digit4', label: '4' }, { code: 'Digit5', label: '5' }, { code: 'Digit6', label: '6' }, { code: 'Digit7', label: '7' },
    { code: 'Digit8', label: '8' }, { code: 'Digit9', label: '9' }, { code: 'Digit0', label: '0' }, { code: 'Minus', label: '-' },
    { code: 'Equal', label: '=' }, { code: 'Backspace', label: 'Backspace', width: 'u2' }
  ],
  [
    { code: 'Tab', label: 'Tab', width: 'u1-5' },
    { code: 'KeyQ', label: 'Q' }, { code: 'KeyW', label: 'W' }, { code: 'KeyE', label: 'E' }, { code: 'KeyR', label: 'R' },
    { code: 'KeyT', label: 'T' }, { code: 'KeyY', label: 'Y' }, { code: 'KeyU', label: 'U' }, { code: 'KeyI', label: 'I' },
    { code: 'KeyO', label: 'O' }, { code: 'KeyP', label: 'P' }, { code: 'BracketLeft', label: '[' }, { code: 'BracketRight', label: ']' },
    { code: 'Backslash', label: '\\', width: 'u1-5' }
  ],
  [
    { code: 'CapsLock', label: 'Caps', width: 'u1-75' },
    { code: 'KeyA', label: 'A' }, { code: 'KeyS', label: 'S' }, { code: 'KeyD', label: 'D' }, { code: 'KeyF', label: 'F' },
    { code: 'KeyG', label: 'G' }, { code: 'KeyH', label: 'H' }, { code: 'KeyJ', label: 'J' }, { code: 'KeyK', label: 'K' },
    { code: 'KeyL', label: 'L' }, { code: 'Semicolon', label: ';' }, { code: 'Quote', label: "'" },
    { code: 'Enter', label: 'Enter', width: 'u2-25' }
  ],
  [
    { code: 'ShiftLeft', label: 'Shift', width: 'u2-25' },
    { code: 'KeyZ', label: 'Z' }, { code: 'KeyX', label: 'X' }, { code: 'KeyC', label: 'C' }, { code: 'KeyV', label: 'V' },
    { code: 'KeyB', label: 'B' }, { code: 'KeyN', label: 'N' }, { code: 'KeyM', label: 'M' }, { code: 'Comma', label: ',' },
    { code: 'Period', label: '.' }, { code: 'Slash', label: '/' }, { code: 'ShiftRight', label: 'Shift', width: 'u2-75' }
  ],
  [
    { code: 'ControlLeft', label: 'Ctrl', width: 'u1-25' }, { code: 'MetaLeft', label: 'Win', width: 'u1-25' },
    { code: 'AltLeft', label: 'Alt', width: 'u1-25' }, { code: 'Space', label: 'Space', width: 'u6-5' },
    { code: 'AltRight', label: 'Alt', width: 'u1-25' }, { code: 'MetaRight', label: 'Win', width: 'u1-25' },
    { code: 'ContextMenu', label: 'Menu', width: 'u1-25' }, { code: 'ControlRight', label: 'Ctrl', width: 'u1-25' }
  ]
];

// ===== Nav cluster layout =====
const navKeys = [
  [
    { code: 'Insert', label: 'Ins' }, { code: 'Home', label: 'Home' }, { code: 'PageUp', label: 'PgUp' }
  ],
  [
    { code: 'Delete', label: 'Del' }, { code: 'End', label: 'End' }, { code: 'PageDown', label: 'PgDn' }
  ],
  [
    { code: null, label: '', spacer: true }, { code: null, label: '', spacer: true }, { code: null, label: '', spacer: true }
  ],
  [
    { code: null, label: '', spacer: true }, { code: 'ArrowUp', label: '\u2191' }, { code: null, label: '', spacer: true }
  ],
  [
    { code: 'ArrowLeft', label: '\u2190' }, { code: 'ArrowDown', label: '\u2193' }, { code: 'ArrowRight', label: '\u2192' }
  ]
];

// ===== Numpad layout =====
const numpadKeys = [
  [
    { code: 'NumLock', label: 'Num' }, { code: 'NumpadDivide', label: '/' }, { code: 'NumpadMultiply', label: '*' }, { code: 'NumpadSubtract', label: '-' }
  ],
  [
    { code: 'Numpad7', label: '7' }, { code: 'Numpad8', label: '8' }, { code: 'Numpad9', label: '9' }, { code: 'NumpadAdd', label: '+', height: 'h2' }
  ],
  [
    { code: 'Numpad4', label: '4' }, { code: 'Numpad5', label: '5' }, { code: 'Numpad6', label: '6' }
  ],
  [
    { code: 'Numpad1', label: '1' }, { code: 'Numpad2', label: '2' }, { code: 'Numpad3', label: '3' }, { code: 'NumpadEnter', label: 'Ent', height: 'h2' }
  ],
  [
    { code: 'Numpad0', label: '0', width: 'u2' }, { code: 'NumpadDecimal', label: '.' }
  ]
];

function escapeHtml(s) {
  var div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

function renderKeyboard(containerId, rows) {
  var container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  var isMain = containerId === 'main-keyboard';

  rows.forEach(function(row, rowIndex) {
    var rowEl = document.createElement('div');
    rowEl.className = 'keyboard-row';
    var isFRow = isMain && rowIndex === 0;

    row.forEach(function(k, kIndex) {
      if (k.flexGap) {
        var gapEl = document.createElement('div');
        gapEl.className = 'key key-spacer row-flex-gap';
        gapEl.setAttribute('aria-hidden', 'true');
        gapEl.innerHTML = '<span class="key-cap"></span><span class="keybind"></span>';
        rowEl.appendChild(gapEl);
        return;
      }

      // Skip rendering if this key has height='h2' and we already rendered it from previous row
      if (k._rendered) return;

      var keyEl = document.createElement('div');
      var cls = 'key' + (k.width ? ' ' + k.width : '') + (k.spacer ? ' key-spacer' : '');
      if (k.height === 'h2') cls += ' key-h2';
      if (isFRow && !k.spacer) cls += ' key-f-row';
      if (isMain && rowIndex !== 0 && kIndex === row.length - 1 && !k.spacer) cls += ' key-grow';
      keyEl.className = cls;

      if (k.code) keyEl.dataset.key = k.code;
      if (k.spacer) {
        keyEl.setAttribute('aria-hidden', 'true');
      } else {
        var clearBtn = k.code ? '<button type="button" class="key-clear-btn" title="Clear this key" aria-label="Clear this key">\u00d7</button>' : '';
        keyEl.innerHTML = '<span class="key-cap">' + escapeHtml(k.label) + '</span>' + clearBtn + '<span class="keybind" contenteditable="true" spellcheck="false"></span>';
      }
      rowEl.appendChild(keyEl);
    });

    container.appendChild(rowEl);
  });
}
