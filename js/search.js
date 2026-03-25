/* ===== SEARCH / FILTER ===== */

function initSearch() {
  var input = document.getElementById('search-input');
  var clearBtn = document.getElementById('search-clear');
  if (!input) return;

  input.addEventListener('input', function() {
    var query = input.value.trim().toLowerCase();
    clearBtn.classList.toggle('visible', query.length > 0);

    if (!query) {
      clearSearch();
      return;
    }

    var data = getProfileData();
    document.querySelectorAll('.key[data-key]').forEach(function(keyEl) {
      var code = keyEl.dataset.key;
      var entry = getKeyEntry(data, currentLayer, code);
      var label = (entry.label || '').toLowerCase();
      var desc = (entry.description || '').toLowerCase();
      var cat = (entry.category || '').toLowerCase();

      var matches = label.indexOf(query) >= 0 ||
                    desc.indexOf(query) >= 0 ||
                    cat.indexOf(query) >= 0;

      keyEl.classList.toggle('search-match', matches && label.length > 0);
      keyEl.classList.toggle('search-dim', !matches && label.length > 0);
      // Empty keys that don't match just dim
      if (!label) {
        keyEl.classList.remove('search-match');
        keyEl.classList.add('search-dim');
      }
    });
  });

  clearBtn.addEventListener('click', function() {
    input.value = '';
    clearBtn.classList.remove('visible');
    clearSearch();
    input.focus();
  });

  // Escape clears search
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      input.value = '';
      clearBtn.classList.remove('visible');
      clearSearch();
      input.blur();
    }
  });
}

function clearSearch() {
  document.querySelectorAll('.key[data-key]').forEach(function(keyEl) {
    keyEl.classList.remove('search-match', 'search-dim');
  });
}
