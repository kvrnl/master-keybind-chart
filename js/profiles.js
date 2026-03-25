/* ===== PROFILE MANAGEMENT ===== */

function getProfileList() {
  try {
    var raw = localStorage.getItem(PROFILE_LIST_KEY);
    var list = raw ? JSON.parse(raw) : null;
    if (!Array.isArray(list) || list.length === 0) return ['Default'];
    return list;
  } catch (_) { return ['Default']; }
}

function setProfileList(list) {
  localStorage.setItem(PROFILE_LIST_KEY, JSON.stringify(list));
}

function getCurrentProfileName() {
  var name = localStorage.getItem(CURRENT_PROFILE_KEY);
  var list = getProfileList();
  return list.indexOf(name) >= 0 ? name : list[0];
}

function setCurrentProfileName(name) {
  localStorage.setItem(CURRENT_PROFILE_KEY, name);
}

function ensureProfilesExist() {
  var list = getProfileList();
  if (list.length === 0) {
    list = ['Default'];
    setProfileList(list);
  }
  var cur = localStorage.getItem(CURRENT_PROFILE_KEY);
  if (!cur || list.indexOf(cur) < 0) setCurrentProfileName(list[0]);

  // Migrate legacy single-key storage
  var legacy = localStorage.getItem(STORAGE_KEY);
  if (legacy && list.indexOf('Default') >= 0) {
    try {
      var data = JSON.parse(legacy);
      if (typeof data === 'object' && data !== null) {
        localStorage.setItem(profileStorageKey('Default'), legacy);
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (_) {}
  }
}

function loadFromStorage() {
  ensureProfilesExist();
  var name = getCurrentProfileName();
  try {
    var raw = localStorage.getItem(profileStorageKey(name));
    var data = raw ? JSON.parse(raw) : {};
    return ensureV2(data);
  } catch (_) { return ensureV2({}); }
}

function saveToStorage(data) {
  var name = getCurrentProfileName();
  localStorage.setItem(profileStorageKey(name), JSON.stringify(data));
  showSaveStatus('saved');
}

function switchProfile(name) {
  setCurrentProfileName(name);
  _profileData = null; // Clear cache so loadFromStorage reads fresh
  applyKeybinds(loadFromStorage());
  refreshProfileDropdown();
  // Refresh feature visuals
  if (typeof applyCategoryColors === 'function') applyCategoryColors();
  if (typeof refreshCategoryContextMenu === 'function') refreshCategoryContextMenu();
  if (typeof detectConflicts === 'function') detectConflicts();
}

function createProfile(name) {
  name = (name || '').trim().replace(/[/\\?*:]/g, '');
  if (!name) return;
  var list = getProfileList();
  if (list.indexOf(name) >= 0) return;
  list.push(name);
  setProfileList(list);
  setCurrentProfileName(name);
  var empty = ensureV2({});
  localStorage.setItem(profileStorageKey(name), JSON.stringify(empty));
  applyKeybinds(empty);
  refreshProfileDropdown();
}

function refreshProfileDropdown() {
  var sel = document.getElementById('profile-select');
  if (!sel) return;
  var cur = getCurrentProfileName();
  var list = getProfileList();
  sel.innerHTML = '';
  list.forEach(function(n) {
    var opt = document.createElement('option');
    opt.value = n;
    opt.textContent = n;
    if (n === cur) opt.selected = true;
    sel.appendChild(opt);
  });
  var optNew = document.createElement('option');
  optNew.value = '__new__';
  optNew.textContent = '+ New profile\u2026';
  sel.appendChild(optNew);
}

let saveStatusTimer = null;

function showSaveStatus(state) {
  var el = document.getElementById('save-status');
  if (!el) return;
  el.textContent = state === 'saved' ? 'Saved' : 'Saving\u2026';
  el.className = 'save-status' + (state === 'saved' ? ' saved' : '');
  clearTimeout(saveStatusTimer);
  if (state === 'saved') {
    saveStatusTimer = setTimeout(function() { el.textContent = ''; el.className = 'save-status'; }, 2000);
  }
}
