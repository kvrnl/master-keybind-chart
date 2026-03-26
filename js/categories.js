/* ===== COLOR-CODED CATEGORIES ===== */

var DEFAULT_CATEGORIES = {
  'Movement': '#4CAF50',
  'Combat': '#f44336',
  'UI': '#2196F3',
  'Comms': '#FF9800',
  'Utility': '#9C27B0'
};

function initCategories() {
  var manager = document.getElementById('category-manager');
  var overlay = document.getElementById('category-overlay');
  var catList = document.getElementById('cat-list');
  var addBtn = document.getElementById('cat-add-btn');
  var addName = document.getElementById('cat-add-name');
  var addColor = document.getElementById('cat-add-color');
  var closeBtn = document.getElementById('cat-close');
  var toolBtn = document.getElementById('tool-categories');

  if (!manager || !toolBtn) return;

  function openManager() {
    renderCatList();
    manager.classList.add('visible');
    overlay.classList.add('visible');
  }

  function closeManager() {
    manager.classList.remove('visible');
    overlay.classList.remove('visible');
  }

  toolBtn.addEventListener('click', function() {
    closeToolsDropdown();
    openManager();
  });

  closeBtn.addEventListener('click', closeManager);
  overlay.addEventListener('click', closeManager);

  addBtn.addEventListener('click', function() {
    var name = addName.value.trim();
    if (!name) return;
    var data = getProfileData();
    if (!data.categories) data.categories = {};
    data.categories[name] = addColor.value;
    saveToStorage(getCurrentKeybinds());
    addName.value = '';
    renderCatList();
    refreshCategoryContextMenu();
    if (typeof updateCategoryLegend === 'function') updateCategoryLegend();
  });

  addName.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') addBtn.click();
  });

  function renderCatList() {
    var data = getProfileData();
    var cats = data.categories || {};
    catList.innerHTML = '';

    Object.keys(cats).forEach(function(name) {
      var row = document.createElement('div');
      row.className = 'cat-row';

      var colorInput = document.createElement('input');
      colorInput.type = 'color';
      colorInput.className = 'cat-color';
      colorInput.value = cats[name];
      colorInput.addEventListener('change', function() {
        var d = getProfileData();
        d.categories[name] = colorInput.value;
        saveToStorage(getCurrentKeybinds());
        applyCategoryColors();
        refreshCategoryContextMenu();
        if (typeof updateCategoryLegend === 'function') updateCategoryLegend();
      });

      var nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.className = 'cat-name';
      nameInput.value = name;
      nameInput.addEventListener('change', function() {
        var newName = nameInput.value.trim();
        if (!newName || newName === name) return;
        var d = getProfileData();
        d.categories[newName] = d.categories[name];
        delete d.categories[name];
        // Update all keys referencing old name
        LAYERS.forEach(function(layer) {
          if (!d.layers[layer]) return;
          Object.keys(d.layers[layer]).forEach(function(code) {
            if (d.layers[layer][code].category === name) {
              d.layers[layer][code].category = newName;
            }
          });
        });
        saveToStorage(getCurrentKeybinds());
        renderCatList();
        applyCategoryColors();
        refreshCategoryContextMenu();
        if (typeof updateCategoryLegend === 'function') updateCategoryLegend();
      });

      var deleteBtn = document.createElement('button');
      deleteBtn.className = 'cat-delete';
      deleteBtn.textContent = 'Del';
      deleteBtn.addEventListener('click', function() {
        var d = getProfileData();
        delete d.categories[name];
        // Remove category from all keys
        LAYERS.forEach(function(layer) {
          if (!d.layers[layer]) return;
          Object.keys(d.layers[layer]).forEach(function(code) {
            if (d.layers[layer][code].category === name) {
              d.layers[layer][code].category = null;
            }
          });
        });
        saveToStorage(getCurrentKeybinds());
        renderCatList();
        applyCategoryColors();
        refreshCategoryContextMenu();
        if (typeof updateCategoryLegend === 'function') updateCategoryLegend();
      });

      row.appendChild(colorInput);
      row.appendChild(nameInput);
      row.appendChild(deleteBtn);
      catList.appendChild(row);
    });
  }
}

function applyCategoryColors() {
  var data = getProfileData();
  var cats = data.categories || {};
  document.querySelectorAll('.key[data-key]').forEach(function(keyEl) {
    var code = keyEl.dataset.key;
    var entry = getKeyEntry(data, currentLayer, code);
    keyEl.classList.remove('has-category');
    keyEl.style.borderLeftColor = '';
    if (entry.category && cats[entry.category]) {
      keyEl.classList.add('has-category');
      keyEl.style.borderLeftColor = cats[entry.category];
    }
  });
}

function assignCategory(keyEl, categoryName) {
  if (!keyEl || !keyEl.dataset.key) return;
  var code = keyEl.dataset.key;
  var data = getProfileData();
  var entry = getKeyEntry(data, currentLayer, code);
  entry.category = categoryName || null;
  setKeyEntry(data, currentLayer, code, entry);
  saveToStorage(getCurrentKeybinds());
  applyCategoryColors();
}

function refreshCategoryContextMenu() {
  var menu = document.getElementById('key-context-menu');
  if (!menu) return;

  // Remove old category submenu
  var oldSub = menu.querySelector('.cat-submenu');
  if (oldSub) oldSub.remove();

  var data = getProfileData();
  var cats = data.categories || {};
  var catNames = Object.keys(cats);
  if (catNames.length === 0) return;

  var sub = document.createElement('div');
  sub.className = 'cat-submenu';

  var label = document.createElement('div');
  label.className = 'cat-submenu-label';
  label.textContent = 'Category';
  sub.appendChild(label);

  // "None" option
  var noneBtn = document.createElement('button');
  noneBtn.type = 'button';
  noneBtn.role = 'menuitem';
  noneBtn.textContent = 'None';
  noneBtn.addEventListener('click', function() {
    if (window._contextKeyEl) assignCategory(window._contextKeyEl, null);
    menu.classList.remove('visible');
  });
  sub.appendChild(noneBtn);

  catNames.forEach(function(name) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.role = 'menuitem';
    btn.className = 'cat-option';
    var swatch = document.createElement('span');
    swatch.className = 'cat-swatch';
    swatch.style.background = cats[name];
    btn.appendChild(swatch);
    btn.appendChild(document.createTextNode(name));
    btn.addEventListener('click', function() {
      if (window._contextKeyEl) assignCategory(window._contextKeyEl, name);
      menu.classList.remove('visible');
    });
    sub.appendChild(btn);
  });

  menu.appendChild(sub);
}
