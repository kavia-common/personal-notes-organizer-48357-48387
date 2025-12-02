//
// Local storage utility for persisting notes and app state
//

// PUBLIC_INTERFACE
export const STORAGE_KEYS = {
  NOTES: 'notes_app_notes',
  THEME: 'notes_app_theme',
  LAST_SELECTED_ID: 'notes_app_last_selected_id',
};

/**
 * Safely parse JSON with fallback.
 * @param {string} value JSON string
 * @param {any} fallback fallback value
 */
function safeParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

/**
 * Load notes array from localStorage; seed defaults if empty.
 * PUBLIC_INTERFACE
 * @returns {Array} notes
 */
export function loadNotes() {
  const raw = localStorage.getItem(STORAGE_KEYS.NOTES);
  const notes = safeParse(raw, null);
  if (Array.isArray(notes) && notes.length) return notes;

  // Seed demo notes on first run
  const seeded = getSeedNotes();
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(seeded));
  return seeded;
}

/**
 * Save notes array to localStorage.
 * PUBLIC_INTERFACE
 * @param {Array} notes
 */
export function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
}

/**
 * Load theme from localStorage or detect system preference.
 * PUBLIC_INTERFACE
 * @returns {'light'|'dark'}
 */
export function loadTheme() {
  const raw = localStorage.getItem(STORAGE_KEYS.THEME);
  if (raw === 'light' || raw === 'dark') return raw;
  const prefersDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

/**
 * Save theme to localStorage.
 * PUBLIC_INTERFACE
 * @param {'light'|'dark'} theme
 */
export function saveTheme(theme) {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
}

/**
 * Load last selected note id.
 * PUBLIC_INTERFACE
 */
export function loadLastSelectedId() {
  const val = localStorage.getItem(STORAGE_KEYS.LAST_SELECTED_ID);
  return val || null;
}

/**
 * Save last selected note id.
 * PUBLIC_INTERFACE
 * @param {string} id
 */
export function saveLastSelectedId(id) {
  if (!id) {
    localStorage.removeItem(STORAGE_KEYS.LAST_SELECTED_ID);
  } else {
    localStorage.setItem(STORAGE_KEYS.LAST_SELECTED_ID, id);
  }
}

function getSeedNotes() {
  const now = Date.now();
  return [
    {
      id: cryptoRandomId(),
      title: 'Welcome to Ocean Notes',
      content:
        'This is your personal notes app.\n\n- Create, edit, and delete notes\n- Search and filter by tags\n- Your notes are saved in your browser\n\nEnjoy the Ocean Professional theme! 🌊',
      tags: ['welcome', 'getting-started'],
      createdAt: now - 1000 * 60 * 60 * 24 * 2,
      updatedAt: now - 1000 * 60 * 60 * 24 * 2,
      pinned: true,
    },
    {
      id: cryptoRandomId(),
      title: 'Ideas',
      content:
        '• Explore a weekly summary note\n• Add color-coded tags for projects\n• Keep personal todos and reflections',
      tags: ['ideas', 'personal'],
      createdAt: now - 1000 * 60 * 60 * 18,
      updatedAt: now - 1000 * 60 * 60 * 12,
      pinned: false,
    },
    {
      id: cryptoRandomId(),
      title: 'Meeting Notes Template',
      content:
        'Date: \nAttendees: \n\nAgenda:\n- \n- \n\nNotes:\n- \n- \n\nAction Items:\n- [ ] \n- [ ] ',
      tags: ['template', 'work'],
      createdAt: now - 1000 * 60 * 60 * 8,
      updatedAt: now - 1000 * 60 * 60 * 8,
      pinned: false,
    },
  ];
}

function cryptoRandomId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}
